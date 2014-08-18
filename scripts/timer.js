(function(window) {
	"use strict";
	
	function Timer()
	{
		this.deskbell = new Audio("sounds/deskbell.wav");
		this.crank = new Audio("sounds/crank.wav");
		this.isRunning = false;
		this.secondsIntervalCounter = function() { };
		this.onStart = function() { };
		this.onSecondChange = function() { };
		this.onEnd = function() { };
		this.onStop = function() { };
	}

	Timer.prototype.start = function(seconds)
	{
		if (timer.isRunning) {
			return;
		}
		
		if (!(this.seconds = +seconds)) {
			console.error("seconds");
			
			return;
		}
		
		this.isRunning = true;
		this.crank.play();
		
		var self = this;
		this.secondsIntervalCounter = setInterval(function() {
			if (!(--self.seconds))
			{
				end.call(self);
			}
			
			self.onSecondChange();
		}, 1000);
		this.onStart();
	}

	Timer.prototype.stop = function()
	{
		clearInterval(this.secondsIntervalCounter);
		
		this.isRunning = false;
		this.onStop();
	}
	
	Timer.prototype.getCurrentTime = function()
	{
		var minutes = parseInt(this.seconds / 60);
		var seconds = this.seconds % 60;
		
		if (seconds === 60) {
			seconds = "00";
		}
		else if (seconds.toString().length === 1) {
			seconds = "0" + seconds;
		}
		
		console.log('current time: ' + minutes + ":" + seconds);
		
		return minutes + ":" + seconds;
	}

	function end()
	{
		this.onEnd();
		this.stop();
		this.deskbell.play();
	}
	
	window.Timer = Timer;
}(window));