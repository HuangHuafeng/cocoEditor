/**
 * The app manager.
 * It takes care of everything:
 *  * what popups are open, window active or not, ...
 *  * all actions
 *  * state of the app
 *  * anything else
 */

import * as assert from 'assert'
import { App } from '../renderer/app'

export enum PopupType {
  About = 1,
  NewMatch,
  AddPlayer,
  RemovePlayer,
  EditPlayer,
  EditMatch,
  RemoveAllPlayers,
}

export class Manager {
  private static instance: Manager
  private contentToPrint: any
  private openDialogs: PopupType[]
  private app?: App

  private constructor() {
    this.openDialogs = []
  }

  public static getManager(): Manager {
    if (Manager.instance === undefined) {
      Manager.instance = new Manager()
    }

    return Manager.instance
  }

  public print(contentToPrint: any) {
    this.contentToPrint = contentToPrint
    this.updateAppState()
  }

  public getPrintContent() {
    return this.contentToPrint
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

      case PopupType.NewMatch:
        return this.closeTopDialog(dialog)

      case PopupType.AddPlayer:
        return this.closeTopDialog(dialog)

      case PopupType.EditMatch:
        return this.closeTopDialog(dialog)

      case PopupType.RemoveAllPlayers:
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
        if (dialog !== PopupType.EditPlayer && this.openDialogs[this.openDialogs.length - 1] === PopupType.AddPlayer) {
          // we used the edit player when adding new player
          assert.ok(false, `"${dialog}" is NOT same as last one: "${this.openDialogs[this.openDialogs.length - 1]}"`)
        }
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
}
