import { GameObject } from './GameObject'

export class Force extends GameObject {
  file: string
  health: number
  speed: number
  damage: number
  weapon: number

  constructor(id: number, name: string, file: string, health: number, speed: number, damage: number, weapon: number) {
    super('force', id, name)

    this.file = file
    this.health = health
    this.speed = speed
    this.damage = damage
    this.weapon = weapon
  }
}
