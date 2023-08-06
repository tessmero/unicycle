
var uni = null

// unicycle
function resetUni(){
    if( uni != null ){
        Composite.remove(world,uni)
    }
    var desiredX = (render.bounds.min.x+render.bounds.max.x)/2
    uni = buildUnicycle(desiredX, .9*render.bounds.max.y-300, 20, 250, 50)
    Composite.add(world, uni);


    iTerm = 0
    lastpitch = 0
}

function buildUnicycle(xx, yy, width, height, wheelSize) {

    var group = Body.nextGroup(true),
        wheelBase = 20,
        wheelYOffset = height/2;

    var car = Composite.create({ label: 'unicycle' }),
        body = Bodies.rectangle(xx-1, yy, width, height, { 
            collisionFilter: {
                group: group
            },
            //chamfer: {
            //    radius: height * 0.5
            //},
            mass:10
        });

    var wheelA = Bodies.circle(xx, yy + wheelYOffset, wheelSize, { 
        collisionFilter: {
            group: group
        },
        friction: 1,
        mass:1
    });
                
    var axelA = Constraint.create({
        bodyB: body,
        pointB: { x: 0, y: wheelYOffset },
        bodyA: wheelA,
        stiffness: 1,
        angularStiffness: 0,
        length: 0
    });
    
    Composite.addBody(car, body);
    Composite.addBody(car, wheelA);
    Composite.addConstraint(car, axelA);

    //poopy
    car.body = body
    car.wheel = wheelA

    return car;
};