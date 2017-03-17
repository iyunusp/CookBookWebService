<?php
    $con=mysqli_connect("mysql4.gear.host","usercook","Il5A1Y73~!KQ","usercook");
    if(mysqli_connect_errno($con)){
        echo "failed to connect" . mysqli_connect_error();
	}
    $username=$_GET['username'];
    $result=mysqli_query($con,"SELECT userName from usercook where userName like '$username');
    $row=mysqli_fetch_array($result);
    $data=$row[0];
    if($data){
        echo $data;
    }
    mysqli_close($con);
?>