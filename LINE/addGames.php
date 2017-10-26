<?php
  define('DB_SERVER', 'mysql4.gear.host');
  define('DB_USERNAME', 'usercook');
  define('DB_PASSWORD', 'Il5A1Y73~!KQ');
  define('DB_DATABASE', 'usercook');
  $con = mysqli_connect(DB_SERVER,DB_USERNAME,DB_PASSWORD,DB_DATABASE);
    if(mysqli_connect_errno($con)){
        echo "failed to connect" . mysqli_connect_error();
	}
  $name=$_GET['Name'];
	$price=$_GET['Price'];
  $result=mysqli_query($con,"INSERT INTO games(Name,Price) VALUES ('$name','$price')");
  mysqli_close($con);
?>
