/*
 *   Name: Maxim Tsov
 *   Date: 04.03.2020
 *   Lab7
 */
"use strict";

(function() {
  window.addEventListener("load", initialize);

  function initialize() {
    let box = document.querySelectorAll(".box");
    for (let i = 0; i < box.length; i++) {
      box[i].addEventListener("mouseover", mouseOver);
    }

    document.getElementById("clear").addEventListener("click", reset);
  }

  function mouseOver() {
    this.addEventListener("mousedown", tileClick);
  }

  function tileClick() {
    if (this.classList.contains("crossed-out")) {
      this.classList.remove("crossed-out");
    } else if (this.classList.contains("filled")) {
      this.classList.remove("filled");
      this.classList.add("crossed-out");
    } else {
      this.classList.add("filled");
    }
  }

  function reset() {
    let box = document.querySelectorAll(".box");
    for (let i = 0; i < box.length; i++) {
      box[i].classList.remove("filled");
      box[i].classList.remove("crossed-out");
    }
  }
})();
