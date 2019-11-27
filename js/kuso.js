class Vehicle {
  constructor(x, y) {
    const kusoColor = [
      color(208, 59, 89),
      color(237, 185, 24),
      color(60, 103, 84),
      color(0, 255, 255),
      color(71, 83, 167),
      color(167, 87, 168),
      color(232, 134, 143),
      color(25, 24, 23),
      color(246, 244, 246),
      color(115, 66, 41)
    ]

    this.acceleration = createVector(0, 0)
    this.velocity = createVector(0, -2)
    this.position = createVector(x, y)
    this.maxspeed = random(2, 6)
    this.maxforce = random(0.05, 0.12)
    this.color = kusoColor[floor(random(kusoColor.length))]

    this.scale = random(0.5, 1)

    // this.kusoTop = 18 * this.scale
    this.kusoTop = {
      len: 18 * this.scale,
      theta: random(0, 2 * PI),
      speed: (PI * random(1, 2)) / 100,
      topMoveMax: random(3, 6) * this.scale
    }
    this.kusoMdl = {
      w: 30 * this.scale,
      h: 12 * this.scale,
      rad: 5
    }
    this.kusoBtm = {
      w: 45 * this.scale,
      h: 13 * this.scale,
      rad: 30
    }
  }

  update() {
    this.kusoTop.theta += this.kusoTop.speed
    this.velocity.add(this.acceleration)
    this.velocity.limit(this.maxspeed)
    this.position.add(this.velocity)
    this.acceleration.mult(0)
  }

  applyForce(force) {
    this.acceleration.add(force)
  }

  arrive(target) {
    let desired = p5.Vector.sub(target, this.position)

    let d = desired.mag()
    if (d < 120) {
      let m = map(d, 0, 100, 0, this.maxspeed)
      desired.setMag(m)
    } else {
      desired.setMag(this.maxspeed)
    }

    let steer = p5.Vector.sub(desired, this.velocity)
    steer.limit(this.maxforce)
    this.applyForce(steer)
  }

  display() {
    push()
    noStroke()
    translate(this.position.x, this.position.y)

    fill(this.color)
    //うんち下段
    push()
    translate(-this.kusoBtm.w * 0.5, this.kusoTop.len * 0.75 + this.kusoMdl.h)
    beginShape()
    rect(0, 0, this.kusoBtm.w, this.kusoBtm.h, this.kusoBtm.rad)
    endShape()
    pop()

    //うんち真ん中
    push()
    translate(-this.kusoMdl.w * 0.5, this.kusoTop.len * 0.8)
    beginShape()
    rect(0, 0, this.kusoMdl.w, this.kusoMdl.h, this.kusoMdl.rad)
    endShape()
    pop()

    //うんちトップ
    beginShape()
    const startPoint = createVector(0, this.kusoTop.len)
    const endPoint = createVector(
      this.kusoTop.topMoveMax * sin(this.kusoTop.theta),
      0
    )

    vertex(startPoint.x, startPoint.y)

    const btmVtx = createVector(0, this.kusoTop.len)
    bezierVertex(
      startPoint.x,
      startPoint.y,
      -this.kusoTop.len,
      this.kusoTop.len,
      endPoint.x,
      endPoint.y
    )
    bezierVertex(
      endPoint.x,
      endPoint.y,
      this.kusoTop.len,
      this.kusoTop.len,
      startPoint.x,
      startPoint.y
    )
    endShape()

    pop()
  }
}
