var Pomodoro = {
	getSeconds:function(){
		return this.isPomodoroNull() ? 1500 : localStorage.getItem("pomodoro") * 60;
	},
	getMinutes:function(){
		return this.isPomodoroNull() ? 25 : localStorage.getItem("pomodoro");
	},
	setMinutes:function(value){
		localStorage.setItem("pomodoro",value);
	},
	getTimesToRepeatBeep:function(){
		return localStorage.getItem("timesToRepeatBeep") ? localStorage.getItem("timesToRepeatBeep") : 1;
	},
	setTimesToRepeatBeep:function(value){
		localStorage.getItem("timesToRepeatBeep",value);
	},
	isPomodoroNull:function(){
		return localStorage.getItem("pomodoro") === null;
	}
}