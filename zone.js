function Zone( x, y, w, h ){
    this.x = w > 0 ? x : x - w;
    this.y = h > 0 ? y : y - h;
    this.w = w;
    this.h = h;
    this.agents = [];
    this.over = false;

    var attackLevel = 1.0;
    var releaseLevel = 0;
    var attackTime = 0.001
    var decayTime = 0.2;
    var susPercent = 0.2;
    var releaseTime = 0.5;
    
    this.env = new p5.Env();
    this.env.setADSR( attackTime, decayTime, susPercent, releaseTime );
    this.env.setRange( attackLevel, releaseLevel );

    var types = [
        'triangle',
        'sine',
        'sawtooth',
        'square'
    ]
    this.triOsc = new p5.Oscillator( random( types ) );
    this.triOsc.amp( this.env );
    this.triOsc.start();
    this.triOsc.freq( ~~random( 20, 16000 ) );
}

Zone.prototype.display = function(){
    stroke( 255 );
    fill( 255, this.mouseIsOver() ? 255 : 100 );
    rect( this.x, this.y, this.w, this.h );

    noStroke();
    fill( 0 );
    this.agents.forEach( a => a.display() );
};

Zone.prototype.mouseIsOver = function(){
    this.over = mouseX >= this.x &&
                mouseX <= this.x + this.w &&
                mouseY >= this.y &&
                mouseY <= this.y + this.h;
    return this.over;
};

Zone.prototype.addAgent = function( x, y ){
    this.agents.push( new Agent( x, y ) );
};

Zone.prototype.removeAgent = function(){
    this.agents.splice( this.agents.length - 1, 1 );
};
Zone.prototype.update = function(){
    this.agents.forEach( a => {
        a.move();
        a.constrain( this );
    } );
};
