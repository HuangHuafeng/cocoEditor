import * as React from 'react'
import { Manager, smSize } from './manager'
import { Modal, Button, FormGroup, FormControl, ControlLabel, Form, Col } from 'react-bootstrap'

interface ICreateWeaponProps {
  readonly manager: Manager
  readonly weaponToEdit: number
  readonly title: string
  readonly typeList: any[]
  readonly onDismissed: () => void
}

interface ICreateWeaponState {
  readonly id: string
  readonly name: string
  readonly bullet: string
  readonly triggerInterval: string
  readonly type: string
}

export class CreateWeapon extends React.Component<ICreateWeaponProps, ICreateWeaponState> {
  constructor(props: ICreateWeaponProps) {
    super(props)

    if (this.props.weaponToEdit === 0) {
      this.state = {
        id: '0',
        name: '',
        bullet: '0',
        triggerInterval: '1000',
        type: '',
      }
    } else {
      this.state = {
        id: 'NOT IMPLEMENTED',
        name: 'NOT IMPLEMENTED',
        bullet: 'NOT IMPLEMENTED',
        triggerInterval: 'NOT IMPLEMENTED',
        type: 'NOT IMPLEMENTED',
      }
    }
  }

  private onOK = () => {
    const id = 0
    const name = this.state.name
    const bullet = Number(this.state.bullet)
    const triggerInterval = Number(this.state.triggerInterval)
    const type = this.state.type

    this.props.manager.createWeapon({ id, name, bullet, triggerInterval, type })
    this.props.onDismissed()
  }

  private onNameChanged = (event: any) => {
    this.setState({ name: event.target.value })
  }

  private onBulletChanged = (event: any) => {
    this.setState({ bullet: event.target.value })
  }

  private onTriggerIntervalChanged = (event: any) => {
    this.setState({ triggerInterval: event.target.value })
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
          类型
        </Col>
        <Col sm={12 - smSize}>
          <FormControl componentClass="select" placeholder="select" defaultValue="0" onChange={this.onTypeChanged}>
            {options}
          </FormControl>
        </Col>
      </FormGroup>
    )
  }

  private onTypeChanged = (event: any) => {
    this.setState({ type: event.target.value })
  }

  private buildBulletSelect() {
    let options: any[] = []
    options.push(
      <option value={0} key={0}>
        无
      </option>
    )
    const allBullets = this.props.manager.getGameObjectStore().getAllBullets()
    allBullets.forEach((bullet, index) => {
      options.push(
        <option value={bullet.id} key={index + 1}>
          {bullet.name}
        </option>
      )
    })

    return (
      <FormGroup controlId="bullet">
        <Col componentClass={ControlLabel} sm={smSize}>
          子弹
        </Col>
        <Col sm={12 - smSize}>
          <FormControl componentClass="select" placeholder="select" defaultValue="0" onChange={this.onBulletChanged}>
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
          <Modal.Title>{this.props.weaponToEdit === 0 ? '新建武器' : '编辑武器'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form horizontal>
            <FormGroup controlId="id">
              <Col componentClass={ControlLabel} sm={smSize}>
                ID
              </Col>{' '}
              <Col sm={12 - smSize}>
                <FormControl type="text" value={this.state.id} disabled={this.props.weaponToEdit === 0} />
              </Col>
            </FormGroup>
            <FormGroup controlId="name">
              <Col componentClass={ControlLabel} sm={smSize}>
                名称
              </Col>{' '}
              <Col sm={12 - smSize}>
                <FormControl type="text" value={this.state.name} onChange={this.onNameChanged} />
              </Col>
            </FormGroup>
            {this.buildTypeSelect()}
            {this.buildBulletSelect()}
            <FormGroup controlId="speed">
              <Col componentClass={ControlLabel} sm={smSize}>
                扳机间隔
              </Col>{' '}
              <Col sm={12 - smSize}>
                <FormControl
                  type="text"
                  placeholder="毫秒"
                  value={this.state.triggerInterval}
                  onChange={this.onTriggerIntervalChanged}
                />
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
