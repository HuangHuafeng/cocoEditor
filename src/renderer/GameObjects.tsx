import * as React from 'react'
import { Manager } from './manager'
import { debugLog } from '../common/helper-functions'

interface IGameObjectsProps {
  readonly manager: Manager
}

interface IGameObjectsState {}

export class GameObjects extends React.Component<IGameObjectsProps, IGameObjectsState> {
  constructor(props: IGameObjectsProps) {
    super(props)
    debugLog('Test constructed')
  }

  public render() {
    return <div id="game-objects">Game objects</div>
  }
}
