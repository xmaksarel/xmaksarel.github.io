/*
    Name: Maxim Tsov
    Date: 14.03.20
    Homework 3 (SpeedReader)
 */
"use strict";

(function () {
    window.addEventListener("load", initialize);
    let timerId = null;
    let words;
    let index;

    /**
     *  Adding event listeners when the page loads
     */
    function initialize() {
        document.getElementById("buttonStart").
            addEventListener("click", start);
        document.getElementById("buttonStop").
            addEventListener("click", stop);
        document.getElementById("speed").
            addEventListener("change", speedChange);
        document.getElementsByName("size")[0].
            addEventListener("change", sizeChange);
        document.getElementsByName("size")[1].
            addEventListener("change", sizeChange);
        document.getElementsByName("size")[2].
            addEventListener("change", sizeChange);
    }

    /**
     *  Function for event listener when you press the start button.
     */
    function start() {
        words = document.getElementById("input").value.split(/[ \t\n]+/);
        index = 0;

        timerId = setInterval
            (printWords, document.getElementById("speed").value);

        document.getElementById("buttonStart").disabled = true;
        document.getElementById("buttonStop").disabled = false;
    }

    /**
    *  A function for a timer in which words from a global variable are displayed.
    *  Punctuation marks at the end of a word are also checked here.
    */
    function printWords() {
        if (index === words.length) {
            stop();
        }
        else {
            let punctuation = ",.!?;:";
            let doubleTime = false;
            for (let i = 0; i < punctuation.length; i++) {
                let word = words[index];
                let wordLength = word.length - 1;
                let lastChar = word[wordLength];
                if (punctuation[i] === lastChar) {
                    words[index] = word.replace(punctuation[i], "");
                    doubleTime = true;
                }
            }
            document.getElementById("output").innerHTML = words[index];
            if (!doubleTime) {
                index++;
            }
        }

    }

    /**
     *  Function for event listener when you press the stop button.
     */
    function stop() {
        clearInterval(timerId);

        document.getElementById("output").innerHTML = "";
        document.getElementById("buttonStart").disabled = false;
        document.getElementById("buttonStop").disabled = true;
    }

    /**
     *  Function for event listener when selecting speed.
     */
    function speedChange() {
        clearInterval(timerId);
        timerId = setInterval
            (printWords, document.getElementById("speed").value);
    }

    /**
     *  Function for event listener when resizing.
     */
    function sizeChange() {
        let output = document.getElementById("output");
        output.classList.remove("medium");
        output.classList.remove("big");
        output.classList.remove("bigger");

        output.classList.add(this.value);
    }
})();
