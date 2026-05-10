const

// yard
options={
  newtire:'새 타이어',
  oldtire:'중고 타이어',
  punk:'펑크',
  mounting:'탈/부착',
  alignment:'얼라인먼트',
  newwheel:'신품 휠',
  oldwheel:'중고 휠',
  // storing:'보관 등록',
  buyin:'매입',
  discount:'할인',
  others:'기타',
},
checks={
  isPassengerCar:'승용차',
  // priceCheckNeeded:'기존단가확인필요 같은가격',
  addon:'(추가)',
  pressure:'전체공기압',
},

// options
/** PRICE */
PN = '.alignment',
/** COUNT */
CN = '.storing',
/** COUNT + PRICE */
CP = '.mounting,.punk',
/** PRICE + unitPRICE + COUNT */
PUC = '.oldtire,.oldwheel',


// accountance
/** <th> */
columns={
  select:'<input type="checkbox" id="selall">',
  time:'시간',
  carid:'차번호',
  ttl:'총액',
  desc:'구분/품목',
  per:'단가',
  count:'수량',
  price:'금액',
  note:'비고',
},


// TIRES
TIRESIZES=['385','12R','295','315','245','425','445','205','215','225','235','265','275','285','9.5R','11R',],

// WHEELS
WHEELSIZES=['1300','1175','900','825','750','675',],
is225=['1300','1175','900','825',],
is195=['750','675',],
WHEELcbs={
  polished:['유광','무광'],
  hole:['26mm','32mm',]
}