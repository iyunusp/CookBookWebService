function Obstacle(x, y) {
  this.x = x;
  this.y = y;
  this.w = 20+random(10);
  this.h = 80;
  this.canSpawn=true;
}
Obstacle.prototype.show = function() {
  stroke(0);
  noFill();
  rect(this.x, this.y, this.w, this.h);
}
Obstacle.prototype.move = function(speed) {this.x-=speed;}