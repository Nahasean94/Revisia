const {app,BrowserWindow}=require('electron')

app.on('ready',()=>{
    const window=new BrowserWindow({width:1200,height:800})
    window.loadURL(`http://localhost:3000/`)
})
