let words = ["above", "cake", "party", "game", "garden", "peace", "coding", "important", "wellcode"];

let getWordButton = document.getElementById("getWord");
let wordPlacement = document.getElementById("wordPlacement");

getWordButton.addEventListener("click", () => {
    let wordToGuess = generateWord(words);
    let wordLength = wordToGuess.length;
    wordPlacement.innerHTML = "";
	for(let i = 0; i < wordLength; i++) {
        wordPlacement.appendChild(generateSpan(i));
    }
});

function generateSpan(id) {
    let span = document.createElement("span");
    span.classList.add("mx-2");
    span.id = id;
    span.innerHTML = "_ ";
    return span;
}

function generateWord(words) {
	return words[generateNumber()];
}

function generateNumber() {
	return Math.floor(Math.random() * words.length);
}
