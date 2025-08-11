<?php
$goto='accountance';require 'auth.php';
// $t=time();
?>
<!DOCTYPE html>
<html lang="ko">
<head>
  <!-- META -->
  <meta charset="utf-8">
  <title>ACME TIRE</title>
  <link rel="icon"href="../public/favicon.ico"/>
  <!-- JS -->
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>
  <script src="src/config.js?v1"></script>
  <script src="src/accountance.js?v1"></script>
  <!-- CSS -->
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="../public/svg.css?v1">
  <link rel="stylesheet" href="src/_.css?v1">
</head>

<body><i id="accountance">
  <header>
    <a href=".">
      <img src="../public/favicon_round.png"alt="ACME TIRE"loading="lazy"/>
    </a>
    <nav id="settings">
      <button id="notification">
        <i class="bell off svg"></i>
        <p>알람</p>
      </button>
    </nav>
  </header>

  <i id="dtform">
    <input type="date"id="calendar">
    <button id="limittoday"style="display:none">오늘</button>
  </i>

  <table>
    <tr id="th"><!-- Dynamic --></tr>
  </table>
</i></body>

</html>