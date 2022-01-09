const SerialPort = require('serialport');
const Readline = require('@serialport/parser-readline');
const port = new SerialPort('COM4', { baudRate: 9600 });
const parser = port.pipe(new Readline({ delimiter: '\n' }));

var data;
// Read the port data
port.on("open", () => {
  console.log('serial port open');
});

//server-side
const io = require('socket.io')(4000, {
  cors: {
      origin:"http://localhost:3000",
  }
})



io.on("connection", socket => {
  parser.on('data', data =>{
    socket.emit("send-id", data);
  });
})