import * as Electron from 'electron'
import { emit } from '../common/menu-event'

let template: Array<Electron.MenuItemConstructorOptions> = [
  {
    label: '文件',
    submenu: [
      {
        label: '新建',
        accelerator: 'CmdOrCtrl+N',
        click: emit('file-new'),
      },
      {
        label: '打开',
        accelerator: 'CmdOrCtrl+O',
        click: emit('file-open'),
      },
      {
        label: '保存',
        accelerator: 'CmdOrCtrl+S',
        click: emit('file-save'),
      },
      {
        label: '关闭',
        accelerator: 'CmdOrCtrl+W',
        click: emit('file-close'),
      },
    ],
  },
  {
    role: 'editMenu',
  },
  {
    label: '对象',
    submenu: [
      {
        label: '新建子弹',
        click: emit('new-bullet'),
      },
      {
        label: '新建武器',
        click: emit('new-weapon'),
      },
      {
        label: '新建敌人',
        click: emit('new-enemy-force'),
      },
      {
        label: '新建盟友',
        click: emit('new-friend-plane'),
      },
      {
        label: '新建背景',
        click: emit('new-background'),
      },
      {
        label: '新建对象生产者',
        click: emit('new-object-generator'),
      },
    ],
  },
  {
    label: '场景',
    submenu: [
      {
        label: '添加对象',
        click: emit('add-scene-object'),
      },
      {
        label: '添加玩家主机',
        click: emit('add-player-plane'),
      },
    ],
  },
  {
    label: '帮助',
    role: 'help',
    submenu: [],
  },
]

export function buildDefaultMenu(): Electron.Menu {
  if (__DEV__) {
    template.splice(2, 0, {
      label: 'View',
      submenu: [
        {
          role: 'reload',
        },
        {
          role: 'forcereload',
        },
        {
          role: 'toggledevtools',
        },
        {
          role: 'togglefullscreen',
        },
      ],
    })
  }

  if (process.platform === 'darwin') {
    const name = Electron.app.getName()
    template.unshift({
      label: name,
      submenu: [
        {
          label: `关于${name}`,
          click: emit('show-about'),
        },
        {
          type: 'separator',
        },
        {
          role: 'services',
          submenu: [],
        },
        {
          type: 'separator',
        },
        {
          role: 'hide',
        },
        {
          role: 'hideothers',
        },
        {
          role: 'unhide',
        },
        {
          type: 'separator',
        },
        {
          role: 'quit',
        },
      ],
    })
  }

  if (process.platform === 'win32') {
    const name = Electron.app.getName()

    // add the Exit menu item
    let fileSubmenu = template[0].submenu as Electron.MenuItemConstructorOptions[]
    fileSubmenu.push({
      label: '退出',
      accelerator: 'CmdOrCtrl+Q',
      role: 'quit',
    })

    // add the About menu item
    let helpMenu = template[template.length - 1].submenu as Electron.MenuItemConstructorOptions[]
    helpMenu.unshift({
      label: `关于${name}`,
      click: emit('show-about'),
    })
  }

  return Electron.Menu.buildFromTemplate(template)
}
