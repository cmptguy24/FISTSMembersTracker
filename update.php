<?php
include 'includes/database.inc';

// Get the JSON data from the request
$data = json_decode(file_get_contents('php://input'), true);

// Log the received data
error_log('Received Data: ' . print_r($data, true));

$response = array();
if (updateMember($data)) {
    $response['success'] = true;
} else {
    $response['success'] = false;
}

// Log the response
error_log('Response: ' . print_r($response, true));

// Send response back to the client
echo json_encode($response);
?>
