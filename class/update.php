<?php
/*include DataBase conection*/
include_once('db.php');
/*Update new root name in  DataBase by id from script.js*/
if (isset($_POST["old"]) && isset($_POST["new"]) && isset($_POST["id"])){
    $connect->query("UPDATE`root` SET `root_name` = '".$_POST["new"]."' WHERE `root_id` = '".$_POST["id"]."' ");
}
else{
	echo'error : not receive Ajax data'.'<br>';
}
