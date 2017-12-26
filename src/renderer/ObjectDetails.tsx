import * as React from 'react'
import { Manager } from './manager'

interface IObjectDetailsProps {
  readonly manager: Manager
}

interface IObjectDetailsState {}

export class ObjectDetails extends React.Component<IObjectDetailsProps, IObjectDetailsState> {
  constructor(props: IObjectDetailsProps) {
    super(props)
  }

  public render() {
    return <div id="object-details">Object details</div>
  }
}
