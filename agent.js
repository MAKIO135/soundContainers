function Agent( x, y ){
    this.x = x;
    this.y = y;
    this.vx = 1;
    this.vy = -1;
}

Agent.prototype.move = function(){
    this.x += this.vx;
    this.y += this.vy;
};

Agent.prototype.constrain = function( zone ){
    var beep = false;
    if( this.x < zone.x || this.x > zone.x + zone.w ){
        this.x = constrain( this.x, zone.x, zone.x + zone.w );
        this.vx *= -1;
        beep = true;
    }
    if( this.y < zone.y || this.y > zone.y + zone.h ){
        this.y = constrain( this.y, zone.y, zone.y + zone.h );
        this.vy *= -1;
        beep = true;
    }
    if( beep ) zone.env.play();
};

Agent.prototype.display = function(){
    ellipse( this.x, this.y, 10 );
};
