/*
 * Maxim Tsov
 * LAB 6: JS DOM AND EVENTS - ENCRYPT-IT!
 */

"use strict";

(function () {
  window.addEventListener("load", initialize);

  function initialize() {
    document.getElementById("buttonStart").addEventListener("click", encrypt);
    document.getElementById("buttonReset").addEventListener("click", reset);
    document.getElementById("checkboxAllCaps").addEventListener("change", allCaps);
  }

  function encrypt() {
    let input = document.getElementById("textArea").value.split("");
    let output = document.getElementById("output");
    if (document.getElementById("cipherType").value === "shiftCipher") {
      for (let i = 0; i < input.length; i++) {
        input[i] = String.fromCharCode(input[i].charCodeAt(0) + 1);
      }
      output.innerHTML = input.join("");
    } else {
      output.innerHTML = randomCipher(input.join(""));
    }

    if (document.getElementsByName("fontSize")[0].checked) {
      output.classList.add("font12pt");
      output.classList.remove("font24pt");
    } else {
      output.classList.add("font24pt");
      output.classList.remove("font12pt");
    }
  }

  function reset() {
    document.getElementById("output").innerHTML = "";
    document.getElementById("textArea").value = "";
  }

  function allCaps() {
    document.getElementById("output").classList.toggle("uppercase");
  }

  function randomCipher(text) {
    let alphabet = "abcdefghijklmnopqrstuvwxyz".split("");
    let cipher = [];
    // it's poor style to hardcode a magic number like 26
    let alphabetLength = alphabet.length;
    for (let i = 0; i < alphabetLength; i++) {
      let randomIndex = Math.floor(Math.random() * alphabet.length);

      cipher.push(alphabet.splice([randomIndex], 1));
    }
    let result = "";
    for (let i = 0; i < text.length; i++) {
      if (isLowerCaseLetter(text[i])) {
        let letterCode = text.charCodeAt(i) - "a".charCodeAt(0);
        result += cipher[letterCode];
      } else {
        result += text[i];
      }
    }
    result = result.replace(",", "");
    return result;
  }

  function isLowerCaseLetter(char) {
    return char >= 'a' && char <= 'z';
  }
})();
