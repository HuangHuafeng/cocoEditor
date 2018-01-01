import * as React from 'react'
import { Manager, smSize } from './manager'
import { Form, Modal, Button, FormGroup, FormControl, ControlLabel, Col } from 'react-bootstrap'
import { toZeorOrPositiveIntegerString } from '../common/helper-functions'

interface ICreateForceProps {
  readonly manager: Manager
  readonly forceToEdit: number
  readonly typeList: any[]
  readonly title: string
  readonly onOkCallback?: (parameter: any) => void
  readonly onDismissed: () => void
}

interface ICreateForceState {
  readonly id: string
  readonly name: string
  readonly file: string
  readonly health: string
  readonly speed: string
  readonly damage: string
  readonly weapon: string
  readonly type: string
}

export class CreateForce extends React.Component<ICreateForceProps, ICreateForceState> {
  constructor(props: ICreateForceProps) {
    super(props)

    if (this.props.forceToEdit === 0) {
      this.state = {
        id: '0',
        name: '',
        file: '',
        health: '',
        speed: '',
        damage: '',
        weapon: '0',
        type: '0',
      }
    } else {
      this.state = {
        id: 'NOT IMPLEMENTED',
        name: 'NOT IMPLEMENTED',
        file: '',
        health: 'NOT IMPLEMENTED',
        speed: 'NOT IMPLEMENTED',
        damage: 'NOT IMPLEMENTED',
        weapon: 'NOT IMPLEMENTED',
        type: 'NOT IMPLEMENTED',
      }
    }
  }

  private onOK = () => {
    const id = 0
    const name = this.state.name
    const tempArray = this.state.file.split('\\')
    const file = tempArray[tempArray.length - 1]
    const health = Number(this.state.health)
    const speed = Number(this.state.speed)
    const damage = Number(this.state.damage)
    const weapon = Number(this.state.weapon)
    const type = this.state.type

    if (this.props.onOkCallback) {
      this.props.onOkCallback({ id, name, file, health, speed, damage, weapon, type })
    }
    this.props.onDismissed()
  }

  private onNameChanged = (event: any) => {
    this.setState({ name: event.target.value })
  }

  private onFileChanged = (event: any) => {
    this.setState({ file: event.target.value })
  }

  private onTypeChanged = (event: any) => {
    this.setState({ type: event.target.value })
  }

  private onWeaponChanged = (event: any) => {
    this.setState({ weapon: event.target.value })
  }

  private onSpeedChanged = (event: any) => {
    const numberInString = toZeorOrPositiveIntegerString(event.target.value)
    if (numberInString !== undefined) {
      this.setState({ speed: Number(numberInString) !== 0 ? numberInString : '' })
    }
  }

  private onHealthChanged = (event: any) => {
    const numberInString = toZeorOrPositiveIntegerString(event.target.value)
    if (numberInString !== undefined) {
      this.setState({ health: Number(numberInString) !== 0 ? numberInString : '' })
    }
  }

  private onDamageChanged = (event: any) => {
    const numberInString = toZeorOrPositiveIntegerString(event.target.value)
    if (numberInString !== undefined) {
      this.setState({ damage: Number(numberInString) !== 0 ? numberInString : '' })
    }
  }

  private buildTypeSelect() {
    let options: any[] = []
    options.push(
      <option value={0} key={0}>
        请选择
      </option>
    )

    this.props.typeList.forEach((type, index) => {
      options.push(
        <option value={type.value} key={index + 1}>
          {type.name}
        </option>
      )
    })

    return (
      <FormGroup controlId="bullet">
        <Col componentClass={ControlLabel} sm={smSize}>
          机型
        </Col>
        <Col sm={12 - smSize}>
          <FormControl componentClass="select" placeholder="select" defaultValue="0" onChange={this.onTypeChanged}>
            {options}
          </FormControl>
        </Col>
      </FormGroup>
    )
  }

  private buildWeaponSelect() {
    let options: any[] = []
    options.push(
      <option value={0} key={0}>
        请选择
      </option>
    )
    const allWeapons = this.props.manager.getGameObjectStore().getAllWeapons()
    allWeapons.forEach((weapon, index) => {
      options.push(
        <option value={weapon.id} key={index + 1}>
          {weapon.name}
        </option>
      )
    })

    return (
      <FormGroup controlId="bullet">
        <Col componentClass={ControlLabel} sm={smSize}>
          武器
        </Col>
        <Col sm={12 - smSize}>
          <FormControl componentClass="select" placeholder="select" defaultValue="0" onChange={this.onWeaponChanged}>
            {options}
          </FormControl>
        </Col>
      </FormGroup>
    )
  }

  public render() {
    return (
      <Modal show={true} onHide={this.props.onDismissed} backdrop="static">
        <Modal.Header>
          <Modal.Title>{this.props.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form horizontal>
            <FormGroup controlId="id">
              <Col componentClass={ControlLabel} sm={smSize}>
                ID
              </Col>
              <Col sm={12 - smSize}>
                <FormControl type="text" value={this.state.id} disabled={true} />
              </Col>
            </FormGroup>
            <FormGroup controlId="name">
              <Col componentClass={ControlLabel} sm={smSize}>
                名称
              </Col>
              <Col sm={12 - smSize}>
                <FormControl type="text" value={this.state.name} onChange={this.onNameChanged} />
              </Col>
            </FormGroup>
            <FormGroup controlId={'file'}>
              <Col componentClass={ControlLabel} sm={smSize}>
                图片
              </Col>
              <Col sm={12 - smSize}>
                <FormControl type="file" value={this.state.file} onChange={this.onFileChanged} />
              </Col>
            </FormGroup>
            {this.buildTypeSelect()}
            {this.buildWeaponSelect()}
            <FormGroup controlId="speed">
              <Col componentClass={ControlLabel} sm={smSize}>
                生命值
              </Col>
              <Col sm={12 - smSize}>
                <FormControl type="text" value={this.state.health} onChange={this.onHealthChanged} />
              </Col>
            </FormGroup>
            <FormGroup controlId="speed">
              <Col componentClass={ControlLabel} sm={smSize}>
                速度
              </Col>
              <Col sm={12 - smSize}>
                <FormControl type="text" value={this.state.speed} onChange={this.onSpeedChanged} />
              </Col>
            </FormGroup>
            <FormGroup controlId="speed">
              <Col componentClass={ControlLabel} sm={smSize}>
                伤害
              </Col>
              <Col sm={12 - smSize}>
                <FormControl type="text" value={this.state.damage} onChange={this.onDamageChanged} />
              </Col>
            </FormGroup>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button bsStyle="primary" type="submit" onClick={this.onOK}>
            确定
          </Button>
          <Button bsStyle="primary" onClick={this.props.onDismissed}>
            取消
          </Button>
        </Modal.Footer>
      </Modal>
    )
  }
}
