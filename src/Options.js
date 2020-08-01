function Option(txt, n_input, val = 0){

   this.create_design = function(){
    this.button.style('height', '30px');
    this.button.style('background-color', '#8d96a3');
    this.button.style('border-radius','20px');
    this.button.style('border','none');
    this.button.style('font-family','Montserrat');
    this.button.style('font-size','15px');
    this.button.style('margin-left', '10px');
    this.button.style('margin-bottom', '10px');
  }

  this.create_input = function(){
    this.inputs = new Array(this.n);
    for(var i = 0; i < this.n; ++i){
      this.inputs[i] = createInput();
      this.inputs[i].size(40);
      this.inputs[i].value(val);
    }

  }


  this.n = n_input;
  this.inputs = [];
  this.txt = txt;
  this.id = 0;

  this.create_input();
  this.button = createButton(this.txt[this.id]);
  this.create_design();


  this.change_text = function(){
    this.id = (this.id + 1)%this.txt.length;
    this.button.html(this.txt[this.id]);
  }

  this.init = function(){
    this.id = 0;
    this.button.html(this.txt[0]);
  }
}
