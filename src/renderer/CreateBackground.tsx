import * as React from 'react'
import { Manager, smSize } from './manager'
import { Modal, Button, FormGroup, FormControl, ControlLabel, Form, Col } from 'react-bootstrap'
import { toZeorOrPositiveIntegerString } from '../common/helper-functions'

interface ICreateBackgroundProps {
  readonly manager: Manager
  readonly backgroundToEdit: number
  readonly typeList: any[]
  readonly title: string
  readonly onDismissed: () => void
}

interface ICreateBackgroundState {
  readonly id: string
  readonly name: string
  readonly file1: string
  readonly file2: string
  readonly speed: string
  readonly type: string
}

export class CreateBackground extends React.Component<ICreateBackgroundProps, ICreateBackgroundState> {
  constructor(props: ICreateBackgroundProps) {
    super(props)

    if (this.props.backgroundToEdit === 0) {
      this.state = {
        id: '0',
        name: '',
        file1: '',
        file2: '',
        speed: '',
        type: '',
      }
    } else {
      this.state = {
        id: 'NOT IMPLEMENTED',
        name: 'NOT IMPLEMENTED',
        file1: '',
        file2: '',
        speed: 'NOT IMPLEMENTED',
        type: 'NOT IMPLEMENTED',
      }
    }
  }

  private onOK = () => {
    const id = 0
    const name = this.state.name
    let tempArray = this.state.file1.split('\\')
    const file1 = tempArray[tempArray.length - 1]
    tempArray = this.state.file2.split('\\')
    const file2 = tempArray[tempArray.length - 1]
    const speed = Number(this.state.speed)
    const type = this.state.type

    this.props.manager.createBackground({ id, name, file1, file2, speed, type })
    this.props.onDismissed()
  }

  private onNameChanged = (event: any) => {
    this.setState({ name: event.target.value })
  }

  private onFile1Changed = (event: any) => {
    this.setState({ file1: event.target.value })
  }

  private onFile2Changed = (event: any) => {
    this.setState({ file2: event.target.value })
  }

  private onSpeedChanged = (event: any) => {
    const numberInString = toZeorOrPositiveIntegerString(event.target.value)
    if (numberInString !== undefined) {
      this.setState({ speed: Number(numberInString) !== 0 ? numberInString : '' })
    }
  }

  private buildTypeSelect() {
    let options: any[] = []
    options.push(
      <option value="0" key={0}>
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
          <FormControl componentClass="select" defaultValue="0" onChange={this.onTypeChanged}>
            {options}
          </FormControl>
        </Col>
      </FormGroup>
    )
  }

  private onTypeChanged = (event: any) => {
    this.setState({ type: event.target.value })
  }

  private validateSpeed(): 'success' | 'warning' | 'error' | undefined {
    return this.validateNotLessThanZero(this.state.speed)
  }

  private validateNotLessThanZero(value: string): 'success' | 'warning' | 'error' | undefined {
    if (value.length !== 0) {
      const number = Number(value)
      if (number < 0) {
        return 'error'
      }

      return 'success'
    }

    return undefined
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
                <FormControl type="text" value={this.state.id} disabled={this.props.backgroundToEdit === 0} />
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
                图片1
              </Col>
              <Col sm={12 - smSize}>
                <FormControl type="file" value={this.state.file1} onChange={this.onFile1Changed} />
              </Col>
            </FormGroup>
            <FormGroup controlId={'file'}>
              <Col componentClass={ControlLabel} sm={smSize}>
                图片2
              </Col>
              <Col sm={12 - smSize}>
                <FormControl type="file" value={this.state.file2} onChange={this.onFile2Changed} />
              </Col>
            </FormGroup>
            {this.buildTypeSelect()}
            <FormGroup controlId="speed" validationState={this.validateSpeed()}>
              <Col componentClass={ControlLabel} sm={smSize}>
                速度
              </Col>
              <Col sm={12 - smSize}>
                <FormControl type="text" value={this.state.speed} onChange={this.onSpeedChanged} />
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
