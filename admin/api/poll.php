<?php $goto='yard';require '../auth.php';

if(!isset($_GET['unix'])){
  http_response_code(400); die;
}

$insu = mysqli_connect(getenv('DB_HOSTNAME'),getenv('DB_USERNAME'),getenv('DB_PASSWORD'),getenv('DB_DATABASE'));
$tab = getenv('DB_TABLE');

$unix = intval($_GET['unix']);

$stmt = $insu->prepare(
  "SELECT ctnt,`no` FROM $tab WHERE dt > ? ORDER BY `no` DESC LIMIT 500"
);
$stmt->bind_param("i", $unix);
$stmt->execute();
$stmt->store_result();

$data = [];
$stmt->bind_result($ctnt, $no);
while ($stmt->fetch()) {
  $row = json_decode($ctnt, true);
  $row['row'] = $no;
  $data[] = $row;
}

header('Content-Type: application/json');
echo json_encode($data);