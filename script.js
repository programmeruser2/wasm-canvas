lib.showCanvas();
const ctx = canvas.getContext('2d');
const wasmModule = new WebAssembly.Module(wasmCode);
console.log(WebAssembly.Module.imports(wasmModule)[3])
const wasmInstance = new WebAssembly.Instance(wasmModule, {
  env: {
    canvasWidth: canvas.width,
    canvasHeight: canvas.height,
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
