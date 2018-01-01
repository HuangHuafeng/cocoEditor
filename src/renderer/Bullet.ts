import { GameObject } from './GameObject'

export class Bullet extends GameObject {
  file: string
  speed: number
  damage: number

  constructor(id: number, name: string, file: string, speed: number, damage: number) {
    super('Bullet', id, name)

    this.file = file
    this.speed = speed
    this.damage = damage
  }
}
