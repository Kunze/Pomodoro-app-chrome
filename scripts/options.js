(function(document){
	"use strict";
	
	var saveButton = document.getElementById("save"),
		minutes = document.getElementById("minutes"),
		status = document.getElementById("status"),
		SECONDS_PER_MINUTE = 60;
		
	saveButton.addEventListener("click", function onSaveButtonClick() {
		var seconds = +minutes.value * SECONDS_PER_MINUTE;
		
		if(!seconds) {
			status.innerText = "Error";
		}
		else {
			localStorage.setItem("seconds", seconds);
			
			status.innerText = "Saved";
		}
	});
	
	minutes.value = getMinutes();
	
	function getMinutes() {
		return (localStorage.getItem("seconds") / SECONDS_PER_MINUTE);
	}
}(document));