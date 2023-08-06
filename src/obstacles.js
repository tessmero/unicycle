

var minCountdown = 1000
var maxCountdown = 3000
var countdown = maxCountdown
var maxObstacles = 10
var allObstacles = []

var groundWidth = 10000
var groundLim = .5*groundWidth
var groundY = .9*render.bounds.max.y
var groundHeight = 50

var ground1 = Bodies.rectangle(0, groundY, groundWidth, 50, 
    { isStatic: true, friction: 1 })
var ground2 = Bodies.rectangle(groundWidth, groundY, groundWidth, groundHeight, 
    { isStatic: true, friction: 1 })
Composite.add(world, [ground1,ground2]);

var allObstacles = []

function randomObstacle(){
    var x = render.bounds.max.x
    var y = render.bounds.max.y/2
    var obs = Bodies.polygon(x,y,Math.floor(randRange(3,6)),randRange(5,20),{friction:.8})
    Body.setVelocity( obs, {x: randRange(-20,0), y: 0});
    return obs
}

function advanceObstacles(dt){
    
    
    // shoot new obstacle at unicicle
    countdown -= dt
    if( (countdown < 0) && (allObstacles.length < maxObstacles) ){
        
        var x = render.bounds.max.x
        var y = randRange(render.bounds.min.y,render.bounds.max.y/2)
        var obs = randomObstacle()
        allObstacles.push(obs)
        Composite.add(world, obs);
        countdown = randRange(minCountdown,maxCountdown)
    }
    
    // remove old obstacles
    allObstacles = allObstacles.filter(obs => {
        if( obs.position.x < (cameraX-100) ){
            Composite.remove(world,obs)
            return false
        }
        return true
    })
    
    // keep rotating the two ground sections moving under the uni
    if( ground1.position.x < (cameraX-groundLim) ){
        Body.setPosition( ground1, Vector.create( ground2.position.x+groundWidth, groundY ))
    }
    if( ground2.position.x < (cameraX-groundLim) ){
        Body.setPosition( ground2, Vector.create( ground1.position.x+groundWidth, groundY ))
    }
}