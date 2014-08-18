(function(document){
	"use strict";
	
	var saveButton = document.getElementById("save"),
		minutes = document.getElementById("minutes"),
		status = document.getElementById("status"),
		clearStatusInterval;
		
	saveButton.addEventListener("click", function onSaveButtonClick() {
		var seconds = +minutes.value * 60;
		
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
		return (localStorage.getItem("seconds") / 60) || 25;
	}
}(document));