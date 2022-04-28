let canvas = document.querySelector('canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let c = canvas.getContext('2d');

// Rectangles
// c.fillStyle = 'rgba(255, 100, 0, 0.5)';
// c.fillRect(100, 100, 100, 100);
// c.fillStyle = 'rgba(0, 100, 0, 0.5)';
// c.fillRect(50, 500, 100, 100);
// c.fillStyle = 'rgba(0, 0, 200, 0.5)';
// c.fillRect(150, 300, 100, 100);
// console.log(canvas);

// Lines
// c.beginPath();
// c.moveTo(50, 300);
// c.lineTo(150, 100);
// c.lineTo(250, 300);
// c.strokeStyle = '#fa34a3';
// c.lineWidth = 2;
// c.stroke();

// Arcs
// c.beginPath();
// c.arc(300, 300, 30, 0, Math.PI*2, false);
// c.strokeStyle = 'blue';
// c.stroke();

// for (let i = 0; i < 3; i++) {
//     let x = Math.random() * window.innerWidth;              // Math.random() returns random value between 0 and 1
//     let y = Math.random() * window.innerHeight;

// c.beginPath();
// c.arc(x, y, 30, 0, Math.PI*2, false);
// c.strokeStyle = 'blue';
// c.stroke();
// }

let mouse = {
    x: undefined,
    y: undefined
}

let maxRadius = 50;
//let minRadius = 2;

let colourArray = [
    '#0B2B40',
    '#30A5BF',
    '#185359',
    '#F2BE22',
    '#A6874E'
];

window.addEventListener('mousemove', function(event) {

    mouse.x = event.x;
    mouse.y = event.y;
});

window.addEventListener('resize', function() {

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    init();
});

function Circle(x, y, dx, dy, radius) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.minRadius = radius;
    this.colour = colourArray[Math.floor(Math.random() * colourArray.length)];

    this.draw = function() {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI*2, false);

        c.fillStyle = this.colour;

        c.fill();
    }

    this.update = function() {
        if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
            this.dx = -this.dx;
        }
        
        if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
            this.dy = -this.dy;
        }
        
        this.x += this.dx;
        this.y += this.dy;

        // Interactivity

        if (mouse.x - this.x < 50 && mouse.x - this.x > -50 && mouse.y - this.y < 50 && mouse.y - this.y > -50) {
            if (this.radius < maxRadius){

                this.radius += 1;
            }
        } else if (this.radius > this.minRadius) {
            this.radius -= 1;
        }

        this.draw();
    }
}

let circleArray = [];

function init () {

    circleArray = [];

    for (let i = 0; i < 1000; i++){

        let radius = Math.random() * 3 + 1;
        let x = Math.random() * (innerWidth - radius * 2) + radius;
        let y = Math.random() * (innerHeight - radius * 2) + radius;
        let dx = (Math.random() * -0.5) * 2;
        let dy = (Math.random() * -0.5) * 2;

        circleArray.push(new Circle(x, y, dx, dy, radius));
    }
}


function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, innerWidth, innerHeight);

    for (let i = 0; i < circleArray.length; i++) {

circleArray[i].update();
    }

}

init();

animate();