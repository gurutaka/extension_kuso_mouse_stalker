$("body").prepend('<div id="p5Canvas"></div>');

const w = $("#p5Canvas").width();
const h = $("#p5Canvas").height();

let fish = [];

function setup() {
  let canvas = createCanvas(w, h);
  canvas.parent("p5Canvas");
  background(0);
  fish.push(new Vehicle(random(width), random(height)));
}

function draw() {
  clear();

  let mouse = createVector(mouseX, mouseY);

  fish.forEach(el => {
    el.arrive(mouse);
    el.update();
    el.display();
  });
}

function mouseClicked() {
  fish.push(new Vehicle(mouseX, mouseY));
}
