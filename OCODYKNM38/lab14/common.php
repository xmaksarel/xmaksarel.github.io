<?php
  /**
   * CSE 154 Spring 2019
   * Section 17/18
   * Helper functions for the Cafe web service.
   */

  /**
   * Returns a PDO object connected to the database. Throws
   * a PDOException if an error occurs when connecting to database.
   * @return {PDO}
   */
  function get_PDO() {
    # Variables for connections to the database.
    $host = "127.0.0.1";         # fill in with server name
    $port = "3306";          # fill in with a port if necessary (will be different mac/pc)
    $user = "root";         # fill in with user name
    $password = "yfujhirtcbltkrjhjkm";     # fill in with password (will be different mac/pc)

    $dbname = "cafedb"; # fill in with db name

    # Make a data source string that will be used in creating the PDO object
    $ds = "mysql:host={$host}:{$port};dbname={$dbname};charset=utf8";

    try {
      # This creates a new PDO object, conventionally called $db. You don"t need
      # to memorize these statements, but refer to lecture/readings for more details.
      $db = new PDO($ds, $user, $password);
      $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
      return $db;
    } catch (PDOException $ex) {
      # An error may occur here if the db connection is down (it happens), the connection variables
      # are incorrect for the machine this PHP file is being ran on, etc. Note that don"t usually want to
      # output specific information from the $ex variable, since the client should really know
      # about information in our database, so we make a generic message.
      handle_db_error("Can not connect to the database. Please try again later.");
    }
  }

 /**
  * Prints out a plain text 400 error message given $msg. Remember that 400 errors
  * indicate an invalid request from a client, but that should be separate from
  * any PDO-related (database) errors. Use handle_db_error for anything related
  * to the database.
  * @param $msg {string} - Plain text 400 message to output.
  */
  function handle_request_error($msg) {
    process_error("HTTP/1.1 400 Invalid Request", $msg);
  }

 /**
  * Prints out a plain text 503 error message given $msg. If given a second (optional) argument as
  * an PDOException, prints details about the cause of the exception. See process_error for
  * note about responding with PDO errors to a client.
  * @param $msg {string} - Plain text 503 message to output
  * @param $ex {PDOException} - (optional) Exception object with additional exception details
  */
  function handle_db_error($msg, $ex=NULL) { # we can do default parameters in PHP! NULL is default if not given a second parameter.
    process_error("HTTP/1.1 503 Service Unavailable", $msg, $ex);
  }

 /**
  * Terminates the program after printing out a JSON error message given $msg after
  * sending the given header error code (handy to factor out error-handling between
  * 400 request errors and 503 db errors).
  * If given an (optional) third argument as an Exception, prints details about
  * the cause of the exception.
  *
  * @param $type {string} - The HTTP error header string.
  * @param $msg {string} - Message to output.
  */
  function process_error($type, $msg, $ex=NULL) {
    header($type); # e.g. "HTTP/1.1 400 Invalid Request"
    header("Content-type: application/json");
    if ($ex) {
      # Note that in practice, you probably don"t want to print details about your
      # database errors in a response to a client. But for testing your code, this can
      # help pinpoint bugs in your PDO functions/database connections.
      echo ("Error details: $ex \n");
    }
    die($msg); # die will print the argument and terminate the program.
  }
?>