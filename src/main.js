


// create engine
var engine = Engine.create(),
    world = engine.world;

var elem = document.body

// create renderer
var render = Render.create({
    element: elem,
    engine: engine,
    options: {
        width: 800,
        height: 600,
        showAngleIndicator: true,
        showCollisions: true
    }
});

Render.run(render);



// create runner
var runner = Runner.create();
Runner.run(runner, engine);


var cameraX = 0

resetUni()


// fit the render viewport to the scene
Render.lookAt(render, {
    min: { x: 0, y: 0 },
    max: { x: 800, y: 600 }
});

var lastTime = null

// an example of using beforeUpdate event on an engine
Events.on(engine, 'beforeUpdate', function(event) {
    
    if( lastTime == null ){
        lastTime = (+new Date())
        return
    }
    
    
    var thisTime = (+new Date())
    var dt = thisTime - lastTime
    
    update(dt)
    
    lastTime = thisTime;
});

// Run the engine and renderer
Matter.Engine.run(engine);
Matter.Render.run(render);