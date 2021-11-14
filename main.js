let w = 4;
let h = 4;
let isPaused = false;
let counter = Math.PI;
function generateRandomArray() {
	let textArray = [];
	for (i = 0; i < h; i++) {
		textArray[i] = [];
		for (j = 0; j < w; j++) {
			textArray[i][j] = getRandomChar();
			// textArray[i][j] = "."
		}
	}
	return textArray;
}

function generateArrayOfChars(char) {
	let textArray = [];
	for (i = 0; i < h; i++) {
		textArray[i] = [];
		for (j = 0; j < w; j++) {
			textArray[i][j] = char;
		}
	}
	return textArray;
}

let textboxen = document.querySelectorAll(".textbox");

textboxen.forEach((elem) => {
	if (getRandomOf(10) > 2) elem.classList.toggle("bold");
	domino(getRandomChar(), "&nbsp", getRandomChar(), elem);

	// displayCanvas(textArray,elem )
});



document.addEventListener("click", () => {
    if (isPaused) {
        document.querySelector("#holdtext").textContent = "hold"
    }else{
        document.querySelector("#holdtext").textContent = "release"

    }
    
    
	isPaused = !isPaused;
});

function domino(char1, char2, char3, targetElem) {
	counter += (0.03);

	let textArray = generateArrayOfChars(char1);
	let x = 0;
	let y = 0;
	let interv = setInterval(() => {
		if (!isPaused) {
			if (x < h) {
				textArray[x][y] = char2;
			}
			displayCanvas(textArray, targetElem);
			if (x < h) {
				textArray[x][y] = char3;
			} else {
				displayCanvas(textArray, targetElem);
				clearInterval(interv);
				setTimeout(() => {
					domino(char3, char2, getRandomChar(), targetElem);
					// domino(char3, char2 , char1)
				}, getRandomOf(000)+1000);
				return;
			}

			if (y < w - 1) {
				y++;
			} else {
				y = 0;
				x++;
			}
		}
	}, 30);
}

function getRandomChar() {
	let char;
	let rSin = (Math.sin(counter) + 1) * 45;
    console.log(rSin);
	if (getRandomOf(100) > rSin) {
		char = "&nbsp";
	} else {
		char = String.fromCharCode(Math.random() * rSin + 32);
		if (char == "-") {
			char = getRandomChar();
		}
	}
	return char;
}
function getRandomOf(x) {
	return Math.floor(Math.random() * x);
}

function displayCanvas(array, textbox) {
	textbox.innerHTML = "";
	array.forEach((row) => {
		textbox.innerHTML += row.join("");
		// row.forEach((elem)=>{
		//     textbox.innerHTML += elem;
		// })
		textbox.innerHTML += "<br/>";
	});
}
