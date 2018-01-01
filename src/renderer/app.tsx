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
import { CreateBullet } from './CreateBullet'
import { CreateWeapon } from './CreateWeapon'
import { CreateForce } from './CreateForce'
import { CreatePlayerPlane } from './CreatePlayerPlane'
import { CreateObject } from './CreateObject'

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
      case 'new-bullet-class':
        return this.props.manager.showPopup(PopupType.CreateBullet)

      case 'new-weapon-class':
        return this.props.manager.showPopup(PopupType.CreateWeapon)

      case 'new-enemy-force-class':
        return this.props.manager.showPopup(PopupType.CreateEnemyForce)

      case 'new-friend-plane-class':
        return this.props.manager.showPopup(PopupType.CreateFriendPlane)

      case 'new-player-plane':
        return this.props.manager.showPopup(PopupType.CreatePlayerPlane)

      case 'new-object':
        return this.props.manager.showPopup(PopupType.CreateObject)

      case 'file-save':
        return this.props.manager.save()

      default:
        return notImplemented(event)
    }
  }

  public onPopupDismissed(dialog: PopupType) {
    this.props.manager.onPopupDismissed(dialog)
  }

  private renderADialog(dialog: PopupType) {
    switch (dialog) {
      case PopupType.CreateBullet:
        return this.renderCreateBulletDialog()

      case PopupType.CreateWeapon:
        return this.renderCreateWeaponDialog()

      case PopupType.CreateEnemyForce:
        return this.renderCreateEnemyForceDialog()

      case PopupType.CreateFriendPlane:
        return this.renderCreateFriendPlaneDialog()

      case PopupType.CreatePlayerPlane:
        return this.renderCreatePlayerPlaneDialog()

      case PopupType.CreateObject:
        return this.renderCreateEnemyObjectDialog()

      default:
        assert.ok(false, `Unknown dialog: ${name}`)
        return
    }
  }

  private renderCreateBulletDialog() {
    return (
      <CreateBullet
        key="create-bullet"
        onDismissed={() => {
          this.onPopupDismissed(PopupType.CreateBullet)
        }}
        manager={this.props.manager}
        bulletToEdit={0}
        title="新建子弹"
        typeList={this.props.manager.getGameObjectStore().getBulletTypes()}
      />
    )
  }

  private renderCreateWeaponDialog() {
    return (
      <CreateWeapon
        key="create-weapon"
        onDismissed={() => {
          this.onPopupDismissed(PopupType.CreateWeapon)
        }}
        manager={this.props.manager}
        weaponToEdit={0}
        title="新建武器"
        typeList={this.props.manager.getGameObjectStore().getWeaponTypes()}
      />
    )
  }

  private renderCreateEnemyForceDialog() {
    return (
      <CreateForce
        key="create-enemy-force"
        onDismissed={() => {
          this.onPopupDismissed(PopupType.CreateEnemyForce)
        }}
        manager={this.props.manager}
        forceToEdit={0}
        title="新建敌人类型"
        typeList={this.props.manager.getGameObjectStore().getOtherForceTypes()}
        onOkCallback={(parameter): void => {
          this.props.manager.createForce(parameter)
        }}
      />
    )
  }

  private renderCreateFriendPlaneDialog() {
    return (
      <CreateForce
        key="create-friend-plane"
        onDismissed={() => {
          this.onPopupDismissed(PopupType.CreateFriendPlane)
        }}
        manager={this.props.manager}
        forceToEdit={0}
        title="新建盟友类型"
        typeList={this.props.manager.getGameObjectStore().getPlayerPlaneTypes()}
        onOkCallback={(parameter): void => {
          this.props.manager.createForce(parameter)
        }}
      />
    )
  }

  private renderCreatePlayerPlaneDialog() {
    return (
      <CreatePlayerPlane
        key="create-player-plane"
        onDismissed={() => {
          this.onPopupDismissed(PopupType.CreatePlayerPlane)
        }}
        manager={this.props.manager}
        playerPlaneToEdit={0}
      />
    )
  }

  private renderCreateEnemyObjectDialog() {
    const title = '新建敌人'
    const fromClassList = this.props.manager.getGameObjectStore().getAllClonableObjects()

    return (
      <CreateObject
        key="create-enemy-object"
        onDismissed={() => {
          this.onPopupDismissed(PopupType.CreateObject)
        }}
        manager={this.props.manager}
        fromClassList={fromClassList}
        title={title}
        objectToEdit={0}
      />
    )
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
      <div>
        <SplitPane split="vertical" defaultSize={300} maxSize={400}>
          <SplitPane split="horizontal" defaultSize={300} maxSize={500}>
            <GameObjects manager={this.props.manager} />
            <ObjectDetails manager={this.props.manager} />
          </SplitPane>
          <GamePreview manager={this.props.manager} />
        </SplitPane>
        {this.renderDialogs()}
      </div>
    )
  }
}
