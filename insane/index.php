<?php

if (isset($_POST["text"])) 
{
	$txt = htmlspecialchars($_POST["text"]);
	$fp = fopen("script.txt", "a");
	ftruncate($fp, 0);
	fwrite($fp, $txt . PHP_EOL);
	fclose($fp);
	echo "Successfully changed.";
}

?>