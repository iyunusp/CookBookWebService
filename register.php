<?php
    $con=mysqli_connect("mysql4.gear.host","usercook","Il5A1Y73~!KQ","usercook");
    if(mysqli_connect_errno($con)){
        echo "failed to connect" . mysqli_connect_error();
	}
    $username=$_POST['username'];
	$password=$_POST['password'];
	$realname=$_POST['realname'];
	$mail=$_POST['mail'];
    $result=mysqli_query($con,"INSERT INTO usercook(userName,userPassword,userRealname,userMail,userPhone,userAddress) VALUES ('$username','$password','$realname','$mail','unknown','unknown')");
    mysqli_close($con);
?>
