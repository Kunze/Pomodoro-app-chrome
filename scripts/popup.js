(function(){
	"use strict";
	
	var startButtonLegends = 
	{
		start: "Start",
		stop: "Stop",
		play: "Play"
	};
	
	chrome.runtime.getBackgroundPage(function(background){
		var currentTime = document.getElementById("current-time");
		var startButton = document.getElementById("startButton");
		var timer = background.timer;
		
		timer.onStart = function() {
			currentTime.innerText = timer.getCurrentTime();
			startButton.innerText = startButtonLegends.stop;
		}
		
		timer.onStop = function() {
			currentTime.innerText = "";
			startButton.innerText = startButtonLegends.play;
		};

		timer.onSecondChange = function() {
			currentTime.innerText = timer.getCurrentTime();
		};

		if (timer.isRunning)
		{
			currentTime.innerText = timer.getCurrentTime();
			
			startButton.innerText = startButtonLegends.stop;
		}
		else
		{
			startButton.innerText = startButtonLegends.start;
		}

		startButton.addEventListener("click", function(){
			if (timer.isRunning)
			{
				timer.stop();
			}
			else
			{
				var seconds = localStorage.getItem("seconds") || 25 * 60;
				
				timer.start(seconds);
			}
		});
	});
}());