<?php
/*include DataBase conection*/
include_once('db.php');
/*add new root to DataBase by name from script.js*/
if (isset($_POST["name"])) {
    $connect->query("INSERT INTO `root` (`parent_name`,`root_name`) VALUES ('".$_POST["parentname"]."','".$_POST["name"]."')");
    /*select data by newest root in DB*/
    $a = $connect->query("SELECT `root_id` , `parent_name` FROM root ORDER BY root_id DESC LIMIT 1");
    $row = explode('//', $a[0]['parent_name']);
    $par = $row[0];
    $result = array('id' => $a[0]['root_id'],
                    'parent' => $a[0]['parent_name'],
                    'par' => $par);
    /*sent data to script.js*/
    echo json_encode($result);
}
else {
    echo 'error : not receive Ajax data' . '<br>';
}

