import { GameObject } from './GameObject'

export class Weapon extends GameObject {
  bullet: number
  triggerInterval: number

  constructor(id: number, name: string, bullet: number, triggerInterval: number) {
    super('Weapon', id, name)

    this.bullet = bullet
    this.triggerInterval = triggerInterval
  }
}
