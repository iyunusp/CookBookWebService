<?php
require_once('./LINEBotTiny.php');
define('DB_SERVER', 'mysql4.gear.host');
define('DB_USERNAME', 'usercook');
define('DB_PASSWORD', 'Il5A1Y73~!KQ');
define('DB_DATABASE', 'usercook');
$con = mysqli_connect(DB_SERVER,DB_USERNAME,DB_PASSWORD,DB_DATABASE);
$channelAccessToken='cbP7RlVv3AHKhn+b93bYzr6gMqcf+NGhPJ1FNol61l9eXPJVGeY3EIpGnQjHoDg4UjaxFV6iDIqX4otRmzNMUFEjnJ5MFktwQ8GrHVEEMM15HBInR9jA0zSpVYzdMDCAP6Vt8BbjW4q5g2XHLOaLoQdB04t89/1O/w1cDnyilFU=';
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
						for($i=1;$row=mysqli_fetch_array($result);$i++){
							$clientText .= $i . '    ' . $row[0] . '    ' . $row[1] . "\r\n";
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
