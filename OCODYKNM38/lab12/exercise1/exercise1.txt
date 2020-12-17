<?php

header("Content-type: text/plain");
error_reporting(E_ALL);

if(isset($_GET["house"]) && $_GET["house"] != "")
{
    $house = $_GET["house"];
    foreach (glob("images/{$house}*") as $filename) {
        echo "{$filename}\n";
    }
}
else
{
    //header("HTTP/1.1 400 Invalid Request");
    //echo "Missing required name parameter!";
    foreach (glob("images/*") as $filename) {
        echo "{$filename}\n";
    }
}
?>