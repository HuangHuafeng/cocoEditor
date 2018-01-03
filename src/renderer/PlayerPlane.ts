import { SceneObject } from './SceneObject'

export class PlayerPlane extends SceneObject {
  constructor(parameter: any) {
    super(parameter)

    this.type = 'PlayerPlane' // overwrite the type
  }
}
