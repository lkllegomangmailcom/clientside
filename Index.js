
var mode = 'default';
const request = require('request');
var va= 1;
let Mic = require('mic');
console.log('start up');
const Spe = require('speaker');
const n = require('naudiodon');
const mic = Mic({
  endian:BigInt,
  rate:44100,
  channels:1,
  device:'hw:1,0',
  bitDepth:16,
  debug:false

  });




const spek = new Spe({
  channels: 1,
  bitDepth: 16,
  sampleRate: 44100,
  device: 'hw:0,0'
});
console.log(n.getDevices());
const stream = mic.getAudioStream();

stream.pipe(spek);
mic.start();

function after(modee) {

if (modee!="default") {
  mic.pause();
  
     var authOptions = {
    url: 'https://MusicBackend.212logan.repl.co/pimode/',
     headers: {
    
       'Content-Type': 'application/json',
     },
     body: {
       msg:'ready',
       mod:mode
     },
       json:true
     }
      mode=modee;
 request.post(authOptions,function(error, response, body) {
    console.log(body)
  
  })
} else {
 if (mode!=modee) {
  mic.resume();
 }
  console.log('default')
    mode=modee;
}
}
function getMode(){
  
     var authOptions = {
    url: 'https://MusicBackend.212logan.repl.co/mode',
     headers: {
    
       'Content-Type': 'application/json',
     },

       json:true
     }
  
 request.get(authOptions,function(error, response, body) {
    console.log(body.mod)

    after(body.mod);

  
 })
  }
setInterval(function() {
if (va=1){
  va=2
 
}
    getMode();

}, 10000);

