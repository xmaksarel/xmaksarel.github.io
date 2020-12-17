<?php

  /*
   * CSE 154
   * Mowgli's Cafe Part 1 Web Service
   *
   * =====================================================================
   * Web Service details:
   * =====================================================================
   * This web service supports two GET requests:
   *
   * Request 1: menu.php?list=<listtype>
   * =====================================================================
   * Required parameter: list=items or list=categories (case-insensitive)
   * Output formats:
   * - JSON
   * Output Details:
   * - This request returns an flat array of alphabetically-sorted strings 
   *   based on the requested menu information. 
   *   - If list=items, the name of all items on the menu are returned.
   *   - If list=categories, the name of all categories on the meny are returned.
   *   - Otherwise, a 400 error is returned with the following JSON message:
   *     { "error" : "Please provide a list of categories or items." }
   *
   * Request 2: menu.php
   * =====================================================================
   * Output formats: 
   * - JSON
   * Output Details:
   * - This request returns a nested JSON object for all categories 
   *   and their items on the menu.
   *
   * Each category in the menu has the schema:
   *   { <categoryname> : [item0, item1, ... ] }
   *
   * Each item in the category array has the following schema:
   *   { "name" : <itemname>, "price" : <itemprice>, "cost" : <itemcost> }
   *
   * Other Error-handling
   * =====================================================================
   * - For any database-connection errors, a 503 HTTP error will be output with the following JSON message:
   *   { "error" : "Can not connect to the database. Please try again later." }
   *
   * Extra practice
   * =====================================================================
   * Add more "filter" parameters to filter the menu by some criteria (e.g. maxprice=2.75)
   * Review prepare/exec from the readings. Can you use these to support another request for category=<categoryname>
   * and prevent SQL injection when using a GET parameter variable in your query strings?
   */

  include "common.php";

  if (isset($_GET["list"])) {
    # First, check if they passed the optional list parameter. If so, check that the list
    # is either items or categories.
    $list = strtolower($_GET["list"]);
    if ($list === "items" || $list === "categories") { 
      $result = get_list_data($_GET["list"]);
    } else {
      handle_request_error("Please provide a list of categories or items.");
    }
  } else { # No category parameter passed, so return entire menu.
    $result = get_menu();
  }

  # If we've reached here, we never output an error (remember die() terminates the program)
  header("Content-type: application/json");
  print(json_encode($result));

  /**
   * Comment TODO
   */
  function get_list_data($listtype) {
    $column = NULL;
    if ($listtype === "items") {
      $column = "name";
    } else { # $listtype === "categories"
      $column = "category";
    }

    # Remember we have access to this from common.php, but only construct it when we
    # know we're going to use it! (e.g. after checking for required GET parameters).
    $db = get_PDO();
    try {
      # It's good to put any code that uses the PDO in a try/catch to handle various PDO exceptions 
      # that might occur (which we can't predict in the same way as other error-handling) 
      $qry = "SELECT DISTINCT {$column} FROM menu ORDER BY {$column}";
      $rows = $db->query($qry);
      $result = array();
      while ($row = $rows->fetch(PDO::FETCH_ASSOC)) {
        array_push($result, $row[$column]);
      }
      return $result;
    } catch (PDOException $ex) {
      handle_db_error("Can not connect to the database. Please try again later.");
    }
  }

  /**
   * Comment TODO
   */
  function get_menu() {
    $db = get_PDO();
    try { 
      $qry = "SELECT name, category, cost, price FROM menu ORDER BY category, name";
      $rows = $db->query($qry);
      $result = array();

      $last_category = "";
      $category_items = array();

      # PDO::FETCH_ASSOC only fetches the associative array
      while ($row = $rows->fetch(PDO::FETCH_ASSOC)) {
        # $row is assigned to each next row (as an associative array) in the loop, e.g.:
        # Array([name] => Blueberry Scone
        #       [category] => Bakery
        #       [cost] => 0.75
        #       [price] => 3.5)

        # Recall the handy list function to save a list of variables when we know the length of
        # the array on the right-hand side!
        list($name, $category, $cost, $price) = array_values($row);
        $item = array("name" => $name, "cost" => $cost, "price" => $price);
        if ($last_category !== $category) {
          if ($last_category) {
            $result[$last_category] = $category_items;
            $category_items = array();
          }
          $last_category = $category;
        } 
        array_push($category_items, $item);
      }
      if ($last_category) {
        $result[$last_category] = $category_items;
      }
      return $result;
    } catch (PDOException $ex) {
      handle_db_error("Can not connect to the database. Please try again later.");
    }
  }

  ?>