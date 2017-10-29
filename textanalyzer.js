var string = "";

function statistics() {
  //Define Variables
  var numOfSentences = 0;
  var numOfSpaces = 0;
  var numOfWords = 0;
  var aveWordPerSentence = 0;
  var newWord = 0;
  var sentenceStarted = 0;
  var wordLength = 0;
  var sentenceLength = 0;
  //Grab string of text from text box
  string = document.getElementById("text").value;
  //Create a for loop to categorize peices of the string
  for (i = 0; i < string.length; i++) {
    //Check for Sentence ending punctuation and a sentence was started, if there then add 1 to the number of sentences
    if (string[i].match(/[.|!|?]/) && sentenceStarted === 1) {
      numOfSentences++;
      sentenceStarted = 0;
      //Check to see if a word was being written, if so then add 1 to the number of words.
      if (newWord === 1) {
        newWord = 0;
        numOfWords++;
      }
    }
    //Check for spaces, if there then add 1 to the number of spaces
    else if (string[i] === " ") {
      numOfSpaces++;
      //check if a word was being written, if so then add 1 to the number of words.
      if (newWord === 1) {
        newWord = 0;
        numOfWords++;
      }
    }
    //If it is a letter than say a new word is starting 
    else if (string[i].match(/[a-z]/i)) {
      newWord = 1;
      sentenceStarted = 1;
    }
    else {
      //check to see if a new word was being written, if add 1 to number of words
      if (newWord === 1) {
        newWord = 0;
        numOfWords++;
      }
    }
    //if no punctuation at the the last point that was not punctuated but a sentence was started, then count as a sentence
    if (string.length === i+1 && sentenceStarted === 1) {
      numOfSentences++;
    }
  }
  //add if new word was not ended add it to number of words
  numOfWords = numOfWords + newWord;
  //Calculate an average number of words per sentece
  aveWordPerSentence = Math.round(numOfWords / numOfSentences);
  //Write data to html page. Also checks if single or plural to be grammatically correct.
  if (numOfSentences === 1) {
    document.getElementById("sentences").innerHTML = "There is " + numOfSentences.toString() + " sentence in this text.";
  }
  else {
    document.getElementById("sentences").innerHTML = "There are " + numOfSentences.toString() + " sentences in this text.";
  }
  if (numOfSpaces === 1) {
    document.getElementById("spaces").innerHTML = "There is " + numOfSpaces.toString() + " space in this text.";
  }
  else {
  document.getElementById("spaces").innerHTML = "There are " + numOfSpaces.toString() + " spaces in this text.";
  }
  if (numOfSpaces === 1) {
    document.getElementById("words").innerHTML = "There is " + numOfWords.toString() + " word in this text";
  }
  else {
    document.getElementById("words").innerHTML = "There are " + numOfWords.toString() + " words in this text";
  }
  if (numOfSpaces === 1) {
    document.getElementById("ave").innerHTML = "There is an average of " + aveWordPerSentence.toString() +" word per sentence.";
  }
  else {
    document.getElementById("ave").innerHTML = "There is an average of " + aveWordPerSentence.toString() +" words per sentence.";
  }
  document.getElementById("paragraph").innerHTML = string;
}
function highlightSpaces() {
  var hString = string;
  var highlight = 1;
  for (i = 0; i < hString.length; i++) {
    if (hString[i] === " ") {
      if (highlight === 1) {
        hString = hString.substring(0,i) + "<span class='highlight1'>" + hString.substring(i,i + 1) + "</span>" + hString.substring(i + 1);
        i += 32;
      }
      else {
        hString = hString.substring(0,i) + "<span class='highlight2'>" + hString.substring(i,i + 1) + "</span>" + hString.substring(i + 1);
        i += 32;
      }
    }
  }
  document.getElementById("paragraph").innerHTML = hString;
}
function highlightWords() {
  var hString = string;
  var highlight = 1;
  for (i = 0; i < hString.length; i++) {
    if (hString[i].match(/[a-z]/i)) {
      if (highlight === 1) {
        hString = hString.substring(0,i) + "<span class='highlight1'>" + hString.substring(i,i + 1) + "</span>" + hString.substring(i + 1);
        i += 32;
      }
      else {
        hString = hString.substring(0,i) + "<span class='highlight2'>" + hString.substring(i,i + 1) + "</span>" + hString.substring(i + 1);
        i += 32;
      }
    }
  }
  document.getElementById("paragraph").innerHTML = hString;
}
function highlightSentences() {
  var hString = string;
  var highlight = 1;
  for (i = 0; i < hString.length; i++) {
    if (hString[i] !== "!" && hString[i] !== "?" && hString[i] !== ".") {
      if (highlight === 1) {
        hString = hString.substring(0,i) + "<span class='highlight1'>" + hString.substring(i,i + 1) + "</span>" + hString.substring(i + 1);
        i += 32;
      }
      else {
        hString = hString.substring(0,i) + "<span class='highlight2'>" + hString.substring(i,i + 1) + "</span>" + hString.substring(i + 1);
        i += 32;
      }
    }
    else {
      highlight = highlight * -1;
    }
  }
  document.getElementById("paragraph").innerHTML = hString;
}
function highlightPunctuation() {
  var hString = string;
  var highlight = 1;
  for (i = 0; i < hString.length; i++) {
    if (hString[i].match(/[.|!|?]/)) {
      if (highlight === 1) {
        hString = hString.substring(0,i) + "<span class='highlight1'>" + hString.substring(i,i + 1) + "</span>" + hString.substring(i + 1);
        i += 32;
      }
      else {
        hString = hString.substring(0,i) + "<span class='highlight2'>" + hString.substring(i,i + 1) + "</span>" + hString.substring(i + 1);
        i += 32;
      }
    }
  }
  document.getElementById("paragraph").innerHTML = hString;
}
function noHighlight() {
  document.getElementById("paragraph").innerHTML = string;
}
