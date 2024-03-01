const controllerWindow = window.open("./controller.html");
let scoreElements;
let scores = [0, 0];

window.onload = function () {
	scoreElements = document.getElementById("scores-container").children;
}

window.addEventListener("message", (event) => {
	if (event.source !== controllerWindow) return;
	
	// process recieved data
	
	updateScoreboard();
});

function updateScoreboard() {
	for (let i = 0; i < scoreElements.length; i++) {
		scoreElements[i].innerText = scores[i];
	}
}
