<?php
$goto='index';
require 'auth.php';
?>

<!DOCTYPE html>
<html lang="ko">

<head>
  <!-- META -->
  <meta charset="utf-8">
  <title>ACME TIRE</title>
  <link rel="icon"href="../public/favicon.ico">
  <!-- JS -->

  <!-- CSS -->
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@100..900&family=Noto+Serif+KR&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="../public/svg.css">
  <style>
  :root{
    --serif:"Noto Serif KR",serif;
    --thisoe:#178577;
  }
  html,body,i,a{all:unset}
  i,main{display:flex;flex-direction:column}
  nav{
    display:flex;flex-direction:row;
    align-items:center;
    justify-content:space-between;
    height:39pt;padding:9pt 18pt;
    border-bottom:#ccc solid 1px;

    & img{
      height:39pt;
      user-select:none;pointer-events:none;
    }
    & button{
      font-family:sans-serif;
      user-select:none;
    }
  }
  main{
    width:100%;
    &>i{
      display:flex;flex-direction:column;
      padding:27pt 0;
      &>a{
        margin:9pt auto;
        width:180pt;
        padding:16pt 0;
        text-align:center;
        max-width:360px;
        outline:solid var(--thisoe) 3pt;
        border-radius:16pt;
        font-size:30pt;
        font-family:var(--serif);font-weight:700;
        transition:background-color .2s ease;
        cursor:pointer;
        &:hover{
          background-color:#acfcee;
        }
      }
      &>.tongsin{
        margin:auto;
        width:30pt;height:30pt;
        transform:rotate(180deg);
      }
    }
  }
  </style>
</head>

<body>

<nav>
  <img src="../public/favicon_round.png"alt="ACME TIRE"loading="lazy"/>
  <button onclick="location.href='api/logout'">로그아웃</button>
</nav>

<main>
  <i class="thisoetongsin">
    <a href="yard">현장</a>
    <i class="tongsin svg"></i>
    <a href="accountance">사무실</a>
  </i>
</main>

</body></html>