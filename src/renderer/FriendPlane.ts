import { Force } from './Force'

export class FriendPlane extends Force {
  constructor(id: number, name: string, file: string, health: number, speed: number, damage: number, weapon: number) {
    super(id, name, file, health, speed, damage, weapon)

    this.type = 'FriendPlane'
  }
}
