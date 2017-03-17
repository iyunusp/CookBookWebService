<?php
    $con=mysqli_connect("mysql4.gear.host","aea","Xd4Y-2qA!7vr","aea");
    if(mysqli_connect_errno($con)){
        echo "failed to connect" . mysqli_connect_error();
	}
    $username=$_GET['username'];
    $password=$_GET['password'];
    $result=mysqli_query($con,"SELECT Name from AeA where Name='$username' and Game='$password'");
    $row=mysqli_fetch_array($result);
    $data=$row[0];
    if($data){
        echo $data;
    }
    mysqli_close($con);
?>