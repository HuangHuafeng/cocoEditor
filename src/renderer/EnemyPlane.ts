import { Object } from './Object'

export class EnemyPlane extends Object {
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
    super(id, name, file, calmPeriod, health, speed, damage, weapon)

    this.type = 'EnemyPlane'
  }
}
