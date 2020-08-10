function City(id, x, y, ld = 10){
  this.id = id;
  this.x = x;
  this.y = y;
  this.ld = ld;

  this.show = function(){

    noStroke();
    fill(color(0, 255, 255,200));
    const px = myMap.latLngToPixel(this.x, this.y);
    circle(px.x , px.y, this.ld/2);
  }

  this.set = function(x, y){
    this.x = x;
    this.y = y;
  }

  this.check = function(x, y){
    const px1 = myMap.latLngToPixel(this.x, this.y);
    const px2 = myMap.latLngToPixel(x, y);
    return dist(px1.x, px1.y, px2.x, px2.y) <= this.ld;
  }
}
