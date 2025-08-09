<?php
$goto='accountance';require '../auth.php';

if(!isset($_GET['from'])){
  http_response_code(400); die;
}

$insu = mysqli_connect(getenv('DB_HOSTNAME'),getenv('DB_USERNAME'),getenv('DB_PASSWORD'),getenv('DB_DATABASE'));
$tab = getenv('DB_TABLE');

$from = intval($_GET['from']);
$limitDays = isset($_GET['dur']) ? intval($_GET['dur']) : 1;
$to = $from + ($limitDays * 86400);

$stmt = $insu->prepare(
  "SELECT ctnt FROM $tab WHERE dt > ? AND dt < ? ORDER BY `no` DESC LIMIT 500"
);
$stmt->bind_param("ii", $from, $to);
$stmt->execute();
$stmt->store_result();

$data = [];
$stmt->bind_result($ctnt);
while ($stmt->fetch()) {
  $data[] = json_decode($ctnt);
}

header('Content-Type: application/json');
echo json_encode($data);