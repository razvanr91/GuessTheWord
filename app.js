let words = [
	"above",
	"cake",
	"party",
	"game",
	"garden",
	"peace",
	"coding",
	"important",
	"wellcode",
];

let wordObjects = [
	{
		word: "above",
		hint: "In a newspaper, the title of a story is usually a**** the story",
	},
	{
		word: "cake",
		hint: "A c*** is a type of (usually) sweet dessert which is baked.",
	},
	{
		word: "party",
		hint: "A p**** is a social gathering for celebration and recreation. Some are to celebrate a special day, person, or event.",
	},
	{
		word: "game",
		hint: "Can be a video or a board g***",
	},
	{
		word: "garden",
		hint: "A g***** is usually a piece of land that is used for growing flowers, trees, shrubs, and other plants.",
	},
	{
		word: "peace",
		hint: "P**** is a time without any fights or wars.",
	},
	{
		word: "coding",
		hint: "More formally known as programming",
	},
	{
		word: "important",
		hint: "major, critical, starts with the letter I",
	},
	{
		word: "wellcode",
		hint: "Programming mentorship program from Romania. Starts with W",
	},
];

console.log(wordObjects[0].word);

let getWordButton = document.getElementById("getWord");
let wordPlacement = document.getElementById("wordPlacement");
let buttonContainer = document.getElementById("buttonContainer");
let playerGuess = document.getElementById("playerGuess");
let numberOfChances = document.getElementById("numberOfChances");
let helperDiv = document.getElementById("helper");
let hintDiv = document.getElementById("hintDiv");

getWordButton.addEventListener("click", (e) => {
	playerGuess.disabled = false;
	playerGuess.placeholder = "Enter a letter";
	startGame();
});

function startGame() {
	if (buttonContainer.childElementCount > 1) {
		playerGuess.value = "";
		playerGuess.disabled = true;
		window.location.reload();
	} else {
		getWordButton.innerHTML = "Retry";
		let wordObject = generateWord();
		console.log(wordObject);
		let wordToGuess = wordObject.word;
		let hint = wordObject.hint;
		let hintAlert = generateAlert(hint);
        hintAlert.classList.add("alert", "alert-success");
        hintDiv.append(hintAlert);
		let wordLength = wordToGuess.length;
		for (let i = 0; i < wordLength; i++) {
			wordPlacement.appendChild(generateBadge(i));
		}

		let badges = wordPlacement.childNodes;

		let inputField = document.createElement("input");
		inputField.classList.add("form-control");
		buttonContainer.appendChild(generateButton());
		let checkLetterButton = document.getElementById("checkLetter");

		let chances = 3;
		let guesses = 0;
		let wordSize = wordToGuess.length;

		checkLetterButton.addEventListener("click", () => {
			let letter = playerGuess.value;
			let messageAlert = document.getElementById("messageAlert");

			if (messageAlert) {
				messageAlert.remove();
			}

			if (letter === "") {
				let alert = generateAlert("Please enter a letter.");
				alert.classList.add("alert", "alert-danger");
				helperDiv.prepend(alert);
			}

			if (wordToGuess.includes(letter)) {
				for (let i = 0; i < wordToGuess.length; i++) {
					if (wordToGuess[i] === letter) {
						let element = document.getElementById(i);
						element.innerHTML = letter;
						element.classList.add("bg-success", "text-white");
						guesses++;
					}
				}
			} else {
				chances--;
			}

			if (chances === 1) {
				numberOfChances.classList.replace("text-success", "text-warning");
			}

			if (chances === 0) {
				loseGame(badges, chances, checkLetterButton, wordToGuess);
			}

			if (guesses === wordSize) {
				let alertDiv = generateAlert("Congratulations! You guessed the word!");
				alertDiv.classList.add("alert", "alert-success");
				helperDiv.prepend(alertDiv);
				checkLetterButton.innerHTML = "You won!";
				checkLetterButton.disabled = true;
			}

			numberOfChances.innerHTML = chances;
			playerGuess.value = "";
		});
	}
}

function loseGame(badges, chances, checkLetterButton, wordToGuess) {
	numberOfChances.innerHTML = chances;
	numberOfChances.classList.replace("text-warning", "text-danger");
	checkLetterButton.disabled = true;
	checkLetterButton.innerHTML = "Better luck next time";
	checkLetterButton.classList.replace("btn-success", "btn-danger");
	badges.forEach((badge) => {
		if (badge.innerHTML === "_") {
			badge.innerHTML = wordToGuess[Number.parseInt(badge.id)];
			badge.classList.replace("bg-secondary", "bg-danger");
		}
	});
	let alertDiv = generateAlert("I'm sorry, you do not have any more tries...");
	alertDiv.classList.add("alert", "alert-danger", "pt-2");
	helperDiv.prepend(alertDiv);
}

function generateAlert(message) {
	let alertDiv = document.createElement("div");
	alertDiv.innerHTML = message;
	alertDiv.id = "messageAlert";
	return alertDiv;
}

function generateButton() {
	let button = document.createElement("button");
	button.classList.add("btn", "btn-success");
	button.id = "checkLetter";
	button.innerHTML = "Check letter";
	return button;
}

function generateBadge(id) {
	let badge = document.createElement("span");
	badge.innerHTML = "_";
	badge.classList.add("badge", "bg-secondary", "fs-2", "mx-2", "col");
	badge.id = id;
	return badge;
}

function generateWord() {
	return wordObjects[generateNumber()];
}

function generateNumber() {
	return Math.floor(Math.random() * words.length);
}
