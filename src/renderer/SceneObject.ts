import { GameObject } from './GameObject'

export class SceneObject extends GameObject {
  classId: number
  localZOrder: number
  bornTime: number // born after "bornTime" milleseconds
  bornX: number
  bornY: number
  destinationX: number
  destinationY: number

  constructor(parameter: any) {
    super('SceneObject', parameter.id, 'NONAME')

    this.classId = parameter.classId
    this.localZOrder = parameter.localZOrder
    this.bornTime = parameter.bornTime
    this.bornX = parameter.bornX
    this.bornY = parameter.bornY
    this.destinationX = parameter.destinationX
    this.destinationY = parameter.destinationY
  }
}
