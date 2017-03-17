<?php
    $con=mysqli_connect("mysql4.gear.host","usercook","Il5A1Y73~!KQ","usercook");
    if(mysqli_connect_errno($con)){
        echo "failed to connect" . mysqli_connect_error();
	}
    $username=$_GET['username'];
    $password=$_GET['password'];
    $result=mysqli_query($con,"SELECT userName,userRealname,userMail,userPhone,userAddress from usercook where userName like '$username' and userPassword like '$password'");
    $row=mysqli_fetch_array($result);
    $data=$row[0];
    if($data){
        echo $row[0],$row[1],$row[2],$row[3],$row[4];
    }
    mysqli_close($con);
?>
