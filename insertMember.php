<?php
function connectToDatabase() {
    $dbPath = 'C:\xampp\htdocs\FISTSMembersTrackerPHP\SQLiteDB\FISTSMembers.db';

    try {
        $db = new PDO('sqlite:' . $dbPath);
    } catch (PDOException $e) {
        die("Connection failed: " . $e->getMessage());
    }

    return $db;
}

function insertMember($name, $membershipDate, $age, $registered, $registrationDate, $weight, $numberOfFights, $phoneNumber) {
    $db = connectToDatabase();
    $sql = 'INSERT INTO Members (Name, MembershipDate, Age, Registered, RegistrationDate, Weight, NumberOfFights, PhoneNumber) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
    $stmt = $db->prepare($sql);
    $stmt->execute([$name, $membershipDate, $age, $registered, $registrationDate, $weight, $numberOfFights, $phoneNumber]);

    if ($stmt === false) {
        die("Insertion failed: " . $db->errorInfo()[2]);
    }

    return true;
}

// Handle the AJAX request
$data = json_decode(file_get_contents('php://input'), true);

$name = $data['name'];
$membershipDate = $data['membershipDate'];
$age = $data['age'];
$registered = $data['registered'];
$registrationDate = $data['registrationDate'];
$weight = $data['weight'];
$numberOfFights = $data['numberOfFights'];
$phoneNumber = $data['phoneNumber'];

// Check if the name is not empty
if (empty($name)) {
    echo json_encode(['success' => false, 'message' => 'Name is required']);
    exit;
}

if (insertMember($name, $membershipDate, $age, $registered, $registrationDate, $weight, $numberOfFights, $phoneNumber)) {
    echo json_encode(['success' => true]);
} else {
    echo json_encode(['success' => false]);
}

?>
