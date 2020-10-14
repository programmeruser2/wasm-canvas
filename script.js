const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
WebAssembly.instantiateStreaming(fetch('main.wasm'), {
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
}).then(result => {
  const instance = result.instance;
  instance.exports.main();
});

