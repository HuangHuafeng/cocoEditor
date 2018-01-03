import { GameObject } from './GameObject'

export class WeaponTripleBullet extends GameObject {
  bullet: number
  triggerInterval: number

  constructor(id: number, name: string, bullet: number, triggerInterval: number) {
    super('WeaponTripleBullet', id, name)

    this.bullet = bullet
    this.triggerInterval = triggerInterval
  }
}
