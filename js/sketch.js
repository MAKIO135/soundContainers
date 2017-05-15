var newZone = {
    drawing: false,
    x: 0,
    y: 0,
    w: 0,
    h: 0
};
var zones = [];
var overZoneId;

var soundParams = {
    attackLevel: 1.0,
    releaseLevel: 0,
    attackTime: 0.00,
    decayTime: 0.2,
    susPercent: 0.2,
    releaseTime: 0.5,
    range01:[ 0, 1 ],

    oscillatorType: 'sine',

    agentSpeedX : 1,
    agentSpeedY : -1,
    rangem55:[ -5, 1 ]
};


function setup(){
    createCanvas( windowWidth, windowHeight );

    var ui = new ControlKit();
    ui.addPanel()
        .addGroup( { label: 'Agents' } )
        .addSlider( soundParams, 'agentSpeedX', 'rangem55' )
        .addSlider( soundParams, 'agentSpeedY', 'rangem55' )
        .addGroup( { label: 'WaveType' } )
        .addStringInput( soundParams, 'oscillatorType', { presets: [ 'sine', 'triangle', 'sawtooth', 'square' ] })
        .addGroup( { label: 'ADSR' } )
        .addSlider( soundParams, 'attackLevel', 'range01' )
        .addSlider( soundParams, 'releaseLevel', 'range01' )
        .addSlider( soundParams, 'attackTime', 'range01' )
        .addSlider( soundParams, 'decayTime', 'range01' )
        .addSlider( soundParams, 'susPercent', 'range01' )
        .addSlider( soundParams, 'releaseTime', 'range01' );
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
