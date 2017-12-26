import * as React from 'react'
import { Manager } from './manager'
import { debugLog } from '../common/helper-functions'

interface IGamePreviewProps {
  readonly manager: Manager
}

interface IGamePreviewState {}

export class GamePreview extends React.Component<IGamePreviewProps, IGamePreviewState> {
  constructor(props: IGamePreviewProps) {
    super(props)
    debugLog('Test constructed')
  }

  public render() {
    return <div id="game-objects">Game preview</div>
  }
}
