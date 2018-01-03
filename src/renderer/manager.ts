/**
 * The app manager.
 * It takes care of everything:
 *  * what popups are open, window active or not, ...
 *  * all actions
 *  * state of the app
 *  * anything else
 */

import * as assert from 'assert'
import * as Electron from 'electron'
import { App } from '../renderer/app'
import { GameObjectStore } from './GameObjectStore'

export const smSize = 2

export enum PopupType {
  About = 1,
  CreateBullet,
  CreateWeapon,
  CreateEnemyObject,
  CreateFriendPlane,
  CreateBackground,
  CreateObjectGenerator,
  AddSceneObject,
  AddPlayerPlane,
}

export class Manager {
  private static instance: Manager
  private openDialogs: PopupType[]
  private app?: App
  private gameObjectStore: GameObjectStore

  private constructor() {
    this.openDialogs = []
    this.gameObjectStore = new GameObjectStore()
  }

  public static getManager(): Manager {
    if (Manager.instance === undefined) {
      Manager.instance = new Manager()
    }

    return Manager.instance
  }

  public getOpenDialogs() {
    return this.openDialogs
  }

  /**
   * check if the "dialog" dialog is already open. We don't want to open the same dialog
   * because it can cause issues (like duplicated key, id of the dialog element).
   * @param dialog the dialog to be checked
   */
  private isDialogAlreadyOpen(dialog: PopupType): boolean {
    return this.openDialogs.findIndex(value => value === dialog) !== -1
  }

  /**
   * Just dismiss (only) the top dialog, do nothing else
   * @param dialog the dialog justed submitted
   */
  public onPopupDismissed(dialog: PopupType): void {
    switch (dialog) {
      case PopupType.About:
        return this.closeTopDialog(dialog)

      case PopupType.CreateBullet:
        return this.closeTopDialog(dialog)

      case PopupType.CreateWeapon:
        return this.closeTopDialog(dialog)

      case PopupType.CreateEnemyObject:
        return this.closeTopDialog(dialog)

      case PopupType.CreateObjectGenerator:
        return this.closeTopDialog(dialog)

      case PopupType.CreateFriendPlane:
        return this.closeTopDialog(dialog)

      case PopupType.AddPlayerPlane:
        return this.closeTopDialog(dialog)

      case PopupType.AddSceneObject:
        return this.closeTopDialog(dialog)

      case PopupType.CreateBackground:
        return this.closeTopDialog(dialog)

      default:
        assert.ok(false, `Unknown value: "${dialog}"`)
        return
    }
  }

  public showPopup(dialog: PopupType) {
    if (!this.isDialogAlreadyOpen(dialog)) {
      this.openDialogs.push(dialog)
      this.updateAppState()
    }
  }

  /**
   *
   * @param dialog must be equal to the top/last dialog
   */
  private closeTopDialog(dialog?: PopupType) {
    if (dialog) {
      if (dialog !== this.openDialogs[this.openDialogs.length - 1]) {
        // we used the edit player when adding new player
        assert.ok(false, `"${dialog}" is NOT same as last one: "${this.openDialogs[this.openDialogs.length - 1]}"`)
      }
    }
    this.openDialogs.pop()
    this.updateAppState()
  }

  /**
   * We can only manage one app and it can NOT be changed
   * @param app the app that is managed by this manager
   */
  public registerApp(app: App) {
    if (this.app === undefined) {
      this.app = app
      // probably it's not a good idea to call update app state here
      //this.updateAppState()
    }
  }

  private updateAppState() {
    if (this.app !== undefined) {
      this.app.update()
    }
  }

  public createBullet(parameter: any) {
    this.gameObjectStore.createBullet(parameter)
  }

  public createWeapon(parameter: any) {
    this.gameObjectStore.createWeapon(parameter)
  }

  public createObjectGenerator(parameter: any) {
    this.gameObjectStore.createObjectGenerator(parameter)
  }

  public addPlayerPlane(parameter: any) {
    this.gameObjectStore.addPlayerPlane(parameter)
  }

  public addSceneObject(parameter: any) {
    this.gameObjectStore.addSceneObject(parameter)
  }

  public createObject(parameter: any) {
    this.gameObjectStore.createObject(parameter)
  }

  public createBackground(parameter: any) {
    this.gameObjectStore.createBackground(parameter)
  }

  public getGameObjectStore() {
    return this.gameObjectStore
  }

  public save() {
    const options = {
      defaultPath: '',
      filters: [{ name: 'JSON 文件', extensions: ['json'] }],
    }
    /* show a file-open dialog and read the first selected file */
    var fileName = Electron.remote.dialog.showSaveDialog(Electron.remote.getCurrentWindow(), options)
    if (fileName) {
      this.gameObjectStore.save(fileName)
    }
  }
}
