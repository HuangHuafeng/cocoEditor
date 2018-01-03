import { GameObject } from './GameObject'

export class ScrollingBackground extends GameObject {
  file1: string
  file2: string
  speed: number

  constructor(parameter: any) {
    super('ScrollingBackground', parameter.id, parameter.name)

    this.file1 = parameter.file1
    this.file2 = parameter.file2
    this.speed = parameter.speed
  }
}
