/**
 *   Name: Maxim Tsov
 *   Date: 11.03.2020
 *   Lab 8: JavaScript Timers - Dice Roller
 */
"use strict";

(function () {
  window.addEventListener("load", initialize);
  let timerId = null;

  function initialize() {
    document.getElementById("roll").addEventListener("click", rollButton);
    document.getElementById("stop").addEventListener("click", stopButton);
  }

  function rollButton() {
    document.getElementById("results").classList.add("hidden");

    let diceCount = document.getElementById("count").value;
    if (diceCount > 0) {
      let diceArea = document.getElementById("dice-area");

      let dice = diceArea.querySelectorAll("div");
      for (let i = 0; i < dice.length; i++) {
        dice[i].remove();
      }

      diceArea.classList.remove("hidden");

      for (let i = 0; i < diceCount; i++) {
        let newDice = document.createElement("div");
        newDice.classList.add("die");
        diceArea.appendChild(newDice);
      }

      document.getElementById("dice-sides").disabled = true;
      document.getElementById("count").disabled = true;
      this.disabled = true;

      timerId = setInterval(rollDice, 100);

      document.getElementById("stop").disabled = false;
    } else {
      alert("Please input non-zero count");
    }
  }

  function rollDice() {
    let diceSides = document.getElementById("dice-sides").value;
    let diceArea = document.getElementById("dice-area");

    let dice = diceArea.querySelectorAll("div");

    for (let i = 0; i < dice.length; i++) {
      let rnd = parseInt(diceSides * Math.random());
      dice[i].innerHTML = rnd;
    }
  }

  function stopButton() {
    clearInterval(timerId);
    timerId = null;

    let diceArea = document.getElementById("dice-area");
    let dice = diceArea.querySelectorAll("div");

    let sum = 0;
    for (let i = 0; i < dice.length; i++) {
      sum += parseInt(dice[i].innerHTML);
    }
    document.getElementById("results").classList.remove("hidden");
    document.getElementById("roll-sum").innerHTML = sum;

    document.getElementById("dice-sides").disabled = false;
    document.getElementById("count").disabled = false;
    document.getElementById("roll").disabled = false;
    this.disabled = true;
  }
})();
