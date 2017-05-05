	<!DOCTYPE html>
	<html>
	<head>
		<title>Cook Book login</title>
		<meta charset="utf-8">
		<meta name="viewport" content="width=device-width, initial-scale=0">
		<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
		<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
		<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>	
	</head>
	<body>
			
		<?php
		session_start();
		define('DB_SERVER', 'mysql4.gear.host');
  		define('DB_USERNAME', 'usercook');
   		define('DB_PASSWORD', 'Il5A1Y73~!KQ');
   		define('DB_DATABASE', 'usercook');
   $db = mysqli_connect(DB_SERVER,DB_USERNAME,DB_PASSWORD,DB_DATABASE);
		$email = null;
		if ($_SERVER["REQUEST_METHOD"]=="POST")
		{
			$count = 0;
			if(isset($_POST['email'])&&isset($_POST['password']))
			{	
				$email = $_REQUEST['email'];
				$password = $_REQUEST['password'];
				$sql = "SELECT userName,userRealname,userMail,userPhone,userAddress from usercook where userName like '$email' and userPassword like '$password'";
				$result = mysqli_query($db,$sql);
				$count = mysqli_num_rows($result);
				$role = mysqli_fetch_assoc($result);
				
				if($count == 1)
				{
					$_SESSION['login_user'] = $email;
				}
				else 
				{
					echo'
					<center><div class="alert alert-danger" id="alert">
						<strong><center>Login Failed!<br>Username or Password is incorrect </center></strong>
					</div></center>	';
				}
			}
			else{
				$email = null;
				$password = null;
			}

		}
		?>
		<div id="main" class="container-fluid">
		<style type="text/css">
		body{
			background-color: orange;
		}	
			#main{
				width: 500px;
				height: 500px;
				top: 100px;
				bottom: 0;
				left: 0;
				right: 0;
				position: absolute;

			}
			form{
				background-color: white;
				width: 450px;
				height: 255px;
				position: absolute;
				top:0;
				bottom: 10px;
				left: 0;
				right: 0;
				margin: auto;
				border-radius: 8px;
				border-color: grey;
			}
			.email{
				top:10px;
				width: 300px;
			}
			#alert {
				width:250px; 
				position: static;
				transition: 1s;
			}
		</style>


		</style>
			<center>
				<font face="calibri" size="20px" style="color:black;" ><b>C</b>ook Book</font>
			</center>
			<form action="<?php echo htmlspecialchars($_SERVER['PHP_SELF']);?>" method="post">
				<center><br>Sign in to start your session
					<div class="form-group has-feedback email">
						<input type="text" class="form-control" placeholder="Email" id="txtEmail" name="email" />
						<b class="glyphicon glyphicon-envelope form-control-feedback"></b>
					</div>
					<div class="form-group has-feedback email">
						<input type="password" class="form-control" placeholder="Password" id="txtPasword" name="password" />
						<b class="glyphicon glyphicon-lock form-control-feedback"></b>
					</div>
				</center>
				<div style="position: relative;top:10px;">
					<inline>
						<button type="submit" class="btn btn-primary" style="left: 188px; position: relative;" id="btnSubmit">Submit</button>
					</inline>
				</div>

				<br>
			</form>
		</div>
	</body>
	</html>