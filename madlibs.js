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

    const regex = /\[[navo]\]/;
    const storyOjb = {}
    for (const rawStoryElement of rawStory.split(' ')) {
        if (regex.test(rawStoryElement)) {
            const index1 = rawStoryElement.indexOf('[')
            const index2 = rawStoryElement.indexOf(']')
            let pos = rawStoryElement;
            pos = pos.slice(index1+1, index2);
            // console.log(pos)
            // console.log(rawStoryElement)

            if (rawStoryElement.endsWith(",")) {
                // storyOjb.push({word: rawStoryElement, pos: 'o'})
                // storyOjb.push({word: ','})
                Object.assign(storyOjb, {word: rawStoryElement, pos: pos})
                Object.assign(storyOjb, {word: ','})

                console.log(storyOjb)
            }
            else{

            }
        } else {
            // console.log(rawStoryElement)
        }

    }
    console.log(storyOjb)
}

/**
 * All your other JavaScript code goes here, inside the function. Don't worry about
 * the `then` and `async` syntax for now.
 *
 * You'll want to use the results of parseStory() to display the story on the page.
 */
getRawStory().then(parseStory).then((processedStory) => {
    // console.log(processedStory);
    let madLibsEdit = document.getElementsByClassName("madLibsEdit")
});
