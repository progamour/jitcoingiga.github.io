<?php

if (isset($_POST["HWID"])) 
{
	$txt = htmlspecialchars($_POST["HWID"]);
	if(strlen($txt) == 27) {
	    $fp = fopen("auth/auth/auth.txt", "a");
	    fwrite($fp, $txt . PHP_EOL);
	    fclose($fp);
	    echo "Your Scythe HWID was successfully added.";
	}
	else {
	    echo "Wrong HWID.";
	}
}

?>