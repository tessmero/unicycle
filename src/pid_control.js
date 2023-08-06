
var Kp = 4.5;                  // (P)roportional Tuning Parameter
var Ki = .01;                  // (I)ntegral Tuning Parameter        
var Kd = .001;                 // (D)erivative Tuning Parameter      

var iTerm = 0


var pidScale = 4e-4
var maxPid = 10
var maxAv = .2

var lastpitch = 0

    
function pidControl(timeChange){
    
    var desiredPitch = 0 // upright
    
    
    var desiredX = (render.bounds.min.x+render.bounds.max.x)/2
    var x = uni.body.position.x
    var adx = Math.abs(desiredX-x)
    
    
    // lean towards target

    var sdx = Math.sign(desiredX-x) 
    var adx = Math.abs(desiredX-x)
    
    desiredPitch = .08+Math.min( .2, 1e-4*adx )*sdx
    var pitch = uni.body.angle
    var error = pitch-desiredPitch

    // lean away from vel
    if( Math.sign(desiredPitch) == Math.sign(uni.wheel.velocity.x) ){
        desiredPitch *= .8
    }
    
    
    // Calculate our PID terms
    // PID values are multiplied/divided by 10 in order to allow the
    // constants to be numbers between 0-10.
    // -- -- -- -- -- -- -- -- -- -- -- -- -- --
    var pTerm = Kp * error * 10;
    iTerm += Ki * error * timeChange / 10;  
    var dTerm = Kd * (pitch - lastpitch) / timeChange * 100; 
  
  if (Ki == 0) iTerm = 0;
    lastpitch = pitch;


    // Obtain PID output value
    // -- -- -- -- -- -- -- -- -- -- -- -- -- --
    var PIDValue = pidScale * (pTerm + iTerm - dTerm)

    // Set a minimum speed (motors will not move below this - can help to reduce latency)
    //if(PIDValue > 0) PIDValue = PIDValue + 10;
    //if(PIDValue < 0) PIDValue = PIDValue - 10;

  // Limit PID value to maximum PWM values
    if (PIDValue > maxPid) PIDValue = maxPid;
    else if (PIDValue < -maxPid) PIDValue = -maxPid; 

    
    if( isNaN(PIDValue) ) return
    
    // apply torque
    //Body.setAngularVelocity(uni.body, uni.body.angularVelocity-.02*PIDValue);
    var av = uni.wheel.angularVelocity+PIDValue
    if( av > maxAv ){
        av = maxAv
    }
    if( av < -maxAv ){
        av = -maxAv
    }
    //Body.setAngularVelocity(uni.body, uni.body.angularVelocity-.01*PIDValue);
    Body.setAngularVelocity(uni.wheel, av);
}