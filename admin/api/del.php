<?php $goto='accountance';require '../auth.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
  http_response_code(405); die;
}
header('Content-Type: application/json');

// Get raw data
$input = file_get_contents('php://input');
$data = json_decode($input, true);
// If not JSON
if($data === null){
  $data = $_POST;
}
// Validate data
$ids = array_filter($data['rows'], 'is_numeric');
if(empty($ids)){
  http_response_code(400);
  echo json_encode(['error' => 'No valid rows provided']); die;
}

$insu = mysqli_connect(getenv('DB_HOSTNAME'),getenv('DB_USERNAME'),getenv('DB_PASSWORD'),getenv('DB_DATABASE'));
$tab = getenv('DB_TABLE');

$placeholders = implode(',', array_fill(0, count($ids), '?'));

$stmt = $insu->prepare("DELETE FROM `$tab` WHERE `no` IN ($placeholders)");
$types = str_repeat('i', count($ids));
$stmt->bind_param($types, ...$ids);
if($stmt->execute()){
  echo json_encode([
    'success' => true,
    'message' => $stmt->affected_rows . 'rows deleted',
  ]);
}else{
  http_response_code(500);
  echo json_encode(['error' => 'Failed to delete data']);
  die;
}