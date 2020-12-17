/*
 * CSE 154
 * Section 15 - Trivia Web Service
 *
 * Implements the fetching and interactivity for the trivia webpage, allowing a user to 
 * see random trivia questions and test their knowledge against the answers.
 */
(function() {
  "use strict";

  const URL = "trivia.php";
  let currentCategory;

  window.addEventListener("load", init);

  /**
   * Sets up the page, fetching the list of categories for the trivia webpage, as well
   * as setting up functionality for switching between answers/questions when clicking the "Next"
   * button.
   */
  function init() {
    fetchCategories();
    id("view-all").addEventListener("click", showCategoryList);
    id("add-trivia").addEventListener("click", showAddTrivia);

    id("submit-trivia").addEventListener("click", addTrivia);
    id("next").addEventListener("click", toggleQA);
  }

  /**
   * Displays Category List as the Main View
   */
  function showCategoryList() {
    id("result").innerText = "";
    hide(["new-trivia-view"]);
    show(["category-view"]);
  }

  /**
   * Displays New Trivia View as the Main View
   */
  function showAddTrivia() {
    id("result").innerText = "";
    show(["new-trivia-view"]);
    hide(["category-view", "question-area", "next"]);
  }

  /**
   * Shows all elements in the given array of IDs.
   * @param {array} array of string ids of elements to show on the page.
   */
  function show(els) {
    for (let i = 0; i < els.length; i++) {
      id(els[i]).classList.remove("hidden");
    }
  }

  /**
   * Hides all elements in the given array of IDs.
   * @param {array} array of string ids of elements to hide on the page.
   */
  function hide(els) {
    for (let i = 0; i < els.length; i++) {
      id(els[i]).classList.add("hidden");
    }
  }

  /**
   * Fetches a new question/answer trivia tidbit for the current category, displaying the
   * question as a result. If no category is currently selected, makes a request
   * that is category-independent. Logs an error if the request is unsuccessful.
   */
  function showTrivia() {
    let url = URL + "?mode=category";
    if (currentCategory) {
      url += "&name=" + currentCategory;
    }
    fetch(url)
      .then(checkStatus)
      .then(JSON.parse)
      .then(displayQuestion)
      .catch(showError);
  }

  /**
   * Displays the categories on the page based on the responseData.
   * @param {object} responseData - parsed JSON representing categories for the trivia
   * available.
   */
  function populateCategories(responseData) {
    let categories = responseData["categories"];
    let ul = id("categories");
    let dropdown = id("category-dropdown");
    for (let category in categories) {
      let li = document.createElement("li");
      let option = document.createElement("option");
      li.innerText = category; 
      option.innerText = category; 
      option.value = category; 
      ul.appendChild(li);
      dropdown.appendChild(option);
      li.addEventListener("click", selectCategory);
    }
  }
  
  /**
   * Displays the question in the question area based on the question from the response.
   * Hides any visible answer text.
   * @param {object} response - JSON object containing question and answer information for
   * a trivia tidbit.
   */
  function displayQuestion(response) {
    hide(["current-answer"]);
    show(["question-area"]);
    id("current-question").innerText = response.question;
    id("current-answer").innerText = response.answer;
  }

  /**
   * Fetches the list of categories for the trivia page, displaying them based on the result.
   * Logs an error if the request was unsuccesful.
   */
  function fetchCategories() {
    fetch(URL + "?mode=categories")
      .then(checkStatus)
      .then(JSON.parse)
      .then(populateCategories) 
      .catch(showError);
  }

  /**
   * Updates the current category based on the text of the element this function
   * was attached to, hiding the "Next" button and resetting the current question/answer
   * display.
   */
  function selectCategory() {
    currentCategory = this.innerText;
    let selected = qsa(".selected-category");
    for (let i = 0; i < selected.length; i++) {
      selected[i].classList.remove("selected-category");
    }
    this.classList.add("selected-category");
    id("next").innerText = "New Question";
    hide(["question-area"]);
    id("current-question").innerText = "";
    id("current-answer").innerText = "";
    show(["next"]);
  }

  /*
   * Toggles the question/answer currently shown. If the answer to the current question is
   * not displayed, displays it. Otherwise, fetches a new question/answer for the 
   * current category. Only the question for the new trivia tidbit is then displayed.
   */
  function toggleQA() {
    let currentAns = id("current-answer");
    if (currentAns.classList.contains("hidden")) {
      currentAns.classList.remove("hidden");
      id("next").innerText = "New Question";
    } else {
      showTrivia();
      id("next").innerText = "Show Answer";
    }
  }

  /**
   * Submits a new Q/A entry to the currently-selected trivia category.
   */
  function addTrivia() {
    let selected = document.querySelector("select").value;
    let newQ = id("new-q").value;
    let newA = id("new-a").value;
    if (newQ && newA) {
      let params = new FormData();
      params.append("category", selected);
      params.append("question", newQ); 
      params.append("answer", newA); 
      id("new-q").value = "";
      id("new-a").value = "";
      fetch("trivia.php", { method : "POST", body : params })
        .then(checkStatus)
        .then(showResult)
        .catch(showError);
    } else {
      showResult("Please enter non-empty question and answer!");
    }
  }

  /**
   * Displays error message in result area of the page.
   */
  function showError() {
    id("result").innerText = "Something went wrong! Please try again later.";
  }

  /**
   * Displays responseText in result area of the page.
   * @param {string} responseText
   */
  function showResult(responseText) {
    id("result").innerText = responseText;
  }

  /* ==============================  Helper Functions ============================== */
  /**
   * Returns the element that has the ID attribute with the specified value.
   * @param {string} id - element ID.
   * @return {object} DOM object associated with id.
   */
  function id(idName) {
    return document.getElementById(idName);
  }

  /**
   * Returns an array of elements matching the given query (an alias for querySelectorAll).
   * @param {string} el - query matching returned DOM elements.
   * @return {object[]} array of DOM objects matching the given query.
   */
  function qsa(query) {
    return document.querySelectorAll(query);
  }

  /**
   * Helper function to return the response's result text if successful, otherwise
   * returns the rejected Promise result with an error status and corresponding text
   * @param {object} response - response to check for success/error
   * @return {object} - valid result text if response was successful, otherwise rejected
   *                    Promise result
   */
  function checkStatus(response) {
    if (response.status >= 200 && response.status < 300 || response.status == 0) {
      return response.text();
    } else { 
      return Promise.reject(new Error(response.status + ": " + response.statusText));
    }
  }

})();
