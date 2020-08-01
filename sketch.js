var myMap;
const mappa = new Mappa('Leaflet');
const options = {
  lat: -8,
  lng: -55,
  zoom: 5,
  style: "https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png"
}

var algorithm;
var canvas;
var w;
var h;
var op_stop;
var op_restart;
var op_bt;
var op_dp;
var op_ga;
var slider;
var alg_choosen = 0;

function preload(){
  algorithm = new Backtracking();
}

function setup(){

  textFont('Montserrat', 25);
  w =  windowWidth/2;
  h =  windowHeight;

  canvas = createCanvas(windowWidth, windowHeight);
  myMap = mappa.tileMap( options);
  myMap.overlay(canvas);
  myMap.onChange(algorithm.show());

  op_bt = new Option(['Backtracking'], 0);
  op_bt.button.mousePressed(run_bt);

  op_ga = new Option(['Genetic Algorithm'], 0);
  op_ga.button.mousePressed(run_ga);

  op_dp = new Option(['Dynamic Programming'], 0);
  op_dp.button.mousePressed(run_dp);

  op_stop = new Option(['stop', 'play'], 0);
  op_stop.button.mousePressed(stop_play);

  op_restart = new Option(['restart'], 0);
  op_restart.button.mousePressed(restart);

  slider = createSlider(1 , 40 , 5);
}

function run_bt(){

  var aux = algorithm.cities.slice();
  algorithm = new Backtracking(aux);
  run();
}

function run_dp(){

  var aux = algorithm.cities.slice();
  algorithm = new HeldKarp(aux);
  run();
}

function run_ga(){

  var aux = algorithm.cities.slice();
  algorithm = new GeneticAlgorithm(aux);
  run();
}

function run(){
    op_stop.init();
    alg_choosen = 1;
    algorithm.run();
}

function stop_play(){
  op_stop.change_text();
  if(op_stop.id) algorithm.set_iterations(0);
  else algorithm.set_iterations(Infinity);
}

function draw() {
   clear();
   frameRate(slider.value());
   algorithm.show();
   noStroke();
   fill(color(0,0,0,200));
   rect(w, 0, width/2, height);

   fill(color(255, 24, 100, 100));
   rect(width/2, height/2 - 50, width/2, 70);


   fill(255);
   stroke(255);
   textSize(30);
   strokeWeight(1);
   var txt = "Travelling Salesman";
   text(txt, width*0.75 - textWidth(txt)/2, height/2 - 15);
   txt = "Problem";
   text(txt, width*0.75 - textWidth(txt)/2, height/2 + 10);

   noStroke();
   textSize(20);

   if(alg_choosen){

     txt = algorithm.name;
     text(txt, width*0.75 - textWidth(txt)/2, height/2 + 50);

     txt = "Best Distance: " + algorithm.best_distance;
     text(txt, width*0.75 - textWidth(txt)/2, height/2 + 75);

     txt = "# iterations: " + algorithm.iterations;
     text(txt, width*0.75 - textWidth(txt)/2, height/2 + 100);
  }
  else{
    txt = "Choose Algorithm";
    text(txt, width*0.75 - textWidth(txt)/2, height/2 + 50);

    textSize(15);
    txt = "Click on the map to add or delete points";
    text(txt, width*0.75 - textWidth(txt)/2, height/2 + 70);
  }

  textSize(15);
  txt = "@lafifii";
  text(txt, width - textWidth(txt) - 5, 15);

}

function mouseClicked(){
  if(mouseX > width/2 || mouseY <= 0) return;
  var x, y;
  [x,y] = [mouseX, mouseY];
  const px = myMap.pixelToLatLng(x, y);
  algorithm.new_city(px.lat, px.lng);

}

function set_iterations(){
    var a = op_iter.inputs[0].value();
    if(a == "" || isNaN(a)) return;
    a = parseInt(a);
    if( a <= 0) return;
    algorithm.set_iterations(a);
}

function restart(){
  alg_choosen = 0;
  iteration = 0;
  algorithm.limit_cities = Infinity;
  algorithm.restart();
}
