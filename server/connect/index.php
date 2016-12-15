<?php
/*
 * This is the code that is executed on the server after the user has granted permissions to let us access his data
 * The authentication is triggered by calling
 * https://soundcloud.com/connect?client_id=CLIENT ID&redirect_uri=URL TO THIS FILE GOES HERE&response_type=code
 * https://developers.soundcloud.com/docs/api/reference#connect
 */

include 'vars.php'; // This is the file where the soundcloud client id and client secret is

function httpPost($url, $data)
{
    $curl = curl_init($url);
    curl_setopt($curl, CURLOPT_POST, true);
    curl_setopt($curl, CURLOPT_POSTFIELDS, http_build_query($data));
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
    $response = curl_exec($curl);
    curl_close($curl);
    return $response;
}

function fail($error, $code){
  header('HTTP/1.1 '.$code.' Internal Server Error');
  echo 'FATAL ERROR: '.$error;
  exit(0);
}

function getExpiresOn($expiresIn){
  return (time()+$expiresIn) * 1000;
}

function successAuth($jsonData){
  if($_GET['state']){
   $url = $_GET['state'];
  } else {
   $url = 'http://localhost:3000/#/connect';
  }
  $url = $url . '#/connect' .
           '?access_token='  . $jsonData->access_token  .
           '&expires_on='    . getExpiresOn($jsonData->expires_in)    .
           '&refresh_token=' . $jsonData->refresh_token;

  header("HTTP/1.1 301 Moved Permanently");
  header('Location: ' . $url);
  exit();
}

function successRefresh($jsonData){
  $rspData = array(
    'access_token' => $jsonData->access_token,
    'expires_on' => getExpiresOn($jsonData->expires_in),
    'refresh_token' => $jsonData->refresh_token
  );
  header('Content-type: application/json');
  echo json_encode( $rspData );
}

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET,POST,PUT,DELETE,OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers');

$scClientId = $soundcloud['clientId'];
$scClientSecret = $soundcloud['clientSecret'];
$scAuthUrl = 'https://api.soundcloud.com/oauth2/token';

$fields = array(
    'client_id' => $scClientId,
    'client_secret' => $scClientSecret,
    'redirect_uri' => 'http://sc.menu-flow.com/connect'
);

if($_SERVER['REQUEST_METHOD'] == 'GET') {
  $fields['code'] = $_GET['code'];
  $fields['grant_type'] = 'authorization_code';
} else if ($_SERVER['REQUEST_METHOD'] == 'PUT'){
  $json = file_get_contents('php://input');
  $data = json_decode($json);
  $fields['refresh_token'] = $data->refresh_token;
  $fields['grant_type'] = 'refresh_token';
} else if($_SERVER['REQUEST_METHOD'] == 'OPTIONS'){
  exit(0);
}

if(!$fields['code'] && !$fields['refresh_token']) {
  fail('Neither a code nor a refresh token was provided!', 403);
}

$rsp = httpPost($scAuthUrl, $fields);
$jsonData = json_decode($rsp);

if($jsonData->error){
  fail($jsonData->error, 500);
} else {
  if($fields['code']){
    successAuth($jsonData);
  } else if($fields['refresh_token']){
    successRefresh($jsonData);
  }
}
?>
