function blob(x, y, r, h, m, k)
{
	this.x		= x;
	this.y		= y;
	this.tempx 	= x;
	this.tempy	= y;
	this.restx 	= x;
	this.resty 	= y;
	this.r  	= r;
	this.h		= h;
	this.m		= m;	// mass
	this.k		= k;	// stiffness
	this.d		= 0.7;	// damping
	this.vy		= 0.0;
	this.accel	= 0;
	this.force	= 0;
}

blob.prototype.updateBlob = function(resty)
{
	this.resty = resty;
	this.force = -this.k * (this.tempy - this.resty);
	this.accel = this.force / this.m;
	this.vy = this.d * (this.vy + this.accel);
	this.tempy += this.vy;
}

blob.prototype.drawBlob = function(c)
{
	c.fillStyle = "rgb(235, 235, 240)";
	c.fillRect(this.tempx, this.tempy, this.r, this.h);
}
