<?
/*include DataBase conection*/
include_once('db.php');
/*clear Data Base by refresh page*/
$connect -> query("TRUNCATE TABLE root");