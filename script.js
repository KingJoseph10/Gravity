

const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const MouseConstraint = Matter.MouseConstraint;
const Mouse = Matter.Mouse;

const engine = Engine.create({
    gravity: {
      y: 1,
    },
  });
const render = Render.create({
    element: document.getElementById('canvas'),
    engine: engine,
    options: {
        width: window.innerWidth,
        height: window.innerHeight,
        wireframes: true
    }
});

const mouse = Mouse.create(render.canvas);
const mouseConstraint = MouseConstraint.create(engine, {
  mouse: mouse,
  constraint: {
    render: {
      visible: false,
    },
    stiffness: 0.2,
  },
});
World.add(engine.world, mouseConstraint);
render.mouse = mouse;


const env_facts = {
  'vacuum': 'The simulation is currently set to emulate a vacuum environment, with no gravity force applied to objects. Collisions between objects have a restitution value of 0, meaning no energy is retained after a collision and no heat or sound is produced. The density of each object in the simulation is set to 0.0001, making the objects less massive and experiencing minimal force due to gravity.',
  'fluid': 'The simulation is currently set to emulate a fluid environment, with no gravity force applied to objects and sleep mode disabled for continuous simulation. Collisions between objects have a restitution value of 0, meaning no energy is retained after a collision and no heat or sound is produced. The density of each object in the simulation is set to 1, making the objects more massive and experiencing a greater force due to buoyancy in the fluid. The buoyancy value is set to 0.5, causing the objects to float and move with the fluid.',
  'denseAtmosphere': 'The simulation is currently set to emulate a dense atmosphere, with a gravity force similar to Earth and sleep mode enabled for efficient resource management. Collisions between objects have a restitution value of 0.2, meaning 20% of the energy is retained after a collision while the remaining 80% is lost as heat and sound. The density of each object in the simulation is set to 0.01, making the objects more massive and experiencing a greater force due to gravity.',
  'earth': 'The simulation is currently set to emulate earth-like conditions, with a gravity value same as the Earth. The restitution value between collisions is set such that 20% of the energy is retained after a collision, while the remaining 80% is lost as heat and sound. The density of each object in the simulation, set to 0.001 so that the objects are less massive and therefore experience less force due to gravity.'
};

const force_facts = {
  gravity_on: 'Since the gravity is turned on, objects will experience a force of attraction towards the ground. This means that any objects that were in motion will be affected by this force and may change their trajectory, and any objects that were at rest may start moving towards each other.',
  gravity_off: 'When gravity is turned off, objects in the simulation will no longer experience any force of attraction towards each other or the ground. This means that any objects that were in motion will continue moving in a straight line, and any objects that were at rest will remain at rest. ',
  em_on: 'When electromagnetic force is turned on, objects that have an electric charge will experience a force of attraction or repulsion based on their charges. Objects with opposite charges will be attracted to each other, while objects with the same charge will repel each other. The strength of the electromagnetic force will depend on the charges of the objects and the distance between them. Observe slight changes in the movements as the objects repel and attract each other.',
  em_off: 'When electromagnetic force is turned off, objects will not experience any force due to their charges. This means that objects with the same charge will not repel each other, and objects with opposite charges will not attract each other. The density of the objects will not have any effect, as the electromagnetic force is the only force that is affected by charges.',  
};

function updateFact2(forceType) {
  const factElement = document.getElementById('Textbox');
  factElement.textContent = force_facts[forceType];
}

const shapes = [];
const ground = Bodies.rectangle(window.innerWidth / 2, window.innerHeight, window.innerWidth, 10, {
    isStatic: true,
    render: {
        fillStyle: 'hsl(0, 0%, 0%)'
    }
});

const leftWall = Bodies.rectangle(0, window.innerHeight / 2, 10, window.innerHeight, {
  isStatic: true,
  render: {
    fillStyle: 'hsl(0, 0%, 0%)'
  }
});

const rightWall = Bodies.rectangle(window.innerWidth, window.innerHeight / 2, 10, window.innerHeight, {
  isStatic: true,
  render: {
    fillStyle: 'hsl(0, 0%, 0%)'
  }
});

const topWall = Bodies.rectangle(window.innerWidth / 2, 0, window.innerWidth, 10, {
  isStatic: true,
  render: {
    fillStyle: 'hsl(0, 0%, 0%)'
  }
});
World.add(engine.world, [ground, leftWall, rightWall, topWall]);


let selectedBody = null;

function addShape(type) {
    let shape;
    switch (type) {
      case 'circle':
        shape = Bodies.circle(window.innerWidth / 2, window.innerHeight / 2, 50, {
          restitution: 0.2, // Earth-like elasticity
          density: 0.001, // Earth-like density
          render: {
            fillStyle: 'hsl(' + Math.floor(Math.random() * 360) + ', 50%, 50%)',
          },
          charge:0
        });
        break;
      case 'square':
        shape = Bodies.rectangle(window.innerWidth / 2, window.innerHeight / 2, 50, 50, {
          restitution: 0.2, // Earth-like elasticity
          density: 0.001, // Earth-like density
          render: {
            fillStyle: 'hsl(' + Math.floor(Math.random() * 360) + ', 50%, 50%)',
          },
          charge:0
        });
        break;
      default:
        shape = Bodies.polygon(window.innerWidth / 2, window.innerHeight / 2, 3, 50, {
          restitution: 0.2, // Earth-like elasticity
          density: 0.001, // Earth-like density
          render: {
            fillStyle: 'hsl(' + Math.floor(Math.random() * 360) + ', 50%, 50%)',
          },
          
          charge:0
        });
    }
    World.add(engine.world, shape);
    shapes.push(shape);

  }

function addShapes(numShapes, shapeType) {
  for (let i = 0; i < numShapes; i++) {
    addShape(shapeType);
  }
}

addShapes(10, 'circle');
addShapes(10, 'triangle');
addShapes(10, 'square');
addShapes(10, 'circle');
addShapes(10, 'triangle');
addShapes(10, 'square');
addShapes(10, 'circle');
addShapes(10, 'triangle');
addShapes(10, 'square');
addShapes(10, 'circle');
addShapes(10, 'triangle');
addShapes(10, 'square');
addShapes(10, 'circle');
addShapes(10, 'triangle');
addShapes(10, 'square');
addShapes(10, 'circle');
addShapes(10, 'triangle');


function removeShape() {
    if (shapes.length > 0) {
        const shape = shapes.pop();
        World.remove(engine.world, shape);
    }
}



const gravityToggleButton = document.getElementById('gravity-toggle');
gravityToggleButton.addEventListener('click', () => {
  engine.world.gravity.y = engine.world.gravity.y === 0 ? 1 : 0;
  gravityToggleButton.classList.toggle('checked');
  gravityToggleButton.textContent = gravityToggleButton.classList.contains('checked') ? 'Gravity Disabled' : 'Gravity Enabled';
  updateFact2(gravityToggleButton.classList.contains('checked') ? 'gravity_off' : 'gravity_on');
});



Engine.run(engine);
Render.run(render);