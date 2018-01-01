import { SceneObject } from './SceneObject'

export class PlayerPlane extends SceneObject {
  constructor(
    id: number,
    classId: number,
    bornTime: number,
    bornX: number,
    bornY: number,
    destinationX: number,
    destinationY: number
  ) {
    super(id, classId, bornTime, bornX, bornY, destinationX, destinationY)

    this.type = 'PlayerPlane' // overwrite the type
  }
}
