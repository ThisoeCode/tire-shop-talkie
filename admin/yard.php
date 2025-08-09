<?php $goto='yard';require 'auth.php';?>
<!DOCTYPE html>
<html lang="ko">
<head>
  <!-- META -->
  <meta charset="utf-8">
  <title>ACME TIRE</title>
  <link rel="icon"href="../public/favicon.ico"/>
  <!-- JS -->
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>
  <script src="src/lib.js?v=12"></script>
  <script src="src/config.js?v=14"></script>
  <script src="src/yard.js?v=17"></script>
  <!-- CSS -->
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@100..900&family=Noto+Serif+KR&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="../public/svg.css?v=13">
  <link rel="stylesheet" href="src/_.css?v=16">
</head>

<body><i id="yard">

<i id="acar">
  <i id="carid">
    <label for="icarid"class="truck svg"></label>
    <input id="icarid"type="text"
      inputmode="numeric"pattern="\d*"
      maxlength="4"autocomplete="off"
    />
  </i>
  <button id="newcar"onclick="window.open(window.location,'_blank')">
    <i class="plusthisoe svg"></i>
  </button>
</i>

<i id="optswrap">

  <template id="opt"><section>
    <i class="selected-item">
      <button class="del"><i class="delete svg"></i></button>
      <i class="menu svg"></i>
      <span>메뉴</span>
    </i>

    <!-- Dynamic `i.step.item` -->

    <!-- Dynamic `i.step.anewtire` -->
    <i class="step newtires"style="display:none">
      <i class="model">
        <label for="imodel">적요 (브랜드＆모델)</label>
        <input id="imodel"class="imodel"type="text">
      </i>
      <i class="size">
        <i class="isize-wrap">
          <label for="isize">사이즈</label>
          <input id="isize"class="isize"type="text"autocomplete="off">
        </i>
        <i class="sizelist"><!-- Dynamic --></i>
      </i>
    </i>

    <i class="step detail"style="display:none">
      <i class="desc"style="display:none">
        <label for="idesc">작업/상품명</label>
        <input id="idesc"class="idesc"type="text"/>
      </i>
      <i class="per"style="display:none">
        <label for="iper">개당가격 (만원)</label>
        <input id="iper"class="iper"type="number"inputmode="decimal"pattern="\d*\.?\d*"autocomplete="off"/>
      </i>
      <i class="minus"style="display:none">
        <label for="iminus">개당 빼는금액 (만원)</label>
        <i class="iminus-wrap">
          <span>마이너스</span>
          <input id="iminus"class="iminus"type="number"inputmode="decimal"pattern="\d*\.?\d*"autocomplete="off"/>
        </i>
      </i>
      <i class="count"style="display:none">
        <label for="icount">수량</label>
        <input id="icount"class="icount"type="number"inputmode="numeric"pattern="\d*"autocomplete="off"/>
      </i>
      <i class="price"style="display:none">
        <label for="iprice">총가격 (만원)</label>
        <input id="iprice"class="iprice"type="number"inputmode="decimal"pattern="\d*\.?\d*"autocomplete="off"/>
      </i>
      <i class="note">
        <label for="inote">비고</label>
        <input id="inote"class="inote"type="text"autocomplete="off"/>
      </i>
    </i>

  </section></template>
</i>

<i id="ttl-wrap"style="display:none">
  <label for="ttl">총액</label>
  <input id="ttl"
    value="0"
    type="number"inputmode="decimal"pattern="\d*\.?\d*"
    autocomplete="off"
  />
</i>

<button id="newopt"style="display:none">
  <i class="plus svg"></i>
</button>

<button id="submit"style="display:none">
  <i class="send svg"></i>
</button>

<i id="backdrop">
  <p>보내는중...</p>
</i>

</i></body>

</html>