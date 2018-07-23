<?php


//var_dump($_POST);
mail("marco@tamagno.it",$_POST["name"],$_POST["comment"],"From:".$_POST["mail"]);
echo "<script>window.close();</script>";

 ?>
