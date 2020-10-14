const wasmCode = new Uint8Array([0,97,115,109,1,0,0,0,1,24,5,96,0,0,96,4,127,127,127,127,0,96,0,1,127,96,2,127,125,0,96,1,127,0,2,99,5,3,101,110,118,15,103,101,116,67,97,110,118,97,115,72,101,105,103,104,116,0,2,3,101,110,118,14,103,101,116,67,97,110,118,97,115,87,105,100,116,104,0,2,3,101,110,118,11,106,115,67,108,101,97,114,82,101,99,116,0,1,3,101,110,118,10,106,115,70,105,108,108,82,101,99,116,0,1,3,101,110,118,13,106,115,83,101,116,73,110,116,101,114,118,97,108,0,3,3,5,4,4,0,2,0,4,5,1,112,1,2,2,5,3,1,0,1,7,42,4,6,109,101,109,111,114,121,2,0,11,114,117,110,67,97,108,108,98,97,99,107,0,5,8,109,97,105,110,108,111,111,112,0,6,4,109,97,105,110,0,7,9,8,1,0,65,0,11,2,8,6,10,210,1,4,7,0,32,0,17,0,0,11,144,1,2,3,127,3,125,65,0,65,0,16,1,16,0,16,2,65,0,40,2,12,34,0,42,2,8,33,4,32,0,42,2,0,33,5,16,1,33,1,65,0,40,2,12,34,0,42,2,0,33,3,65,127,33,2,2,64,2,64,2,64,32,5,32,4,146,32,1,178,91,13,0,65,1,33,2,32,3,67,0,0,0,0,92,13,1,11,32,0,32,2,54,2,16,12,1,11,32,0,40,2,16,33,2,11,32,0,32,3,32,2,65,50,108,178,146,34,3,56,2,0,32,3,168,32,0,42,2,4,168,32,0,42,2,8,168,32,0,42,2,12,168,16,3,11,50,1,1,127,65,0,40,2,12,34,0,66,0,55,2,0,32,0,66,128,128,160,146,132,128,128,164,194,0,55,2,8,32,0,65,1,54,2,16,65,1,67,41,92,133,65,16,4,65,0,11,3,0,0,11,11,10,1,0,65,12,11,4,0,0,0,0]);
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const wasmModule = new WebAssembly.Module(wasmCode);
console.log(WebAssembly.Module.imports(wasmModule)[3])
const wasmInstance = new WebAssembly.Instance(wasmModule, {
  env: {
    getCanvasWidth: function() { return canvas.width; },
    getCanvasHeight: function() { return canvas.height; },
    jsSetInterval: function(callback, interval) {
      setInterval(function() {
        wasmInstance.exports.runCallback(callback);
      },interval);
    },
    jsFillRect: function(x,y,w,h) {
      ctx.fillRect(x,y,w,h);
    },
    jsClearRect: function(x,y,w,h) {
      ctx.clearRect(x,y,w,h);
    }
  }
});
wasmInstance.exports.main();
