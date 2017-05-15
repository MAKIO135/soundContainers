function mousePressed(){
    if( overZone() ){
        if( mouseButton == LEFT ){
            zones[ overZoneId ].addAgent( mouseX, mouseY );
        }
        else if( mouseButton == RIGHT ){
            zones[ overZoneId ].removeAgent();
        }
        else if( mouseButton == CENTER ){
            zones.splice( overZoneId, 1 );
        }
    }
    else{
        newZone.drawing = true;
        newZone.startx = mouseX;
        newZone.starty = mouseY;
        newZone.x = mouseX;
        newZone.y = mouseY;
        newZone.w = 0;
        newZone.h = 0;
    }
}

function mouseDragged(){
    if( newZone.drawing ){
        if( mouseX < newZone.startx ) newZone.x = mouseX;
        if( mouseY < newZone.starty ) newZone.y = mouseY;
        newZone.w = abs( mouseX - newZone.startx );
        newZone.h = abs( mouseY - newZone.starty );
    }
}

function mouseMoved(){
    zones.forEach( d => d.mouseIsOver() );
}

function mouseReleased(){
    if( newZone.drawing ){
        if( newZone.w > 0 && newZone.h > 0 ) zones.push( new Zone( newZone.x, newZone.y, newZone.w, newZone.h ) );
        newZone.drawing = false;
    }
}

function windowResized(){
    resizeCanvas( windowWidth, windowHeight );
}
