<?php
session_start();
if ($_SESSION['logged_in'] ?? false) {
  header('Location: /admin');
  exit;
}
$err = $_GET['err'] ?? '';
?>

<!DOCTYPE html>
<html lang="ko">

<head>
  <!-- META -->
  <meta charset="utf-8">
  <title>ACME TIRE</title>
  <link rel="icon"href="../public/favicon.ico"/>
  <!-- CSS -->
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    main,form{
      display:flex;flex-direction:column;
      align-items:center;
    }
    form{gap:9pt}
    img{margin:27pt 0;}
    input{
      width:99pt;
      font-size:16pt;
      padding:3pt;
      text-align:center;
    }
    button{font-size:16pt;padding:0 16pt;}
    p{font-size:12pt;margin:0;line-height:1;color:#800}
  </style>
</head>

<body>
  <main>
    <img src="../public/favicon_round.png"alt="ACME TIRE"width="99"height="99"loading="lazy"/>
    <form action="api/login<?php if(isset($_GET['goto']))echo'?goto='.$_GET['goto']?>"method="post">
      <?php if($err==='wrongpw')echo'<p>다시 시도하세요.</p>'?>
      <input type="password"name="password"require <?php if($err==='banned')echo'disabled'?>/>
      <?php
        if($err==='banned')echo'<p>24시간 로그인 금지</p>';
        else echo'<button type="submit">로그인</button>';
      ?>
    </form>
  </main>
</body>

</html>