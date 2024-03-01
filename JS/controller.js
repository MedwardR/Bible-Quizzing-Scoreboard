const scoreboardWindow = window.opener;
let scoreInputElements;
let errorInputElements;
let timeOutInputElements;
let scoreDifferenceElements;
let errorDifferenceElements;
let timeOutDifferenceElements;
let newScores = [0, 0];
let newErrors = [0, 0];
let newTimeOuts = [0, 0];
let oldScores = [0, 0];
let oldErrors = [0, 0];
let oldTimeOuts = [0, 0];
let changedScores = [false, false];
let changedErrors = [false, false];
let changedTimeOuts = [false, false];

window.onload = function () {
	scoreInputElements = document.getElementsByClassName("new-score");
	errorInputElements = document.getElementsByClassName("new-errors");
	timeoutInputElements = document.getElementsByClassName("new-timeouts");
	scoreDifferenceElements = document.getElementsByClassName("score-difference");
	errorDifferenceElements = document.getElementsByClassName("errors-difference");
	timeOutDifferenceElements = document.getElementsByClassName("timeouts-difference");
	
	updateInputElements();
}

function changeScoreBy(scoreIndex, amount)
{
	newScores[scoreIndex] += amount;
	changedScores[scoreIndex] = true;
	updateInputElements();
}

function changeErrorsBy(errorIndex, amount)
{
	newErrors[errorIndex] += amount;
	changedErrors[errorIndex] = true;
	updateInputElements();
}

function changeTimeOutsBy(timeOutIndex, amount)
{
	newTimeOuts[timeOutIndex] += amount;
	changedTimeOuts[timeOutIndex] = true;
	updateInputElements();
}

function resetValues() {
	newScores = [0, 0];
	newErrors = [0, 0];
	newTimeOuts = [0, 0];
	
	changedScores = [true, true];
	changedErrors = [true, true];
	changedTimeOuts = [true, true];
	
	updateInputElements();
}

function pushValues() {
	for (let i = 0; i < newScores.length; i++) if (newScores[i] != oldScores[i]) changedScores[i] = true;
	for (let j = 0; j < newErrors.length; j++) if (newErrors[j] != oldErrors[j]) changedErrors[j] = true;
	for (let k = 0; k < newTimeOuts.length; k++) if (newTimeOuts[k] != oldTimeOuts[k]) changedTimeOuts[k] = true;
	
	oldScores = Object.assign({}, newScores);
	oldErrors = Object.assign({}, newErrors);
	oldTimeOuts = Object.assign({}, newTimeOuts);
	
	updateInputElements();
}

function updateInputElements() {
	// Fade out changed values and update difference labels
	for (let i = 0; i < scoreInputElements.length; i++) {
		if (changedScores[i]) { // If the score was changed since last update
			// Fade out value
			scoreInputElements[i].style.color = "#00000000";
			// Fade out difference label
			if (newScores[i] - oldScores[i] === 0) scoreDifferenceElements[i].style.backgroundColor = "#ffffff00";
			scoreDifferenceElements[i].style.color = "#00000000";
		}
	}
	for (let i = 0; i < errorInputElements.length; i++) {
		if (changedErrors[i]) {
			errorInputElements[i].style.color = "#00000000";
			// Fade out difference label
			if (newErrors[i] - oldErrors[i] === 0) errorDifferenceElements[i].style.backgroundColor = "#ffffff00";
			errorDifferenceElements[i].style.color = "#00000000";
		}
	}
	for (let i = 0; i < timeoutInputElements.length; i++) {
		if (changedTimeOuts[i]) {
			timeoutInputElements[i].style.color = "#00000000";
			// Fade out difference label
			if (newTimeOuts[i] - oldTimeOuts[i] === 0) timeOutDifferenceElements[i].style.backgroundColor = "#ffffff00";
			timeOutDifferenceElements[i].style.color = "#00000000";
		}
	}
	// Reset "changed" values
	changedScores = [false, false];
	changedErrors = [false, false];
	changedTimeOuts = [false, false];
	
	// Wait for values to fade out
	setTimeout( function () {
		// change values and fade back in
		for (let i = 0; i < scoreInputElements.length; i++) {
			scoreInputElements[i].value = newScores[i];
			scoreInputElements[i].style.color = "#000000ff";
			// Update difference labels and fade in
			scoreDifferenceElements[i].innerText = addPlusIfPositive(newScores[i] - oldScores[i]);
			if (newScores[i] - oldScores[i] !== 0) scoreDifferenceElements[i].style.backgroundColor = "#ffffffff";
			if (newScores[i] - oldScores[i] > 0) scoreDifferenceElements[i].style.color = "#2ecc71ff";
			else if (newScores[i] - oldScores[i] < 0) scoreDifferenceElements[i].style.color = "#e74c3cff";
			else scoreDifferenceElements[i].style.color = "#00000000";
		}
		for (let i = 0; i < errorInputElements.length; i++) {
			errorInputElements[i].value = newErrors[i];
			errorInputElements[i].style.color = "#000000ff";
			// Update difference labels and fade in
			errorDifferenceElements[i].innerText = addPlusIfPositive(newErrors[i] - oldErrors[i]);
			if (newErrors[i] - oldErrors[i] !== 0) errorDifferenceElements[i].style.backgroundColor = "#ffffffff";
			if (newErrors[i] - oldErrors[i] > 0) errorDifferenceElements[i].style.color = "#2ecc71ff";
			else if (newErrors[i] - oldErrors[i] < 0) errorDifferenceElements[i].style.color = "#e74c3cff";
			else errorDifferenceElements[i].style.color = "#00000000";
		}
		for (let i = 0; i < timeoutInputElements.length; i++) {
			timeoutInputElements[i].value = newTimeOuts[i];
			timeoutInputElements[i].style.color = "#000000ff";
			// Update difference labels and fade in
			timeOutDifferenceElements[i].innerText = addPlusIfPositive(newTimeOuts[i] - oldTimeOuts[i]);
			if (newTimeOuts[i] - oldTimeOuts[i] !== 0) timeOutDifferenceElements[i].style.backgroundColor = "#ffffffff";
			if (newTimeOuts[i] - oldTimeOuts[i] > 0) timeOutDifferenceElements[i].style.color = "#2ecc71ff";
			else if (newTimeOuts[i] - oldTimeOuts[i] < 0) timeOutDifferenceElements[i].style.color = "#e74c3cff";
			else timeOutDifferenceElements[i].style.color = "#00000000";
		}
	}, 250); // Make sure this is the same as the <input> and '.input-container > label' transition duration in 'controller.css'
}

function addPlusIfPositive(value) {
	if (value > 0) {
		return "+" + value;
	}
	else {
		return value;
	}
}

function blankIfZero(value) {
	if (value === 0) {
		return "";
	}
	else {
		return value;
	}
}
