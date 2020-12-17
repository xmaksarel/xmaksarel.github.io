/*
 * Lecture example saying hello to our very first hello.php web service
 * with fetch!
 */
(function() {
  "use strict";

  const URL = "greeter.php";
  window.addEventListener("load", init);

  /**
   * When button is clicked, say hello to hello.php, and output response on page!
   */
  function init() {
    id("hello-btn").addEventListener("click", sayHello);
  }

  function sayHello() {
    let name = id("name-input").value; 
    let url = URL + "?name=" + name;

    fetch(url)
      .then(checkStatus)
      .then(outputResponse)
      .catch(outputResponse);
  }

  function outputResponse(responseText) {
    id("response").innerText = responseText;
  }

  /**
   * Returns the element that has the ID attribute with the specified value.
   * @param {string} idName - element ID
   * @return {object} DOM object associated with id.
   */
  function id(idName) {
    return document.getElementById(idName);
  }

  /*
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
