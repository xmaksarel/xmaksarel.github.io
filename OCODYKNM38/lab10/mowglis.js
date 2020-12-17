/**
 * Maxim Tsov
 * 09.04.2020
 * Internet Technologies
 * Lab 10 Fullstack Cafe Part 1 (Student Starter Code)
 *
 * Original source: https://courses.cs.washington.edu/courses/cse154
 * Modified by Lauren Bricker 10/30/18
 */

"use strict";

(function () {

  const SIZE_RATIOS = { "12oz": 1, "16oz": 1.25, "20oz": 1.4 };

  /**
   *  Add a function that will be called when the window is loaded.
   */
  window.addEventListener("load", initialize);

  /**
   *  Initialize the page by adding the click event to the submit button
   *  then load the menu.
   */
  function initialize() {
    fetchMenu();
    $("submit").addEventListener("click", saveOrder);

  };

  /**
   *  Function to fetch the whole menu using AJAX fetch
   */
  function fetchMenu() {
    let url = "https://courses.cs.washington.edu/courses/cse154/webservices/mowgliscafe/mowgliscafe.php?menu=all";

    fetch(url)
      .then(checkStatus)
      .then(JSON.parse)
      .then(populateMenu);
  };

  /**
   *  Once the fetch returns (from the checkStatus and JSON.parse), it arrives here
   *  to populate the menus. For now populate both drinks and bakery menus
   * @param {JSON} responseData - Menu data in a JSON object
   */
  function populateMenu(responseData) {
    // Populate a new category on the page for the "Drinks" using the Drinks data from the response
    populate("Drinks", responseData.Drinks);

    // Populate the drink sizes
    populateDrinkSizes();

    // Populate a new category on the page for the "Bakery" using the Bakery data from the response
    populate("Bakery", responseData.Bakery);

    let drinks = document.getElementsByName("drinks");
    for (let index = 0; index < drinks.length; index++) {
      drinks[index].addEventListener("change", updatePrice);
    }

    let drinkSize = document.getElementsByName("drinksize");
    drinkSize[0].checked = true;
    for (let index = 0; index < drinkSize.length; index++) {
      drinkSize[index].addEventListener("change", updatePrice);
    }

    let bakery = document.getElementsByName("bakery");
    for (let index = 0; index < bakery.length; index++) {
      bakery[index].addEventListener("change", updatePrice);
    }

    // for part IV - restore the previous order

  }

  /**
   *  Function to save all of the information to the localStorage for later retrieval
   */
  function saveOrder() {
    /**** TO DO: fill in the code to store the information to the localStorage */

  }

  /**
   *  Function to pull all of the information from the localStorage to set up the web
   *  based on previous buying practices
   */
  function restoreOrder() {
    /**** TO DO: fill in the code to retreive the information from the localStorage */
    /**** use checkRadioButton to help check which radio button based on what was stored */
    /**** Then update the price */
  }

  /**
   *   Helper function to check the radio button in a particular group that has a certain value
   *   @param {string} group - the name of the group of radio buttons we're searching
   *   @param {string} value - the value of the button we're looking for so we can check it.
   */
  function checkRadioButton(group, value) {
    let buttons = $$("input[name='" + group + "']");
    for (let i = 0; i < buttons.length; i++) {
      if (buttons[i].value === value) {
        buttons[i].checked = true;
        break;
      }
    }
  }

  /**
   *  Helper function to populate one category/subcategory of the menu.
   *  Loops through the subcategory of the category and generates all of the items
   *  @param {string} category - the category we're generating items in
   *  @param {string} subcats - the list of subcategories we're generating items in .
   */
  function populate(category, subcats) {
    let fieldset = gen("fieldset");
    fieldset.id = category.toLowerCase();
    let legend = gen("legend");
    legend.innerText = category;
    fieldset.appendChild(legend);
    for (let i = 0; i < subcats.length; i++) {
      let cat = subcats[i].category;
      let items = subcats[i].items;
      let head = gen("div", "col-head");
      let title = genText("p", cat);
      let price = genText("p", "Price ($)");
      let hr = gen("hr");
      head.appendChild(title);
      head.appendChild(price);
      fieldset.appendChild(head);
      fieldset.appendChild(hr);
      for (let j = 0; j < items.length; j++) {
        let name = items[j]["name"];
        let priceChild = items[j]["price"];
        let itemDiv = genItem(fieldset.id, name, name, priceChild);
        fieldset.appendChild(itemDiv);
      }
    }
    $("menu-container").appendChild(fieldset);
  }

  /**
   *  Helper method to populate the drink sizes
   */
  function populateDrinkSizes() {
    let fieldset = $("menu-container").querySelector("#drinks");
    let head = gen("div", "col-head");
    let title = genText("p", "Size Options");
    let price = genText("p", "Price ($)");
    let hr = gen("hr");
    head.appendChild(title);
    head.appendChild(price);
    fieldset.appendChild(head);
    fieldset.appendChild(hr);
    for (let size in SIZE_RATIOS) {
      let priceText = SIZE_RATIOS[size] == 1 ? "listed price" : "(" + parseFloat(SIZE_RATIOS[size]).toFixed(2) + "x listed price)";
      fieldset.appendChild(genItem("drinksize", size, size, priceText));
    }
  }

  /**
   *  Update the price when an item is added to our order
   */
  function updatePrice() {
    let drinkChoice = $("menu-container").querySelector("input[name='drinks']:checked");
    let drinkPrice = drinkChoice.getAttribute("price") ? drinkChoice.getAttribute("price") : 0;
    if (drinkPrice > 0) {
      if (!$("menu-container").querySelector("input[name='drinksize']:checked")) {
        $$("input[value='12oz']").checked = "checked";
      }
      let drinkSize = $("menu-container").querySelector("input[name='drinksize']:checked").value;
      drinkPrice *= SIZE_RATIOS[drinkSize];
    }
    let bakeryPrice = 0;
    if ($("menu-container").querySelector("input[name='bakery']:checked")) {
      bakeryPrice = $("menu-container").querySelector("input[name='bakery']:checked").getAttribute("price");
    }
    let price = parseFloat(drinkPrice) + parseFloat(bakeryPrice);
    let priceWithTax = price *= 1.08;
    let totalCost = priceWithTax + (parseFloat($("tip").value ? $("tip").value : 0));
    totalCost = totalCost.toFixed(2);
    $("cost").innerText = price.toFixed(2);
    $("totalcost").innerText = totalCost;
  }

  /**
   * Generates an input element for the cafe
   * @param {string} inputName - the name of the input elements
   * @param {string} value - the value attached to this input element
   * @param {string} name - the name (label) of the input
   * @param {string} price - the price of the item
   * @return {object} The DOM element created
   */
  function genItem(inputName, value, name, price) {
    let itemDiv = gen("div", "item");
    let label = gen("label");
    let input = gen("input");
    input.type = "radio";
    input.name = inputName;
    input.value = value;
    input.setAttribute("price", price);

    label.appendChild(input);
    let nameText = document.createTextNode(name);
    label.appendChild(nameText);
    let span = gen("span", "price");
    span.innerText = price;
    itemDiv.appendChild(label);
    itemDiv.appendChild(span);
    return itemDiv;
  }

  // ------------------------- Helper Functions ------------------------- //
  /*
   * Helper function to return the response's result text if successful, otherwise
   * returns the rejected Promise result with an error status and corresponding text
   * @param {object} response - response to check for success/error
   * @returns {object} - valid result text if response was successful, otherwise rejected
   *                     Promise result
   */
  function checkStatus(response) {
    if (response.status >= 200 && response.status < 300 || response.status == 0) {
      return response.text();
    }

    return Promise.reject(new Error(response.status + ": " + response.statusText));
  }

  /**
   * Returns the element that has the ID attribute with the specified value.
   * @param {string} id - element ID
   * @returns {object} DOM object associated with id.
   */
  function $(id) {
    return document.getElementById(id);
  }

  /**
   * Returns the first element that matches the given CSS selector.
   * @param {string} query - CSS query selector.
   * @returns {object} The first DOM object matching the query.
   */
  function qs(query) {
    return document.querySelector(query);
  }

  /**
   * Returns the array of elements that match the given CSS selector.
   * @param {string} query - CSS query selector
   * @returns {object[]} array of DOM objects matching the query.
   */
  function $$(sel) {
    let elements = document.querySelectorAll(sel);
    return elements.length == 1 ? elements[0] : elements;
  }

  /**
   * Generates an element with a specific (optional) classlist
   * @param {string} el - the string name of the element to create
   * @param {string} or {array} classes - a list of classes to attach to this object (either string or array)
   * @return {object} The DOM element created
   */
  function gen(el, classes = "") {
    let element = document.createElement(el);
    if (classes instanceof Array) {
      for (let cl in classes) {
        element.classList.add(cl);
      }
    } else {
      element.className = classes;
    }
    return element;
  }

  /**
   * Generates an document element with a specific inner text
   * @param {string} el - the string name of the element to create
   * @param {string} text - the text to set the innerText to
   * @param {object} The DOM element created with the text
   * @return {object} The DOM element created
   */
  function genText(el, text) {
    let element = document.createElement(el);
    element.innerText = text;
    return element;
  }

})();
