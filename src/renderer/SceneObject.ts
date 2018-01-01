import { GameObject } from './GameObject'

export class SceneObject extends GameObject {
  classId: number
  bornTime: number // born after "bornTime" milleseconds
  bornX: number
  bornY: number
  destinationX: number
  destinationY: number

  constructor(
    id: number,
    classId: number,
    bornTime: number,
    bornX: number,
    bornY: number,
    destinationX: number,
    destinationY: number
  ) {
    super('SceneObject', id, 'NONAME')

    this.classId = classId
    this.bornTime = bornTime
    this.bornX = bornX
    this.bornY = bornY
    this.destinationX = destinationX
    this.destinationY = destinationY
  }
}
