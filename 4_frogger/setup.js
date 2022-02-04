const canvas = document.getElementById('canvas1');
const ctx1 = canvas1.getContext('2d');
canvas.height = 600;
canvas.width = 600;

const canvas2 = document.getElementById('canvas2');
const ctx2 = canvas2.getContext('2d');
canvas2.height = 600;
canvas2.width = 600;

const canvas3 = document.getElementById('canvas3');
const ctx3 = canvas3.getContext('2d');
canvas3.height = 600;
canvas3.width = 600;

const canvas4 = document.getElementById('canvas4');
const ctx4 = canvas4.getContext('2d');
canvas4.height = 600;
canvas4.width = 600;

const canvas5 = document.getElementById('canvas5');
const ctx5 = canvas5.getContext('2d');
canvas5.height = 600;
canvas5.width = 600;

// global variables
const grid = 80;
let keys = [];
let score = 0;
let collisionsCount = 0;
let frame = 0;
let gameSpeed = 1;
let frogSafe = false;

const particlesArray = [];
const maxParticles = 300;
const ripplesArray = [];
const carsArray = [];
const logsArray = [];

// images
const background_lvl2 = new Image();
background_lvl2.src = 'background_lvl2.png';

const grass = new Image(); 
grass.src = 'grass.png';

const froggerSprite = new Image();
froggerSprite.src = 'frogSpriteSheet.png';

const collisions = new Image();
collisions.src = 'collisions.png';

const cars = new Image();
cars.src = 'cars.png'

const log = new Image();
log.src = 'log.png'

const turtles = new Image();
turtles.src = 'turtles.png'