import * as React from 'react'
import { Manager, smSize } from './manager'
import { Form, Modal, Button, FormGroup, FormControl, ControlLabel, Col } from 'react-bootstrap'
import { toZeorOrPositiveIntegerString } from '../common/helper-functions'
import { GameObject } from './GameObject'

interface ICreateObjectPlaneProps {
  readonly manager: Manager
  readonly fromClassList: GameObject[]
  readonly onOkCallback: (parameter: any) => void
  readonly title: string
  readonly objectToEdit: number
  readonly onDismissed: () => void
}

interface ICreateObjectPlaneState {
  readonly id: string
  readonly classId: number
  readonly bornTime: string
  readonly bornX: string
  readonly bornY: string
  readonly destinationX: string
  readonly destinationY: string
}

export class CreateObject extends React.Component<ICreateObjectPlaneProps, ICreateObjectPlaneState> {
  constructor(props: ICreateObjectPlaneProps) {
    super(props)

    if (this.props.objectToEdit === 0) {
      this.state = {
        id: '0',
        classId: 0,
        bornTime: '0',
        bornX: '0',
        bornY: '0',
        destinationX: '0',
        destinationY: '0',
      }
    }
  }

  private onOK = () => {
    const id = 0
    const classId = this.state.classId
    const bornTime = Number(this.state.bornTime)
    const bornX = Number(this.state.bornX)
    const bornY = Number(this.state.bornY)
    const destinationX = Number(this.state.destinationX)
    const destinationY = Number(this.state.destinationY)

    if (this.props.onOkCallback) {
      this.props.onOkCallback({ id, classId, bornTime, bornX, bornY, destinationX, destinationY })
    }
    this.props.onDismissed()
  }

  private onBornTimeChanged = (event: any) => {
    const numberInString = toZeorOrPositiveIntegerString(event.target.value)
    if (numberInString !== undefined) {
      this.setState({ bornTime: Number(numberInString) !== 0 ? numberInString : '' })
    }
  }

  private onBornXChanged = (event: any) => {
    const numberInString = toZeorOrPositiveIntegerString(event.target.value)
    if (numberInString !== undefined) {
      this.setState({ bornX: Number(numberInString) !== 0 ? numberInString : '' })
    }
  }

  private onBornYChanged = (event: any) => {
    const numberInString = toZeorOrPositiveIntegerString(event.target.value)
    if (numberInString !== undefined) {
      this.setState({ bornY: Number(numberInString) !== 0 ? numberInString : '' })
    }
  }

  private onDestinationXChanged = (event: any) => {
    const numberInString = toZeorOrPositiveIntegerString(event.target.value)
    if (numberInString !== undefined) {
      this.setState({ destinationX: Number(numberInString) !== 0 ? numberInString : '' })
    }
  }

  private onDestinationYChanged = (event: any) => {
    const numberInString = toZeorOrPositiveIntegerString(event.target.value)
    if (numberInString !== undefined) {
      this.setState({ destinationY: Number(numberInString) !== 0 ? numberInString : '' })
    }
  }

  private onClassIdChanged = (event: any) => {
    this.setState({ classId: Number(event.target.value) })
  }

  private buildFriendPlaneSelect() {
    let options: any[] = []
    options.push(
      <option value={0} key={0}>
        请选择
      </option>
    )

    this.props.fromClassList.forEach((classObject, index) => {
      options.push(
        <option value={classObject.id} key={index + 1}>
          {classObject.name}
        </option>
      )
    })

    return (
      <FormGroup controlId="bullet">
        <Col componentClass={ControlLabel} sm={smSize}>
          种类
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
                <FormControl type="text" value={this.state.id} disabled={true} />
              </Col>
            </FormGroup>
            {this.buildFriendPlaneSelect()}
            <FormGroup controlId="speed">
              <Col componentClass={ControlLabel} sm={smSize}>
                出生时间
              </Col>
              <Col sm={12 - smSize}>
                <FormControl type="text" value={this.state.bornTime} onChange={this.onBornTimeChanged} />
              </Col>
            </FormGroup>
            <FormGroup controlId="born-point">
              <Col componentClass={ControlLabel} sm={smSize}>
                出生点X
              </Col>
              <Col sm={6 - smSize}>
                <FormControl type="text" value={this.state.bornX} onChange={this.onBornXChanged} />
              </Col>
              <Col componentClass={ControlLabel} sm={smSize}>
                出生点Y
              </Col>
              <Col sm={6 - smSize}>
                <FormControl type="text" value={this.state.bornY} onChange={this.onBornYChanged} />
              </Col>
            </FormGroup>
            <FormGroup controlId="destination-point">
              <Col componentClass={ControlLabel} sm={smSize}>
                目的地X
              </Col>
              <Col sm={6 - smSize}>
                <FormControl type="text" value={this.state.destinationX} onChange={this.onDestinationXChanged} />
              </Col>
              <Col componentClass={ControlLabel} sm={smSize}>
                目的地Y
              </Col>
              <Col sm={6 - smSize}>
                <FormControl type="text" value={this.state.destinationY} onChange={this.onDestinationYChanged} />
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
