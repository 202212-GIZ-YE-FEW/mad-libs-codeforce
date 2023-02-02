/**
 * Complete the implementation of parseStory.
 *
 * parseStory retrieves the story as a single string from story.txt
 * (I have written this part for you).
 *
 * In your code, you are required (please read this carefully):
 * - to return a list of objects
 * - each object should definitely have a field, `word`
 * - each object should maybe have a field, `pos` (part of speech)
 *
 * So for example, the return value of this for the example story.txt
 * will be an object that looks like so (note the comma! periods should
 * be handled in the same way).
 *
 * Input: "Louis[n] went[v] to the store[n], and it was fun[a]."
 * Output: [
 *  { word: "Louis", pos: "noun" },
 *  { word: "went", pos: "verb", },
 *  { word: "to", },
 *  { word: "the", },
 *  { word: "store", pos: "noun" }
 *  { word: "," }
 *  ....
 *
 * There are multiple ways to do this, but you may want to use regular expressions.
 * Please go through this lesson: https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/regular-expressions/
 */

function parseStory(rawStory) {
    // Your code here.
    // return {}; // This line is currently wrong :)

    const regex = /\[[anvo]\]/;
    // change srting to array

    // to split the story text based on the spaces between words and store them in a new array
    const rawStoryElement = rawStory.split(' ')

    // loops the array of words to check if they contain the required pattern specified in the regex
    return rawStoryElement.map((word) => {

        // to get only words without the regex validated text ex. Alan[a] => Alan
        const onlyWord = word.replace(word.match(regex), "");

        // to get the validated text (part of speech) by regex ex. [a]
        let posType = word.match(regex);

        // if posType is null it means that the word didn't contain a part of speech, therefore exit function with a word object
        if (posType === null) {
            return { word: onlyWord };
        }

        // to get the needed form of part of speech ([a]) which is going to be stored at the first position in the array
        posType = posType[0];

        // to specify the details of the 'word with pos' object based on pos value
        switch (posType) {
            case "[n]":
                return { word: onlyWord, pos: "noun" };
            case "[v]":
                return { word: onlyWord, pos: "verb" };
            case "[a]":
                return { word: onlyWord, pos: "adjective" };
            case "[o]":
                return { word: onlyWord, pos: "object" };
        }
    });

}

// pick up the items in which the story is going to be viewed as preview and edit
const edit = document.querySelector(".madLibsEdit");
const preview = document.querySelector(".madLibsPreview");

// replaces
function show(processedStory) {
    let inputStory = ''
    let showStory = ''
    // loop through the processedStory object
    processedStory.forEach(element => {
        // check for the existence of pos, if existed make an input for the input story section and a span for the preview story section
        if (element.pos) {
            let input = `<input type="text" maxlength="20" placeholder="${element.pos}">`
            inputStory += input;
            showStory += `<span class="previewElement">[${element.pos}]</span>`
        }
        // if the object doesn't contain a pos, then add the word contained in the object as it is
        else {
            inputStory += ` ${element.word} `
            showStory += ` ${element.word} `
        }
    });

    // inject the stories generated from the loop above into their tags
    edit.innerHTML = inputStory
    preview.innerHTML = showStory
}

// Live update: Whenever the user updates a blank in the edit view, it updates the preview any time a new character is typed
function fillBlank() {
    const inputs = document.querySelectorAll("input");
    const blanks = document.querySelectorAll(".previewElement");

    inputs.forEach((input, i) => {
        input.addEventListener("input", (e) => {
            blanks[i].textContent = e.target.value;
        });
        input.addEventListener("keypress", (event) => {
            if (event.key === "Enter") {
                inputs[i + 1].focus()
            }
        });
    });
}

// adding actions for the confirm and cancel buttons
const confirmBtn = document.getElementById('confirmBtn')
const cancelBtn = document.getElementById('cancelBtn')

// to show the preview story when the confirm button is clicked
confirmBtn.addEventListener('click', function (e) {
    const modal = document.getElementById('modal')
    const overlay = document.getElementById('overlay')
    modal.classList.add('showModal')
    overlay.classList.add('overlay')
    overlay.addEventListener('click', function (e) {
        modal.classList.remove('showModal')
        overlay.classList.remove('overlay')
    })
})

// clears all the inputs whenever cancel button in clicked
cancelBtn.addEventListener('click', function (e) {
    const inputs = document.querySelectorAll("input");
    inputs.forEach((input) => {
        input.value = ""
    })
})

// adds clicking animation whenever a button is clicked
const buttons = document.getElementsByTagName('button')
for (const button of buttons) {
    button.addEventListener("mousedown", function () {
        button.classList.add("clicked");
    });
    button.addEventListener("mouseup", function () {
        button.classList.remove("clicked");
    });
}


/**
 * All your other JavaScript code goes here, inside the function. Don't worry about
 * the `then` and `async` syntax for now.
 *
 * You'll want to use the results of parseStory() to display the story on the page.
 */
getRawStory().then(parseStory).then((processedStory) => {
    show(processedStory)
    // // console.log(processedStory);
    fillBlank()
});
