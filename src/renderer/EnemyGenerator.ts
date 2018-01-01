import { GameObject } from './GameObject'

export class EnemyGenerator extends GameObject {
  classId: number
  triggerInterval: number

  constructor(id: number, name: string, classId: number, triggerInterval: number) {
    super('EnemyGenerator', id, name)

    this.classId = classId
    this.triggerInterval = triggerInterval
  }
}
