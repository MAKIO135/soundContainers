var newZone = {
    drawing: false,
    x: 0,
    y: 0,
    w: 0,
    h: 0
};
var zones = [];
var overZoneId;

function setup(){
    createCanvas( windowWidth, windowHeight );
}

function draw(){
    background( 0 );
    zones.forEach( ( z, i ) => {
        z.update();
        z.display();
    } );
    if( newZone.drawing ) displayNewZone();
}

function displayNewZone(){
    stroke( 255 );
    fill( 255, 100 );
    rect( newZone.x, newZone.y, newZone.w, newZone.h );
}

function overZone(){
    return zones.some( ( d, i ) => {
        overZoneId = i;
        return d.over;
    } );
}
