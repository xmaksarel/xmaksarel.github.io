<?php

header("Content-type: text/plain");

if(isset($_GET["name"]) && $_GET["name"] != "")
{
    $name = $_GET["name"];
    echo "Hello {$name}!";
}
else
{
    header("HTTP/1.1 400 Invalid Request");
    echo "Missing required name parameter!";
}
?>