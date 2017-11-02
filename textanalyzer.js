//Defining global variables
var string = "";

//Function for determining the statistics of the inputted text
function statistics() {
  //Define Local Variables
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
  //Write the sentence in the bottom paragraph
  document.getElementById("paragraph").innerHTML = string;
}

//Function for highlighting spaces
function highlightSpaces() {
  //Define local variables
  //Hstring to modify the string global variable
  var hString = string;
  //Highlight defines which color we highlight
  var highlight = 1;
  //loop through the the string
  for (i = 0; i < hString.length; i++) {
    //if its a space then highlight
    if (hString[i] === " ") {
      //if highlight = 1 then highlight the color
      if (highlight === 1) {
        //Rewrites the string with a highlight
        hString = hString.substring(0,i) + "<span class='highlight1'>" + hString.substring(i,i + 1) + "</span>" + hString.substring(i + 1);
        //Add to variable i the amount of characters added to the string to avoid restringing the html marks
        i += 32;
        //Alternate to the next color
        highlight = highlight * -1;
      }
      //Same as the previous if, except with a different highlight color
      else {
        hString = hString.substring(0,i) + "<span class='highlight2'>" + hString.substring(i,i + 1) + "</span>" + hString.substring(i + 1);
        i += 32;
        highlight = highlight * -1;
      }
    }
  }
  //Write the modified string to the paragraph element
  document.getElementById("paragraph").innerHTML = hString;
}
//Function for highlighting words
function highlightWords() {
  //Define local variables
  //Hstring to modify the string global variable
  var hString = string;
  //Highlight defines which color we highlight
  var highlight = 1;
  //Repeat is true, to be used to define when to change the color
  var repeat = true;
  //For loop through the hstring variable
  for (i = 0; i < hString.length; i++) {
    //Check to see if a letter matches
    if (hString[i].match(/[a-z]/i)) {
      if (highlight === 1) {
        //highlight the matched peice
        hString = hString.substring(0,i) + "<span class='highlight1'>" + hString.substring(i,i + 1) + "</span>" + hString.substring(i + 1);
        //Add to variable i the amount of characters added to the string to avoid restringing the html marks
        i += 32;
        //Define repeat as true so that the highlight will be the same for the entire word
        repeat = true;
      }
      //Same as the above except with a different highlight color
      else {
        hString = hString.substring(0,i) + "<span class='highlight2'>" + hString.substring(i,i + 1) + "</span>" + hString.substring(i + 1);
        i += 32;
        repeat = true;
      }
    }
    //If not a letter but the previous was a letter change the highlight and repeat values
    else if (repeat) {
      highlight = highlight * -1;
      repeat = false;
    }
  }
  document.getElementById("paragraph").innerHTML = hString;
}
//Function for highlighting sentences
function highlightSentences() {
  //Define local variables
  //Hstring to modify the string global variable
  var hString = string;
  //Highlight defines which color we highlight
  var highlight = 1;
  //Repeat is true, to be used to define when to change the color
  var repeat = true;
  var sentenceStarted = false;
  //For loop through the hstring variable
  for (i = 0; i < hString.length; i++) {
    //Check to see if the hstring peice is not a punctuation
    if (hString[i] !== "!" && hString[i] !== "?" && hString[i] !== ".") {
      //Check to see if a letter is written
      if (hString[i].match(/[a-z]/i)) {
        //If a letter is written, if so then start highlighting the sentence
        sentenceStarted = true;
      }
      //Check to see what color to highlight and sentence has been started
      if (highlight === 1 && sentenceStarted) {
        //Rewrite the hstring to highlight the peice
        hString = hString.substring(0,i) + "<span class='highlight1'>" + hString.substring(i,i + 1) + "</span>" + hString.substring(i + 1);
        //Add to variable i the amount of characters added to the string to avoid restringing the html marks
        i += 32;
        //Define repeat as true so that the highlight will be the same for the entire word
        repeat = true;
      }
      //Same as the above with a different highlight color
      else if (sentenceStarted) {
        hString = hString.substring(0,i) + "<span class='highlight2'>" + hString.substring(i,i + 1) + "</span>" + hString.substring(i + 1);
        i += 32;
        repeat = true;
      }
    }
    //If it is a punctuation and a sentence was started
    else if (repeat && sentenceStarted) {
      //Highlight the punctuation
      if (highlight === 1) {
        //Rewrite the hstring to highlight the peice
        hString = hString.substring(0,i) + "<span class='highlight1'>" + hString.substring(i,i + 1) + "</span>" + hString.substring(i + 1);
        //Add to variable i the amount of characters added to the string to avoid restringing the html marks
        i += 32;
      }
      //Same as the above with a different highlight color
      else {
        hString = hString.substring(0,i) + "<span class='highlight2'>" + hString.substring(i,i + 1) + "</span>" + hString.substring(i + 1);
        i += 32;
      }
      //Change the highlight color
      highlight = highlight * -1;
      //Change the repeat so a new sentence is started
      repeat = false;
      //Change sentenceStarted so a new sentence is started
      sentenceStarted = false;
    }
  }
  //Write the modified string to the paragraph element
  document.getElementById("paragraph").innerHTML = hString;
}
//Function for highlighting punctuation
function highlightPunctuation() {
  //Define local variables
  //Hstring to modify the string global variable
  var hString = string;
  //Highlight defines which color we highlight
  var highlight = 1;
  //For loop through the hstring variable
  for (i = 0; i < hString.length; i++) {
    //Check to see if a punctuation was written
    if (hString[i].match(/[.|!|?]/)) {
      //if highlight = 1 then highlight the color
      if (highlight === 1) {
        //Rewrites the string with a highlight
        hString = hString.substring(0,i) + "<span class='highlight1'>" + hString.substring(i,i + 1) + "</span>" + hString.substring(i + 1);
        //Add to variable i the amount of characters added to the string to avoid restringing the html marks
        i += 32;
        //Alternate to the next color
        highlight = highlight * -1;
      }
      //Same as the previous if, except with a different highlight color
      else {
        hString = hString.substring(0,i) + "<span class='highlight2'>" + hString.substring(i,i + 1) + "</span>" + hString.substring(i + 1);
        i += 32;
        highlight = highlight * -1;
      }
    }
  }
  //Write the modified string to the paragraph element
  document.getElementById("paragraph").innerHTML = hString;
}
//The remove highlight function
function noHighlight() {
  //Write the original string to the paragraph element
  document.getElementById("paragraph").innerHTML = string;
}
