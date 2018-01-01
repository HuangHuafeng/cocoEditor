import { Bullet } from './Bullet'
import { Weapon } from './Weapon'
import { GameObject } from './GameObject'
import { FriendPlane } from './FriendPlane'
import { PlayerPlane } from './PlayerPlane'
import { EnemyPlane } from './EnemyPlane'
import * as fs from 'fs'
import { SceneObject } from './SceneObject'
import { EnemyGenerator } from './EnemyGenerator'

const GameObjectActionType = {
  CreateBullet: 'CREATE_BULLET',
  CreateWeapon: 'CREATE_WEAPON',
  CreateFriendPlane: 'CREATE_FRIEND_PLANE',
  CreatePlayerPlane: 'CREATE_PLAYER_PLANE',
  CreateObject: 'CREATE_OBJECT',
  CreateForce: 'CREATE_FORCE',
  CreateObjectGenerator: 'CREATE_OBJECT_FACTORY',
}

export interface GameObjectAction {
  type: string
  parameter: any
}

export class GameObjectStore {
  allObjects: GameObject[]
  allBullets: GameObject[]
  allWeapons: GameObject[]
  allGenerators: GameObject[]
  allClonableObjects: GameObject[]
  allFriendPlanes: GameObject[]
  playerPlane: PlayerPlane | undefined

  constructor() {
    this.allObjects = []
    this.allBullets = []
    this.allWeapons = []
    this.allGenerators = []
    this.allClonableObjects = []
    this.allFriendPlanes = []
    this.playerPlane = undefined
  }

  private generateObjectId(preferredId: number): number {
    if (preferredId != 0 && this.allObjects.findIndex(v => v.id === preferredId) === -1) {
      return preferredId
    }

    // step 1: generate an array that contains preferred numbers
    let preferred = []
    for (let index = 0; index <= this.allObjects.length; index++) {
      preferred.push(index + 1)
    }
    // step 2: remove the numbers that are already used by existing players
    for (let index = 0; index < this.allObjects.length; index++) {
      const toBeRemoved = preferred.indexOf(this.allObjects[index].id)
      if (toBeRemoved !== -1) {
        preferred.splice(toBeRemoved, 1)
      }
    }
    // step 3: return the smallest number of remaining preferred numbers
    return preferred[0]
  }

  private doCreateBullet(parameter: any) {
    const id = this.generateObjectId(parameter.id)
    let bullet = undefined
    switch (parameter.type) {
      case 'Bullet':
        bullet = new Bullet(id, parameter.name, parameter.file, parameter.speed, parameter.damage)
        break

      default:
        break
    }
    if (bullet) {
      this.allBullets.push(bullet)
      this.allObjects.push(bullet)
    }
    console.log(JSON.stringify(this.allObjects))
  }

  private doCreateWeapon(parameter: any) {
    const id = this.generateObjectId(parameter.id)
    let weapon = undefined
    switch (parameter.type) {
      case 'Weapon':
        weapon = new Weapon(id, parameter.name, parameter.bullet, parameter.triggerInterval)
        break

      default:
        break
    }
    if (weapon) {
      this.allWeapons.push(weapon)
      this.allObjects.push(weapon)
    }
    console.log(JSON.stringify(this.allObjects))
  }

  private doCreateFriendPlane(parameter: any) {
    const id = this.generateObjectId(parameter.id)
    // check if the bullet exists
    const friendPlane = new FriendPlane(
      id,
      parameter.name,
      parameter.file,
      parameter.health,
      parameter.speed,
      parameter.damage,
      parameter.weapon
    )
    this.allFriendPlanes.push(friendPlane)
    this.allObjects.push(friendPlane)
    console.log(JSON.stringify(this.allObjects))
  }

  public getBulletTypes() {
    const bulletTypes = [{ name: '直飞目标型', value: 'Bullet' }]
    return bulletTypes
  }

  public getWeaponTypes() {
    const weaponTypes = [
      { name: '单次发射1颗子弹', value: 'Weapon' },
      { name: '单次发射3颗子弹', value: 'WeaponTripleBullet' },
    ]
    return weaponTypes
  }

  public getGeneratorTypes() {
    const weaponTypes = [{ name: '生产的对象随机从屏幕上方进入，飞到屏幕下方', value: 'EnemyGenerator' }]
    return weaponTypes
  }

  // all types except the player plane type (which is controlled by user)
  // in other words, this include enemy and friend, non user controll types
  public getOtherForceTypes() {
    const otherForceTypes = [{ name: '直飞目的地型', value: 'EnemyPlane' }]
    return otherForceTypes
  }

  public getPlayerPlaneTypes() {
    const playerPlaneTypes = [{ name: '玩家控制--1号类型', value: 'FriendPlane' }]
    return playerPlaneTypes
  }

  private doCreateForce(parameter: any) {
    const id = this.generateObjectId(parameter.id)
    let force = undefined
    switch (parameter.type) {
      case 'FriendPlane':
        force = new FriendPlane(
          id,
          parameter.name,
          parameter.file,
          parameter.health,
          parameter.speed,
          parameter.damage,
          parameter.weapon
        )
        break

      case 'EnemyPlane':
        force = new EnemyPlane(
          id,
          parameter.name,
          parameter.file,
          parameter.health,
          parameter.speed,
          parameter.damage,
          parameter.weapon
        )
        break

      default:
        break
    }

    if (force) {
      if (parameter.type === 'FriendPlane') {
        this.allFriendPlanes.push(force)
      } else {
        this.allClonableObjects.push(force)
      }
      this.allObjects.push(force)
      console.log(JSON.stringify(this.allObjects))
    }
  }

  private doCreatePlayerPlane(parameter: any) {
    if (this.playerPlane === undefined) {
      const id = this.generateObjectId(parameter.id)
      const playerPlane = new PlayerPlane(
        id,
        parameter.friendPlane,
        parameter.bornTime,
        parameter.bornX,
        parameter.bornY,
        parameter.destinationX,
        parameter.destinationY
      )
      this.allObjects.push(playerPlane)
      console.log(JSON.stringify(this.allObjects))
    } else {
      console.log('player plane is already created!')
    }
  }

  private doCreateObject(parameter: any) {
    const id = this.generateObjectId(parameter.id)
    const sceneObject = new SceneObject(
      id,
      parameter.classId,
      parameter.bornTime,
      parameter.bornX,
      parameter.bornY,
      parameter.destinationX,
      parameter.destinationY
    )
    this.allObjects.push(sceneObject)
    console.log(JSON.stringify(this.allObjects))
  }

  private doCreateObjectGenerator(parameter: any) {
    const id = this.generateObjectId(parameter.id)
    let generator = undefined
    switch (parameter.type) {
      case 'EnemyGenerator':
        generator = new EnemyGenerator(id, parameter.name, parameter.classId, parameter.triggerInterval)
        break

      default:
        break
    }

    if (generator) {
      this.allGenerators.push(generator)
      this.allObjects.push(generator)
      console.log(JSON.stringify(this.allObjects))
    }
  }

  private doAction(action: GameObjectAction): void {
    switch (action.type) {
      case GameObjectActionType.CreateBullet:
        this.doCreateBullet(action.parameter)
        break

      case GameObjectActionType.CreateWeapon:
        this.doCreateWeapon(action.parameter)
        break

      case GameObjectActionType.CreateForce:
        this.doCreateForce(action.parameter)
        break

      case GameObjectActionType.CreateFriendPlane:
        this.doCreateFriendPlane(action.parameter)
        break

      case GameObjectActionType.CreatePlayerPlane:
        this.doCreatePlayerPlane(action.parameter)
        break

      case GameObjectActionType.CreateObject:
        this.doCreateObject(action.parameter)
        break

      case GameObjectActionType.CreateObjectGenerator:
        this.doCreateObjectGenerator(action.parameter)
        break

      default:
        throw new Error('IMPOSSIBLE! unknown action!')
    }
  }

  public getAllBullets() {
    return this.allBullets
  }

  public getAllWeapons() {
    return this.allWeapons
  }

  public getAllFriendPlanes() {
    return this.allFriendPlanes
  }

  public getAllClonableObjects() {
    return this.allClonableObjects
  }

  public getAllObjects() {
    return this.allObjects
  }

  public getAllGenerators() {
    return this.allGenerators
  }

  public createBullet(parameter: any) {
    this.doAction({ type: GameObjectActionType.CreateBullet, parameter })
  }

  public createWeapon(parameter: any) {
    this.doAction({ type: GameObjectActionType.CreateWeapon, parameter })
  }

  public createObjectGenerator(parameter: any) {
    this.doAction({ type: GameObjectActionType.CreateObjectGenerator, parameter })
  }

  public createForce(parameter: any) {
    this.doAction({ type: GameObjectActionType.CreateForce, parameter })
  }

  public createFriendPlane(
    id: number,
    name: string,
    file: string,
    health: number,
    speed: number,
    damage: number,
    weapon: number,
    type: string
  ) {
    this.doAction({
      type: GameObjectActionType.CreateFriendPlane,
      parameter: {
        id,
        name,
        file,
        health,
        speed,
        damage,
        weapon,
        type,
      },
    })
  }

  public createPlayerPlane(
    id: number,
    friendPlane: number,
    bornTime: number,
    bornX: number,
    bornY: number,
    destinationX: number,
    destinationY: number
  ) {
    this.doAction({
      type: GameObjectActionType.CreatePlayerPlane,
      parameter: {
        id,
        friendPlane,
        bornTime,
        bornX,
        bornY,
        destinationX,
        destinationY,
      },
    })
  }

  public createObject(parameter: any) {
    this.doAction({
      type: GameObjectActionType.CreateObject,
      parameter,
    })
  }

  public save(fileName: string): void {
    const saveContent = { objects: this.allObjects }
    fs.writeFileSync(fileName, JSON.stringify(saveContent))
  }
}
