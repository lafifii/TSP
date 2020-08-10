function Backtracking(cities=[], limit=Infinity){
  Algorithm.call(this);
  this.name = "Backtracking";
  this.cities = cities;
  this.limit = limit;

  this.show = function(){

    if(this.animation){

      strokeWeight(1);
      if(!this.done()){
        this.iterations++;
        stroke('grey');
        fill('grey');
        this.get_next_permutation();
        var distance = 0;
        for(var i = 0; i < this.permutation.length; ++i){
          var nw = this.permutation[i];
          var nx = this.permutation[(i + 1)%this.permutation.length];
          const px1 = myMap.latLngToPixel(this.cities[nw].x, this.cities[nw].y);
          const px2 = myMap.latLngToPixel(this.cities[nx].x, this.cities[nx].y);
          line(px1.x, px1.y, px2.x, px2.y);
          distance+= dist(this.cities[nw].x, this.cities[nw].y, this.cities[nx].x, this.cities[nx].y);
        }

        distance = Math.round(distance*10)/10;
        this.best_distance = Math.round(this.best_distance*10)/10;
        if(distance < this.best_distance){
          this.best_distance = distance;
          this.best_path = this.permutation.slice();
        }
      }

      stroke('magenta');
      fill('magenta');

      for(var i = 0; i < this.best_path.length; ++i){
        var nw = this.best_path[i];
        var nx = this.best_path[(i + 1)%this.best_path.length];
        const px1 = myMap.latLngToPixel(this.cities[nw].x, this.cities[nw].y);
        const px2 = myMap.latLngToPixel(this.cities[nx].x, this.cities[nx].y);
        line(px1.x, px1.y, px2.x, px2.y);
      }
    }

    for(let item of this.cities)
      item.show();

  }

  this.get_next_permutation = function(){
    if(this.permutation.length == 0){
      for(var i = 0; i < this.cities.length; ++i)
        this.permutation.push(i);

      return ;
    }

    var i = this.permutation.length - 1;
    while (i > 0 && this.permutation[i - 1] >= this.permutation[i])
        i--;

    if (i <= 0) return;

    var j = this.permutation.length - 1;
    while (this.permutation[j] <= this.permutation[i - 1])
        j--;

    [this.permutation[i - 1], this.permutation[j]] = [this.permutation[j], this.permutation[i - 1]];


    j = this.permutation.length - 1;
    while (i < j) {
        [ this.permutation[i], this.permutation[j] ] = [this.permutation[j], this.permutation[i] ];
        i++;
        j--;
    }

  }

  this.done = function(){
    if(this.iterations >= this.limit) return 1;
    if(this.permutation.length == 0) return 0;
    for(var i = 0; i < this.permutation.length - 1; ++i){
      if(this.permutation[i] < this.permutation[i + 1]) return 0;
    }
    return 1;
  }

}
