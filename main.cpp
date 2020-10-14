extern void jsSetInterval(void (*callback)(), float interval);
extern void jsFillRect(int x, int y, int w, int h);
extern void jsClearRect(int x, int y, int w, int h);
extern int canvasWidth;
extern int canvasHeight;
typedef struct {
  float x;
  float y;
  float width;
  float height;
  int direction;
} Sprite;
Sprite* sprite;
void runCallback(void (*callback)()) {
  return callback();
}
void mainloop(void) {
  jsClearRect(0,0,canvasWidth, canvasHeight);
  if(sprite->x + sprite->width == canvasWidth) {
    sprite->direction = -1;
  } else if(sprite->x == 0) {
    sprite->direction = 1;
  }
  sprite->x += 50 * sprite->direction;
  jsFillRect(sprite->x, sprite->y, sprite->width, sprite->height);
}
int main(void) { 
  sprite->x = 0;
  sprite->y = 0;
  sprite->width = 50;
  sprite->height = 50;
  sprite->direction = 1;
  jsSetInterval(mainloop, 16.67);
  return 0;
}
