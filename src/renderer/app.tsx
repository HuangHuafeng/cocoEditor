import * as React from 'react'
import * as Electron from 'electron'
import * as assert from 'assert'
import SplitPane from 'react-split-pane'
import { MenuEvent, sendMenuEvent } from '../common/menu-event'
import { Manager, PopupType } from './manager'
import { debugLog } from '../common/helper-functions'
import { GameObjects } from './GameObjects'
import { ObjectDetails } from './ObjectDetails'
import { GamePreview } from './GamePreview'

const notImplemented = (name: string) => {
  const options = {
    type: 'info',
    title: 'Sorry',
    buttons: ['Ok'],
    message: `"${name}" is not implemented yet. It will come.`,
  }
  Electron.remote.dialog.showMessageBox(Electron.remote.getCurrentWindow(), options)
}

export interface IAppProps {
  readonly manager: Manager
}

interface IAppState {}

export class App extends React.Component<IAppProps, IAppState> {
  public constructor(props: IAppProps) {
    super(props)
    debugLog('App constructed')

    Electron.ipcRenderer.on('menu-event', (event: Electron.IpcMessageEvent, { name }: { name: MenuEvent }) => {
      this.onMenuEvent(name)
    })

    Electron.ipcRenderer.on('updateReady', this.onUpdateReady)
  }

  public componentDidMount() {
    this.props.manager.registerApp(this)
  }

  private onUpdateReady = (event: any, text: any) => {
    const options = {
      type: 'info',
      buttons: ['现在升级', '稍后再说'],
      message: '新版本下载完成，现在就升级吗？\n选择稍后升级后，可以在帮助菜单里选择“重启并安装新版本”升级。',
    }
    const response = Electron.remote.dialog.showMessageBox(Electron.remote.getCurrentWindow(), options)
    if (response === 0) {
      sendMenuEvent('quitAndInstall')
    }
  }

  public update() {
    this.setState({})
  }

  /**
   * Handles menu events
   * @param event menu event
   */
  private onMenuEvent(event: MenuEvent) {
    switch (event) {
      default:
        return notImplemented(event)
    }
  }

  public onPopupDismissed(dialog: PopupType) {
    this.props.manager.onPopupDismissed(dialog)
  }

  private renderADialog(dialog: PopupType) {
    switch (dialog) {
      default:
        assert.ok(false, `Unknown dialog: ${name}`)
        return
    }
  }

  public renderDialogs() {
    const openDialogs = this.props.manager.getOpenDialogs()
    let ret: any[] = []
    for (let dialog of openDialogs) {
      ret.push(this.renderADialog(dialog))
    }
    return ret
  }

  public render() {
    return (
      <SplitPane split="vertical" defaultSize={300} maxSize={400}>
        <SplitPane split="horizontal" defaultSize={300} maxSize={500}>
          <GameObjects manager={this.props.manager} />
          <ObjectDetails manager={this.props.manager} />
        </SplitPane>
        <GamePreview manager={this.props.manager} />
      </SplitPane>
    )
  }
}
