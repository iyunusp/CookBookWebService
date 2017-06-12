<?php
    require 'connectDB.php';
    if(mysqli_connect_errno($con)){
        echo "failed to connect" . mysqli_connect_error();
	}
    $username=$_GET['username'];
    $result=mysqli_query($con,"SELECT userName from usercook where userName like '$username'");
    $row=mysqli_fetch_array($result);
    $data=$row[0];
    if($data){
        echo $data;
    }
    mysqli_close($con);
?>
