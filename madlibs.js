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
        // console.log(word.match(regex))
        const onlyWord = word.replace(word.match(regex), "");

        let posType = word.match(regex);
        // console.log(posSign)
        if (posType === null) {
            return { word: onlyWord };
        }
        //    match return  an array
        // console.log(posType[0]);
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
    processedStory.forEach(element => {
        if (element.pos) {
            // console.log(element.pos) add input in edit div
            let inputElement = document.createElement("input");
            inputElement.type = "text";
            inputElement.maxLength = 20;
            inputElement.placeholder = `${element.pos}`;
            inputElement.classList.add("inputEle");
            edit.appendChild(inputElement);
            // add span in preview div
            let previewEle = document.createElement("span");
            previewEle.innerHTML = `(${element.pos}) `;
            previewEle.classList.add("previewEle");
            preview.appendChild(previewEle);
        }
        else {
            //  
            let textEditElement = document.createElement("span");
            textEditElement.innerText = `${element.word} `;
            let textPreviewElement = document.createElement("span");
            textPreviewElement.innerText = `${element.word} `;
            edit.appendChild(textEditElement);
            preview.appendChild(textPreviewElement);

        }
    });
}


// console.log(inputs);
function fillBlank() {
    const inputs = document.querySelectorAll(".inputEle");
    const blanks = document.querySelectorAll(".previewEle");
    // console.log("hi")
    inputs.forEach((ele, i) => {
        // console.log(`${ele} ${i}`)
        ele.addEventListener("input", (e) => {
            blanks[i].innerHTML = e.target.value;
        });
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
    let madLibsEdit = document.getElementsByClassName("madLibsEdit")
});
