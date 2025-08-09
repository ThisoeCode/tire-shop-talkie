<?php $goto='yard';require '../auth.php';

header('Content-Type: application/json');
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
  http_response_code(405); die;
}

// Get raw data
$input = file_get_contents('php://input');
$data = json_decode($input, true);
// If not JSON
if($data === null){
  $data = $_POST;
}

// Validate data and require 'dt'
if(empty($data) || $data === null || !isset($data['dt'])){
  http_response_code(400); die;
}

$insu = mysqli_connect(getenv('DB_HOSTNAME'),getenv('DB_USERNAME'),getenv('DB_PASSWORD'),getenv('DB_DATABASE'));
$tab = getenv('DB_TABLE');

$now = new DateTime("now", new DateTimeZone('Asia/Seoul'));

// mysqli
$stmt = $insu->prepare(
  "INSERT INTO $tab (dt,ctnt,`auto_datetime`) VALUES (?,?,?)"
);
$ctnt = json_encode($data);
$auto_dt = $now->format('Y-m-d H:i:s');
$stmt->bind_param("iss",
  $data['dt'],$ctnt,$auto_dt
);
if($stmt->execute()){
  echo json_encode([
    'success' => true,
    'message' => 'Data saved successfully',
  ]);
}else{
  http_response_code(500);
  echo json_encode(['error' => 'Failed to save data']);
  die;
}