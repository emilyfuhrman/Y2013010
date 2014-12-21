var canvas = document.getElementById('canvas');
var c = canvas.getContext('2d');
c.canvas.width 	= window.innerWidth;
c.canvas.height = window.innerHeight;
c.fillStyle = "rgb(25, 25, 30)";
c.fillRect(0, 0, window.innerWidth, window.innerHeight);

parseMe();

var lines;
var num;
var numb;
var stiff;
var mass;
var strt;
var rad;
var hgt;
var blob;
var yy;

function parseMe()
{
	$(document).ready(function() {
		$.ajax({
			type: "GET",
			url: "http://api.census.gov/data/2010/sf1?key=25491714036715057c0aa046f39a882a5a1de900&get=P0010001&for=place:*&in=state:36",
			dataType: "text",
			success: function(data){ processData(data) ;},
			fail: function(){ processData(); }
		});
	});

	function processData(censusData)
	{
		lines = censusData ? censusData.split(/\n/).length : 1175;
		calc(lines);
	}
}

function calc(linesNum)
{
	this.linesNum = linesNum;
	num  	= Math.ceil(window.innerWidth/4);
	numb 	= 35;
	stiff 	= 0.1;
	mass	= 1.8;
	rad		= 1;
	hgt		= Math.ceil(linesNum/3);
	strt	= -hgt/3;
	b		= new Array(num);
	xx		= 0;
	yy 		= 0;
	
	console.log(hgt);
	//console.log(linesNum/3);
	blobWave();
}
	
// mouseover
canvas.addEventListener('mousemove', function(e) {
	xx = e.pageX;
	yy = e.pageY;
}, 0);
	
// init blobwave
function blobWave()
{
	for(var i = 0; i < num; i++)
	{
		b[i] = new blob(i*(rad+3), strt, rad, hgt + (hgt/3), mass, stiff);
	}  
	globWave();
}
	
// draw blobWave
function globWave()
{
	setInterval(function()
	{
	//console.log(yy);
	c.fillStyle = "rgb(25, 25, 30)";
	c.fillRect(0, 0, window.innerWidth, window.innerHeight);
	for (var i = 0; i < num; i++)
	{
   		b[i].updateBlob(strt);
   		b[i].drawBlob(c);
   	}
	for (var i = 0; i < num; i++)
	{
   		if (xx > b[i].x - (8*rad) && xx < b[i].x + (8*rad)
       		&& yy > (4*hgt/5) && yy < (hgt+10))
   		{
       		//b[i].updateBlob(yy - (260 + (hgt/3)));
       		b[i].updateBlob(Math.sin(yy + (i*i)) - hgt/5);
       		b[i].drawBlob(c);
       		var q = i;
       		for (var h = q; h < (num - 1); h++)
       		{
       	  		b[h+1].updateBlob(b[h].tempy);
       			b[h+1].drawBlob(c);
       		}
       		for (var h = q; h > 0; h--)
       		{
       			b[h-1].updateBlob(b[h].tempy);
       			b[h-1].drawBlob(c);
       		}
   		}
   	}
	}, 100);
}