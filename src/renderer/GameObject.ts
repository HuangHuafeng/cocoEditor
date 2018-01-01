export class GameObject {
  type: string
  id: number
  name: string

  constructor(type: string, id: number, name: string) {
    this.type = type
    this.id = id
    this.name = name
  }
}
