<?php
$current_url =  $_SERVER["QUERY_STRING"]; 
$a=explode("?",$current_url);
    echo $a[0];
?>