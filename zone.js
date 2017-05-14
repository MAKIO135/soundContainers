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
    fill( 255, this.over ? 255 : 100 );
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

    if( this.over ){
        this.west = false;
        this.east = false;
        this.north = false;
        this.south = false;

        if( mouseX < this.x + 20 ) this.west = true;
        else if( mouseX > this.x + this.w - 20 ) this.east = true;

        if( mouseY < this.y + 20 ) this.north = true;
        else if( mouseY > this.y + this.h - 20 ) this.south = true;

        document.body.style.cursor =
            this.north && this.west ? 'nw-resize' :
            this.north && this.east ? 'ne-resize':
            this.south && this.west ? 'sw-resize':
            this.south && this.east ? 'se-resize' :
            this.west ? 'w-resize' :
            this.east ? 'e-resize' :
            this.north ? 'n-resize' :
            this.south ? 's-resize':
            'copy'
    }
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
