# wasm-canvas
A simple example of calling JavaScript functions from C to draw on the canvas.

## Imports Object
```
const canvas = //... HTMLElement representing a canvas
const ctx = //... Canvas2DRenderingContext
const imports = {
  env: {
    getCanvasWidth: function() { return canvas.width; },
    getCanvasHeight: function() { return canvas.height; },
    jsSetInterval: function(callback, interval) {
      setInterval(function() {
        instance.exports.runCallback(callback);
      },interval);
    },
    jsFillRect: function(x,y,w,h) {
      ctx.fillRect(x,y,w,h);
    },
    jsClearRect: function(x,y,w,h) {
      ctx.clearRect(x,y,w,h);
    }
  }
};
```
