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

(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

ga('create', 'UA-29705498-1', 'auto');
ga('send', 'pageview');