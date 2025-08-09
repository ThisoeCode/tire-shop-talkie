<?php
// CONFIG
$solidPW='';
$dynamicPW='';
$maxAttempts = 5;
$expire = 30;//days
$banFile = __DIR__ . '/ban.json';

// init
$lifetime = $expire*60*60*24;
$dt = new DateTime("now", new DateTimeZone('Asia/Seoul'));
$pw = $solidPW;
// $pw = $dynamicPW;
$ip = $_SERVER['REMOTE_ADDR'];
$banData = file_exists($banFile)
  ? json_decode(file_get_contents($banFile), true)
  : [];

session_set_cookie_params($lifetime);
ini_set('session.gc_maxlifetime',$lifetime);
session_start();



if($_SERVER['REQUEST_METHOD'] === 'POST'){
  $password = $_POST['password'] ?? '';

  if($password === $pw){
    $_SESSION['logged_in'] = true;
    unset($banData[$ip]); // Reset on success
    file_put_contents($banFile, json_encode($banData));
    if(isset($_GET["goto"])){
      $goto = $_GET["goto"];
      if(str_contains($goto,"..")){
        header('Location: /admin/'); exit;
      }
      if(file_exists("../$goto.php")||file_exists("../$goto.html")){
        header("Location: /admin/$goto"); exit;
      }
    }
    header('Location: /admin/'); exit;
  }

  // Wrong password
  $entry = $banData[$ip] ?? ['count' => 0, 'last' => 0, 'banned_until' => 0];

  $entry['count'] += 1;
  $entry['last'] = $dt;

  if($entry['count'] >= $maxAttempts){
    $entry['banned_until'] = $dt + (60 * 60 * 24); // Ban for 1 day
  }

  $banData[$ip] = $entry;
  file_put_contents($banFile, json_encode($banData));
  header('Location: ../login?err=wrongpw');
  exit;
}

header('Location: /admin/login?api');
exit;