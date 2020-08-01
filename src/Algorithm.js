function Algorithm(){
  this.animation = 0;
  this.cities = [];
  this.iterations = 0;
  this.permutation = [];
  this.best_distance = Infinity;
  this.best_path = [];
  this.limit_cities = Infinity;
  this.limit = Infinity;

  this.run = function(){
    if(this.cities.length == 0) return;
    this.animation = 1;
  }

  this.new_city = function(x, y){
    if(this.animation) return;
    for(var i = this.cities.length - 1; i >= 0; --i){
      var d = this.cities[i].check( x, y );
      if(d == true){
        this.cities.splice(i , 1);
        return;
      }

    }
    if(this.cities.length >= this.limit_cities) return;
    this.cities.push(new City(this.cities.length, x, y));
  }

  this.restart = function(){
    this.iterations = 0;
    this.best_distance = Infinity;
    this.animation = 0;
    this.permutation = [];
    this.best_path = [];
  }

  this.set_iterations = function(num=this.limit){
    this.limit = num;
  }
}
