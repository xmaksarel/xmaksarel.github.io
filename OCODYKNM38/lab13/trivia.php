<?php
/* CSE 154
 * Section 15 Trivia API Solution
 * This API supports GET and POST requests.
 * -------------------------------------- GET ---------------------------------------------
 * If sent a GET request, a parameter 'mode' is required to be passed with one of two values:
 * ====================
 *   - mode=categories 
 *     |  returns a JSON object mapping trivia categories on the system with the
 *     |  number of questions in each category
 * ====================
 *   - mode=category&name=categoryname
 *     | returns a question/answer JSON object with a question/answer
 *     | for a random trivia tidbit matching the specified categoryname. 
 *     | If categoryname does not correspond to one of the available categories on 
 *     | the server, returns a 400 response. 
 *
 * -------------------------------------- POST ---------------------------------------------
 * Otherwise if sent a POST request, there are three required parameters to add a new
 * question/answer for a current category:
 * ====================
 *   - category
 *     | name of category to add new question/answer to (must be an existing category)
 *   - question
 *     | text of new question
 *   - answer
 *     | text of answer for new question
 * Upon success, this request will return a plain text message:
 *   "New entry added for category <category-value>!"
 *
 * If category does not correspond to one of the available categories on the server,
 * returns a 400 response. 
 */

if (isset($_GET["mode"])) {
  $mode = strtolower($_GET["mode"]);
  $result = NULL;
  if ($mode === "categories") {
    $result = get_categories();
  } else if ($mode === "category") {
    $category = "*";
    if (isset($_GET["name"])) {
      $category = strtolower($_GET["name"]);
    }
    $result = get_qa_json($category);
  }
  if ($result) {
    header("Content-type: application/json");
    echo $result;
  } else {
    print_error("Invalid mode passed. Please pass mode as 'categories' or 'category'.");
  }
} else if (isset($_POST["category"]) && isset($_POST["question"]) && isset($_POST["answer"])) {
  add_new_qa();
} else {
  print_error("Missing required GET or POST parameters.");
}

/**
 * Returns a JSON object containing all categories in the trivia folder path
 * mapping each category name to the number of files of trivia data for that category. 
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
  $categories = array_diff(scandir("trivia/"), array('..', '.'));
  $result["categories"] = [];
  foreach ($categories as $category) {
    $filecount = count(glob("trivia/{$category}/*.txt"));
    $result["categories"][$category] = $filecount;
  }
  return json_encode($result); 
}

/**
 * Returns a JSON object for a trivia category containing a random question/answer.
 * If name is passed as a query parameter with a value, returns a question/answer
 * for a random trivia file with the category name. If the name does not correspond to
 * the category name passed, outputs an 400 error. If no name query parameter is passed,
 * returns a random question/answer from any of the trivia categories on the server. 
 *
 * @return {object} - JSON-formatted object with schema:
 *   { 
 *     "question" : <question-text>,
 *     "answer" : <answer-text>
 *   }
 */
function get_qa_json($category) {
  $trivia_files = glob("trivia/{$category}/*.txt");

  if (count($trivia_files) === 0) {
    print_error("No trivia found for the requested category.");
  }

  $rand_index = array_rand($trivia_files);
  $random_trivia = $trivia_files[$rand_index];

  $qfile = file_get_contents($random_trivia);

  $lines = explode("\n", $qfile);
  $question = $lines[0];
  $answer = $lines[1];

  return json_encode(array("question" => $question, "answer" => $answer));
}

/**
 * Adds a new Q/A entry for the category name passed as a POST parameter (required).
 * Outputs plain text response upon success, or 400 error if unknown category is passed.
 */
function add_new_qa() {
  $category = strtolower($_POST["category"]);
  if (file_exists("trivia/{$category}")) {
    $newq = $_POST["question"];
    $newa = $_POST["answer"];
    $trivia_files = glob("trivia/{$category}/*.txt"); 

    # e.g. astronomy8.txt if there are 7 astronomy files
    $new_filename = $category . (count($trivia_files) + 1);
    $new_trivia_file = "trivia/{$category}/{$new_filename}.txt";

    header("Content-type: text/plain");
    //Uncomment on your local machine, we don't allow writing new files on our server. 
    //file_put_contents($new_trivia_file, "Q: {$newq}\nA: {$newa}"); 
    //echo "New entry added for {$category} category!";
    
    echo "POST successful! But you must run this solution on your local machine if " .
        "you want to write your own trivia files!";
  } else {
    print_error("Unknown category: {$category}");
  }
}

/**
 * Outputs a 400 error with the given $msg text (plain text output).
 * @param $msg - error message output.
 */
function print_error($msg) {
  header("HTTP/1.1 400 Invalid Request");
  header("Content-type: text/plain");
  die($msg);
}

?>