function HeldKarp(cities=[], limit = Infinity){
  Algorithm.call(this);
  this.name = "Dynamic Programming : Held-Karp";
  this.mask = 0;
  this.from = 0;
  this.goes = 0;
  this.dp = [];
  this.limit_cities = 12;
  this.cities = cities;
  this.limit = limit;

  this.show = function(){

    if(this.animation){
      strokeWeight(1);
      stroke('grey');
      fill('grey');

      if(!this.done()){
        this.permutation = this.generate_next_state();

        var d = 0;
        for(var i = 0; i < this.permutation.length; ++i){
          var nw = this.permutation[i];
          var nx = this.permutation[(i + 1)%this.permutation.length];
          const px1 = myMap.latLngToPixel(this.cities[nw].x, this.cities[nw].y);
          const px2 = myMap.latLngToPixel(this.cities[nx].x, this.cities[nx].y);
          line(px1.x, px1.y, px2.x, px2.y);
          d+= dist(this.cities[nw].x, this.cities[nw].y, this.cities[nx].x, this.cities[nx].y);
        }

        if(this.permutation.length == this.cities.length){
            if(d < this.best_distance){
              this.best_distance = Math.round(d*10)/10;
              this.best_path = this.permutation.slice();
            }
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

  this.done = function(){
    if(this.iterations >= this.limit) return 1;
    return this.animation && this.paths.length == 0;
  }

  this.generate_next_state = function(){
    if(this.paths.length == 0) return [];
    else{
      this.iterations++;
      var nx = this.paths[this.paths.length - 1].slice();
      this.paths.pop();
      return nx;
    }
  }

  this.run = function(){
    if(this.animation || this.cities.length == 0) return;

    if(this.cities.length > this.limit_cities){
      alert("Dynamic Programming Solution only takes up to 12 cities in this animation for it's memory complexity O(2^n*n)");
      while(this.cities.length > this.limit_cities) this.cities.pop();
    }


    this.dp = new Array((1 << this.cities.length));
    this.vis = new Array((1 << this.cities.length));
    this.paths = [];

    for(var i = 0; i < this.dp.length; ++i){
      this.dp[i] = new Array(this.cities.length);
      this.vis[i] = new Array(this.cities.length);
      for(var j = 0; j < this.dp[i].length; ++j){
        this.dp[i][j] = 0;
        this.vis[i][j] = 0;
      }
    }
    this.f(1, 0, [0]);
    this.paths.reverse();
    this.animation = 1;
  }

  this.f = function(mask, from, path){
    this.paths.push(path.slice());
    if(mask == (1 << this.cities.length) - 1){
      return 0;
    }
    if(this.vis[mask][from]) return this.dp[mask][from];

    var dis = Infinity;

    for(var nxt = 0; nxt < this.cities.length; ++nxt){
      var bit = (mask & (1 << nxt));
      if(bit != 0) continue;
      var d = dist(this.cities[from].x, this.cities[from].y, this.cities[nxt].x, this.cities[nxt].y);
      path.push(nxt);
      dis = min( dis, d + this.f(mask  + (1 << nxt) , nxt, path) );
      path.pop();
    }

    this.vis[mask][from] = 1;
    this.dp[mask][from] = dis;
    return dis;
  }

}
