<?php
/* CSE 154
 * Section 15 Trivia API
 * This API supports GET and POST requests. See solution for example documentation!
 *
 * Exercise 1: Implement get_categories()
 * Exercise 2: Implement get_qa_json($category_name)
 *   - Output message if $category_
 * Exercise 3: Handle GET parameters 
 *   - mode=categories uses get_categories()
 *   - mode=category&name=<category_name>
 *     - returns QA json for given category
 *   - mode=category
 *     - returns QA json for random category
 * Exercise 4: Error-handling
 *   - If missing mode or mode is not categories/category, output 400 message
 *   - If mode=category&category=<missing_name>, output 400 message
 * Exercise 5: POST request with add_new_qa($category, $q, $a)
 *   - If passed category, question, answer, add new file in category directory
 *     * If category is missing, output 400 error
 */


/**
 * Exercise 1: Finish this function to return a JSON object containing all 
 * categories in the trivia/ folder mapping each category name to the 
 * number of files of trivia data for that category. 
 *
 * @return {object} - JSON-formatted object with schema:
 *   { 
 *     "categories" : [
 *        { <category> : <question-count> },
 *        { <category> : <question-count> },
 *        ...
 *        { <category> : <question-count> }
 *     ]
 *   }
 */
function get_categories() {






}

/**
 * Exercise 2: Write a function to return a JSON object for the given category 
 * containing a random question/answer.
 * @return {object} - JSON-formatted object with schema:
 *   { 
 *     "question" : <question-text>,
 *     "answer" : <answer-text>
 *   }
 */
function get_qa_json($category) {







}

/**
 * Exercise 5:
 * Add a new Q/A entry for the category name.
 * Outputs plain text response upon success, or 400 error if unknown category is passed.
 */
function add_new_qa($category, $q, $a) {
  if (file_exists("trivia/{$category}")) {




  } else {





    # error message when missing category
    $msg = "Unknown category: {$category}";
  }
}

?>
