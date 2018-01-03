import { GameObject } from './GameObject'

export class Object extends GameObject {
  file: string
  calmPeriod: number
  health: number
  speed: number
  damage: number
  weapon: number

  constructor(
    id: number,
    name: string,
    file: string,
    calmPeriod: number,
    health: number,
    speed: number,
    damage: number,
    weapon: number
  ) {
    super('force', id, name)

    this.file = file
    this.calmPeriod = calmPeriod
    this.health = health
    this.speed = speed
    this.damage = damage
    this.weapon = weapon
  }
}
