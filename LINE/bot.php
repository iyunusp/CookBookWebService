<?php
require_once('./LINEBotTiny.php');
define('DB_SERVER', 'mysql4.gear.host');
define('DB_USERNAME', 'usercook');
define('DB_PASSWORD', 'Il5A1Y73~!KQ');
define('DB_DATABASE', 'usercook');
$con = mysqli_connect(DB_SERVER,DB_USERNAME,DB_PASSWORD,DB_DATABASE);
$channelAccessToken='nqncFwrXVkNI+zr3cFzaJhOJATqDxzMHxqSg2tRIJBvsDmfZjm12nZMPLjd5dyVuUjaxFV6iDIqX4otRmzNMUFEjnJ5MFktwQ8GrHVEEMM0yfjV7d9u5EiOaT80roJn5118dNn7hiKdgjzolE/faEAdB04t89/1O/w1cDnyilFU=';
$channelSecret='8ad8fdee2b1dd25090e7b3974e63705c';
$client=new LINEBotTiny($channelAccessToken,$channelSecret);
$prefix = 'Search ';
foreach ($client->parseEvents() as $event) {
	switch ($event['type']) {
		case 'message':
			$message = $event['message'];
			switch ($message['type']) {
				case 'text':
					$clientText=$message['text'];
					if(mysqli_connect_errno($con)){
						$client->replyMessage(array(
							'replyToken' => $event['replyToken'],
							'messages' => array(
								array(
									'type' => 'text',
									'text' => 'Connection Failed'
								)
							)
						));
					}
					if(substr($clientText,0,strlen($prefix))==$prefix){
						$clientText=substr($clientText,strlen($prefix));
						$result=mysqli_query($con,"SELECT Name, Price from games where Name like '%$clientText%'");
						$clientText='';
						$i=1;
						while($row=mysqli_fetch_array($result)){
							if($i==1){
								$clientText .= sprintf("%-2s %-28s %-7s \r\n",'No' , 'Name' , 'Price');
							}else if($i==6)break;
							$clientText .= sprintf("%2d %-28s \$%-7d\r\n",$i , $row[0] , $row[1]);
							$i++;
						}
						if($clientText==''){
							$client->replyMessage(array(
								'replyToken' => $event['replyToken'],
								'messages' => array(
									array(
										'type' => 'text',
										'text' =>  'Game not Found'
									)
								)
							));
						}else{
							$client->replyMessage(array(
								'replyToken' => $event['replyToken'],
								'messages' => array(
									array(
										'type' => 'text',
										'text' => $clientText
									)
								)
							));
						}
						
					}else{
						$client->replyMessage(array(
							'replyToken' => $event['replyToken'],
							'messages' => array(
								array(
									'type' => 'text',
									'text' => 'wrong keyword'
								)
							)
						));
					}
					break;
				default:
					error_log("Unsupporeted message type: " . $message['type']);
					break;
			}
			break;
		default:
			error_log("Unsupporeted event type: " . $event['type']);
			break;
	}
};
mysqli_close($con);
?>
