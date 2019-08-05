<?php
/*include DataBase conection*/
include_once('db.php');

if (isset($_POST["id"])) {
    /*check parents for root*/
    $a = $connect->query("SELECT `root_name`, `parent_name`FROM root WHERE `root_id` = '".$_POST["id"]."'");
    $row = explode('//', $a[0]['parent_name']);
    $c =  $connect->query("SELECT COUNT(*) AS count FROM root WHERE `parent_name` LIKE  '".$row[0]."%'");

    if($c[0]['count'] === '1'){
        $par = $row[0];
    }
    else {
        $par = 'no';
    }
    /*sent data to script.js*/
    $result = array('name' => $a[0]['root_name'],
				    'par' => $par);
    /*Delete root fom DB*/
    $connect->query("DELETE FROM root WHERE parent_name LIKE  '%/".$_POST["id"]."/%'");
    /*Delete child roots fom DB*/
    $connect->query("DELETE FROM root WHERE root_id =  '".$_POST["id"]."'");
}
else{
	echo'error : not receive Ajax data'.'<br>';
}
echo json_encode($result); 
