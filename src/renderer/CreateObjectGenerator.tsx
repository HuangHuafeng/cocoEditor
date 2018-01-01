import * as React from 'react'
import { Manager, smSize } from './manager'
import { Modal, Button, FormGroup, FormControl, ControlLabel, Form, Col } from 'react-bootstrap'

interface ICreateObjectGeneratorProps {
  readonly manager: Manager
  readonly objectGeneratorToEdit: number
  readonly title: string
  readonly typeList: any[]
  readonly onDismissed: () => void
}

interface ICreateObjectGeneratorState {
  readonly id: string
  readonly name: string
  readonly classId: number
  readonly triggerInterval: string
  readonly type: string
}

export class CreateObjectGenerator extends React.Component<ICreateObjectGeneratorProps, ICreateObjectGeneratorState> {
  constructor(props: ICreateObjectGeneratorProps) {
    super(props)

    if (this.props.objectGeneratorToEdit === 0) {
      this.state = {
        id: '0',
        name: '',
        classId: 0,
        triggerInterval: '1000',
        type: '',
      }
    } else {
      this.state = {
        id: 'NOT IMPLEMENTED',
        name: 'NOT IMPLEMENTED',
        classId: 0,
        triggerInterval: 'NOT IMPLEMENTED',
        type: 'NOT IMPLEMENTED',
      }
    }
  }

  private onOK = () => {
    const id = 0
    const name = this.state.name
    const classId = Number(this.state.classId)
    const triggerInterval = Number(this.state.triggerInterval)
    const type = this.state.type

    this.props.manager.createObjectGenerator({ id, name, classId, triggerInterval, type })
    this.props.onDismissed()
  }

  private onNameChanged = (event: any) => {
    this.setState({ name: event.target.value })
  }

  private onClassIdChanged = (event: any) => {
    this.setState({ classId: event.target.value })
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

  private buildObjectSelect() {
    let options: any[] = []
    options.push(
      <option value={0} key={0}>
        请选择
      </option>
    )
    const allClonableObjects = this.props.manager.getGameObjectStore().getAllClonableObjects()
    allClonableObjects.forEach((object, index) => {
      options.push(
        <option value={object.id} key={index + 1}>
          {object.name}
        </option>
      )
    })

    return (
      <FormGroup controlId="objects">
        <Col componentClass={ControlLabel} sm={smSize}>
          生产对象
        </Col>
        <Col sm={12 - smSize}>
          <FormControl componentClass="select" placeholder="select" defaultValue="0" onChange={this.onClassIdChanged}>
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
                <FormControl type="text" value={this.state.id} disabled={this.props.objectGeneratorToEdit === 0} />
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
            {this.buildTypeSelect()}
            {this.buildObjectSelect()}
            <FormGroup controlId="speed">
              <Col componentClass={ControlLabel} sm={smSize}>
                产生间隔
              </Col>
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
