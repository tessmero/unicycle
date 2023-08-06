
var speed = 7e-2

function update(dt){

    cameraX += speed*dt
    
    if( (uni.body.position.x>(render.bounds.max.x+200)) || (uni.body.position.x<(cameraX-200)) || (uni.body.angle > pio2) || (uni.body.angle < -pio2) ){
        resetUni()
    }
    
    updateCamera()
    pidControl(dt)
    advanceObstacles(dt)
}



function updateCamera(){
  render.bounds.min.x = cameraX;
  render.bounds.max.x = cameraX + elem.clientWidth;
  render.bounds.min.y = 0;
  render.bounds.max.y = elem.clientHeight;
  render.options.width = elem.clientWidth;
  render.options.height = elem.clientHeight;
  render.canvas.width = elem.clientWidth;
  render.canvas.height = elem.clientHeight;
  Matter.Render.setPixelRatio(render, window.devicePixelRatio); // added this
}