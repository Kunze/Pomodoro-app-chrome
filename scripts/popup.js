(function(){
	"use strict";
	
	var startButtonLegends = 
	{
		start: "Start",
		stop: "Stop",
		play: "Play"
	}, DEFAULT_TIME = 25 * 60;
	
	chrome.runtime.getBackgroundPage(function(background){
		var currentTime = document.getElementById("current-time");
		var startButton = document.getElementById("startButton");
		
		var timer = background.timer.onStart(function() {
			currentTime.innerText = timer.getCurrentTime();
			startButton.innerText = startButtonLegends.stop;
		}).onStop(function() {
			currentTime.innerText = "";
			startButton.innerText = startButtonLegends.play;
		}).onSecondChange(function() {
			currentTime.innerText = timer.getCurrentTime();
		});

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
				var seconds = localStorage.getItem("seconds") || DEFAULT_TIME;
				
				timer.start(seconds);
			}
		});
	});
}());