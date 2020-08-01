function  GeneticAlgorithm(cities = [], limit = 500){
  Algorithm.call(this);
  this.name = "Genetic Algorithm";
  this.limit = limit;
  this.parents = Math.round(random(20, 30));
  this.population = [];
  this.fitness = [];
  this.current_best = [];
  this.cities = cities;

  this.show = function(){

    if(this.animation){
      strokeWeight(1);

      if(!this.done()) {
        stroke('grey');
        fill('grey');
        this.get_next_generation();
        for(var i = 0; i < this.current_best.length; ++i){
          var nw = this.current_best[i];
          var nx = this.current_best[(i + 1)%this.current_best.length];
          const px1 = myMap.latLngToPixel(this.cities[nw].x, this.cities[nw].y);
          const px2 = myMap.latLngToPixel(this.cities[nx].x, this.cities[nx].y);
          line(px1.x, px1.y, px2.x, px2.y);
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
    return this.iterations >= this.limit;
  }

  this.get_next_generation = function(){
    this.iterations++;
    var i;
    if(this.population.length == 0){
      var ar  = [];
      this.best_path = new Array(this.cities.length);
      this.current_best = new Array(this.cities.length);
      for(i = 0; i < this.cities.length; ++i) ar.push(i);
      for(i = 0; i < this.parents; ++i){
        this.population.push(shuffle(ar));
        this.fitness.push(0);
      }
    }

    this.calculateFitness();
    var newPopulation = [];
    for(i = 0; i < this.population.length; ++i){
      var gen1 = this.improved_selection(this.population, this.fitness);
      var gen2 = this.improved_selection(this.population, this.fitness);
      var aux = this.crossover(gen1, gen2);
      newPopulation.push(this.mutation(aux, 0.01));
    }
    this.population = [];
    this.fitness = [];
    for(let item of newPopulation){
        this.population.push(item);
        this.fitness.push(0);
    }

  }

  this.improved_selection = function(list, probability){
    var id = 0;
    var r = random(1);
    while(r > 0 && id < probability.length){
      r-= probability[id];
      id++;
    }

    if(id > 0) id--;
    return list[id].slice();
  }

  this.mutation = function(order, mutationRate){
    for(var i = 0; i < order.length; ++i){
      if(random(0,1) < mutationRate){
        var id1 = floor(random(order.length));
        var id2 = floor(random(order.length));
        [order[id1], order[id2]] = [order[id2], order[id1]];
      }
    }
    return order;
  }

  this.crossover = function(a, b){
    var start = floor(random(a.length));
    var len = floor(random(a.length));
    var c = [];
    var st = new Set();
    for(var i = start; i < start + len; ++i){
      st.add(a[i%a.length]);
      c.push(a[i%a.length]);
    }

    for(let item of b){
      if(st.has(item)) continue;
      st.add(item);
      c.push(item);
    }

    return c;
  }

  this.calc_distance = function(aux){
    var d = 0;
    for(var i = 0; i < aux.length; ++i){
      var nw = aux[i];
      var nx = aux[(i + 1)%aux.length];
      d+=dist(this.cities[nw].x, this.cities[nw].y, this.cities[nx].x, this.cities[nx].y);
    }
    return d;
  }

  this.calculateFitness = function(){
    var sum = 0;
    var best_distance_nw = Infinity;
    for(var i = 0; i < this.population.length; ++i){
      var d = this.calc_distance(this.population[i])*10;
      if(d < this.best_distance){
        this.best_distance = Math.round(d*10)/10;
        this.best_path = this.population[i].slice();
      }
      if(d < best_distance_nw){
        best_distance_nw = d;
        this.current_best = this.population[i].slice();
      }
      this.fitness[i] = 1/(d + 1);
      sum+= this.fitness[i];
    }

    for(var i = 0; i < this.fitness.length; ++i)
      this.fitness[i]/= sum;

  }

  this.restart = function(){
    this.parents = Math.round(random(6, 20));
    this.population = [];
    this.fitness = [];
    this.current_best = [];
    this.iterations = 0;
    this.best_distance = Infinity;
    this.animation = 0;
    this.permutation = [];
    this.best_path = [];
  }

}
