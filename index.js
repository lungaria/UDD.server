require = require('esm')(module)
let electron = require('electron')
let { app, BrowserWindow } = require('electron')
//const path = require('path')
let { fork } = require('child_process')
//let isDev = require('electron-is-dev')

const OSC = require('osc-js')
var osc1 = new OSC({ plugin:  new OSC.WebsocketServerPlugin() })

/*const { ipcMain } = require('electron')
const nativeImage = require('electron').nativeImage;
var image = nativeImage.createFromPath(__dirname + '/resources/img/logo.png');
 image.setTemplateImage(true);*/
// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

let clientWin

//const config_ip='192.168.1.52'
//const config_port=5000
const config_ip='10.30.84.63'
const config_port=9912


osc1.on('open', () => {
  // connection was established
  console.log("connection was established")
});

osc1.on('error', (err) => {
  // an error occurred
  console.log("OSC ERROR!!!")
  console.log(err)
});

function createWindow_cli() {
  clientWin = new BrowserWindow({
    width: 1920,//3840,
    height: 1080,//2160,
    autoHideMenuBar: true,
    fullscreen: true,
    webPreferences: {
      nodeIntegration: true,
      preload: __dirname + '/client-preload.js'
    }
  })

  clientWin.loadFile('client-index.html')

  clientWin.webContents.on('did-finish-load', () => {
   osc1.open({
      host: config_ip.toString(),    // @param {string} Hostname of WebSocket server
      port: parseInt(config_port.toString())            // @param {number} Port of WebSocket server
      }) // start server
  })
}



function createWindow () {
  //Look for second screen
  var electronScreen = electron.screen;
  var displays = electronScreen.getAllDisplays();
  
  var externalDisplay = null;
  for (var i in displays) {
    if (displays[i].bounds.x != 0 || displays[i].bounds.y != 0) {
      externalDisplay = displays[i];
      break;
    }
  }

  if (externalDisplay) {
    mainWindow = new BrowserWindow({
      x: externalDisplay.bounds.x,
      y: externalDisplay.bounds.y,
      width: 1920,//3840,
      height: 1080,//2160,
      //icon:image,
      fullscreen: true,
      autoHideMenuBar: true,
      webPreferences: {
        //preload: path.join(__dirname, 'preload.js'),
        preload: __dirname + '/client-preload.js',
        webSecurity: false,
        nodeIntegration: true
        }
    })
  }else{
    mainWindow = new BrowserWindow({
    width: 1920,//3840,
    height: 1080,//2160,
    //icon:image,
    fullscreen: true,
    autoHideMenuBar: true,
    webPreferences: {
      webSecurity: false,
      //preload: path.join(__dirname, 'preload.js'),
      preload: __dirname + '/client-preload.js',
      nodeIntegration: true
      }
    })
  }

  // and load the index.html of the app.
  mainWindow.loadFile('client-index.html')


  // Open the DevTools.
  //mainWindow.webContents.openDevTools()

  mainWindow.webContents.on('did-finish-load', () => {
	  console.log("IP: "+config_ip+" PORT: "+config_port);
    osc1.open({
      host: config_ip,    
      port: config_port       
      //host: config_ip.toString(),    
      //port: parseInt(config_port.toString())       
      }) 

  })


  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })
}


app.on('ready', async () => {
  createWindow()
})

/*app.on('before-quit', () => {
  if (serverProcess) {
    serverProcess.kill()
    serverProcess = null
  }
})*/
osc1.on('/qq', message => {
  console.log("qq");console.log(message.args);mainWindow.webContents.send('qq', message.args);
})
osc1.on('/show_id', message => {
  console.log("show_id");console.log(message.args);mainWindow.webContents.send('show_id', message.args);
})
osc1.on('/not_show_id', message => {
  console.log("not_show_id");console.log(message.args);mainWindow.webContents.send('not_show_id', message.args);
})
osc1.on('/yes_show_id', message => {
  console.log("yes_show_id");console.log(message.args);mainWindow.webContents.send('yes_show_id', message.args);
})
osc1.on('/not_show_id_screensaver', message => {
  console.log("not_show_id_screensaver");console.log(message.args);mainWindow.webContents.send('not_show_id_screensaver', message.args);
})
osc1.on('/show_id_screensaver', message => {
  console.log("show_id_screensaver");console.log(message.args);mainWindow.webContents.send('show_id_screensaver', message.args);
})

osc1.on('/carregarcapes_proj0', message => {
  console.log("carregarcapes_proj0");console.log(message.args);mainWindow.webContents.send('carregarcapes_proj0', message.args);
})
osc1.on('/carregarcapes_proj0_not', message => {
  console.log("carregarcapes_proj0_not");console.log(message.args);mainWindow.webContents.send('carregarcapes_proj0_not', message.args);
})

osc1.on('/put_proj', message => {
  console.log("put_proj");console.log(message.args);mainWindow.webContents.send('put_proj', message.args);
})
osc1.on('/put_proj_cont', message => {
  console.log("put_proj_cont");console.log(message.args);mainWindow.webContents.send('put_proj_cont', message.args);
})

osc1.on('/tagcloud_but', message => {
  console.log("tagcloud_but");console.log(message.args);mainWindow.webContents.send('tagcloud_but', message.args);
})
osc1.on('/switchStyle', message => {
  console.log("switchStyle");console.log(message.args);mainWindow.webContents.send('switchStyle', message.args);
})
osc1.on('/switchStyleReset_to', message => {
  console.log("switchStyleReset_to");console.log(message.args);mainWindow.webContents.send('switchStyleReset_to', message.args);
})
osc1.on('/select_capes', message => {
  console.log("select_capes");console.log(message.args);mainWindow.webContents.send('select_capes', message.args);
})
osc1.on('/mode_circle_val', message => {
  console.log("mode_circle_val");console.log(message.args);mainWindow.webContents.send('mode_circle_val', message.args);
})
osc1.on('/mode_circle_val_1', message => {
  console.log("mode_circle_val_1");console.log(message.args);mainWindow.webContents.send('mode_circle_val_1', message.args);
})
osc1.on('/mode_circle_val_2', message => {
  console.log("mode_circle_val_2");console.log(message.args);mainWindow.webContents.send('mode_circle_val_2', message.args);
})
osc1.on('/add_new_layer_plus', message => {
  console.log("add_new_layer_plus");console.log(message.args);mainWindow.webContents.send('add_new_layer_plus', message.args);
})
osc1.on('/add_new_layer_html', message => {
  console.log("add_new_layer_html");console.log(message.args);mainWindow.webContents.send('add_new_layer_html', message.args);
})
osc1.on('/set_custom_base_light', message => {
  console.log("set_custom_base_light");console.log(message.args);mainWindow.webContents.send('set_custom_base_light', message.args);
})
osc1.on('/mode_circle_done', message => {
  console.log("mode_circle_done");console.log(message.args);mainWindow.webContents.send('mode_circle_done', message.args);
})
osc1.on('/mode_bretxa_done', message => {
  console.log("mode_bretxa_done");console.log(message.args);mainWindow.webContents.send('mode_bretxa_done', message.args);
})
osc1.on('/set_custom_base_dark', message => {
  console.log("set_custom_base_dark");console.log(message.args);mainWindow.webContents.send('set_custom_base_dark', message.args);
})
osc1.on('/reset_iso', message => {
  console.log("reset_iso");console.log(message.args);mainWindow.webContents.send('reset_iso', message.args);
})
osc1.on('/add_new_layer_to_map', message => {
  console.log("add_new_layer_to_map");console.log(message.args);mainWindow.webContents.send('add_new_layer_to_map', message.args);
})
osc1.on('/switchLayer', message => {
  console.log("switchLayer");console.log(message.args);mainWindow.webContents.send('switchLayer', message.args);
})
osc1.on('/clickmap_ini', message => {
  console.log("clickmap_ini");console.log(message.args);mainWindow.webContents.send('clickmap_ini', message.args);
})
osc1.on('/clickmap_t', message => {
  console.log("clickmap_t");console.log(message.args);mainWindow.webContents.send('clickmap_t', message.args);
})
osc1.on('/show_feas', message => {
  console.log("show_feas");console.log(message.args);mainWindow.webContents.send('show_feas', message.args);
})
osc1.on('/show_feas_log', message => {
  console.log("show_feas_log");console.log(message.args);mainWindow.webContents.send('show_feas_log', message.args);
})
osc1.on('/draw_create_server', message => {
  console.log("draw_create_server");console.log(message.args);mainWindow.webContents.send('draw_create_server', message.args);
})
osc1.on('/movemap00', message => {
  console.log("movemap00");console.log(message.args);mainWindow.webContents.send('movemap00', message.args);
})
osc1.on('/zoommap00', message => {
  console.log("zoommap00");console.log(message.args);mainWindow.webContents.send('zoommap00', message.args);
})
osc1.on('/centermap00', message => {
  console.log("centermap00");console.log(message.args);mainWindow.webContents.send('centermap00', message.args);
})
osc1.on('/bearingmap00', message => {
  console.log("bearingmap00");console.log(message.args);mainWindow.webContents.send('bearingmap00', message.args);
})
osc1.on('/pitchmap00', message => {
  console.log("pitchmap00");console.log(message.args);mainWindow.webContents.send('pitchmap00', message.args);
})
osc1.on('/show_id', message => {
  console.log("show_id");console.log(message.args);mainWindow.webContents.send('show_id', message.args);
})
osc1.on('/set_destination', message => {
  console.log("set_destination");console.log(message.args);mainWindow.webContents.send('set_destination', message.args);
})
