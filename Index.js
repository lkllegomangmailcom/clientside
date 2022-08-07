
var mode = 'default';
const request = require('request');

let Mic = require('mic');
console.log('start up');
const Spe = require('speaker');
const mic = Mic({
        rate:44100,
        channels:1,
        device:'hw:3,0',
        bitDepth:16,
        debug:false,
        exitOnSilence:6
        });




const spek = new Spe({
        channels: 1,
        bitDepth: 16,
        sampleRate: 44100,
        device: 'hw:0,0'
});

const stream = mic.getAudioStream();

stream.pipe(spek);
mic.start();

function after(mode) {
  
if (mode!="default") {
  mic.stop();
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
  
 request.post(authOptions,function(error, response, body) {
    console.log(body)
  
  })
} else {
  mic.start();
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
    console.log(body)
  if (body.mod!=mode) {
    
  }
  
 })
  }
setInterval(function() {

    getMode();

}, 60000);
