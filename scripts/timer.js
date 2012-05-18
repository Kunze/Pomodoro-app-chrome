var timer = 
{
	seconds:Pomodoro.getSeconds(),
	secondsCount:function(){},
	start:function()
	{
		if (timer.isRunning)
			return;
			
		timer.isRunning = true;
		
		timer.seconds = Pomodoro.getSeconds();

		timer.playStartSound();

		popup_getCurrentTime();
		
		timer.secondsCount = setInterval(function()
		{	
			timer.seconds--;
			popup_getCurrentTime();
			
			if (timer.seconds === 0)
				timer.end();
		}
		,1000);
	},
	stop:function()
	{
		clearInterval(timer.secondsCount);
		timer.isRunning = false;
		popup_stop();
	},
	end:function()
	{
		timer.stop();
		
		timer.playEndSound();
	},
	getCurrentTime:function()
	{
		var minutes = parseInt(timer.seconds / 60);
		var seconds = timer.seconds % 60;
		if (seconds === 60) seconds = 00;
		else if (String(seconds).length === 1) seconds = "0" + seconds;
		return minutes + ":" + seconds;
	},
	playEndSound:function()
	{
		var audio = id("deskbell");
		
		var repeat = Pomodoro.getTimesToRepeatBeep();

		audio.addEventListener("ended",function()
		{
			if (repeat)
			{
				this.play();
				repeat--;
			}
		});
		
		audio.play();
		repeat--;
	},
	playStartSound:function()
	{
		id("crank").play();
	},
	isRunning:false,
	popup_getCurrentTime:function(){},
	popup_stop:function(){}
}