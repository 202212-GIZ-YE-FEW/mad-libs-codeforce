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
    const rawStoryElement = rawStory.split(' ')
    //   
    const object = rawStoryElement.map((word) => {

        const onlyWord = word.replace(word.match(regex), "");

        let posType = word.match(regex);

        if (posType === null) {
            return { word: onlyWord };
        }
        //    match return  an array
        // console.log(posType);
        posType = posType[0];
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

    return object;
}
const edit = document.querySelector(".madLibsEdit");
const preview = document.querySelector(".madLibsPreview");

function show(processedStory) {
    let inputStory = ''
    let showStory = ''
    processedStory.forEach(element => {
        if (element.pos) {
            let input = `<input type="text" maxlength="20" placeholder="${element.pos}">`
            inputStory+= input;
            showStory += `<span class="previewElement">[${element.pos}]</span>`
        }
        else {
            inputStory += element.word+" "
            showStory += ` ${element.word} `
        }
        edit.innerHTML = inputStory
        preview.innerHTML = showStory

    });


}


// console.log(inputs);
function fillBlank() {
    const inputs = document.querySelectorAll("input");
    const blanks = document.querySelectorAll(".previewElement");

    inputs.forEach((input, i) => {
        input.addEventListener("input", (e) => {
            blanks[i].textContent = e.target.value;
        });
        input.addEventListener("keypress", (event) => {
            if (event.key === "Enter") {
                inputs[i+1].focus()
            }
        });
    });
}

const confirmBtn = document.getElementById('confirmBtn')
const cancelBtn = document.getElementById('cancelBtn')
const buttons = document.getElementsByTagName('button')
for (const button of buttons) {

    button.addEventListener("mousedown", function() {
        button.classList.add("clicked");
    });
    button.addEventListener("mouseup", function() {
        button.classList.remove("clicked");
    });
}
confirmBtn.addEventListener('click', function (e){
    const modal = document.getElementById('modal')
    const overlay = document.getElementById('overlay')
    modal.classList.add('showModal')
    overlay.classList.add('overlay')
    overlay.addEventListener('click', function (e){
        modal.classList.remove('showModal')
        overlay.classList.remove('overlay')
    })
})


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
    let madLibsEdit = document.getElementsByClassName("madLibsEdit")
});
