<?php
// Database connection
$dbPath = 'C:\xampp\htdocs\FISTSMembersTrackerPHP\SQLiteDB\FISTSMembers.db';
$db = new PDO('sqlite:' . $dbPath);

// Prepare the SQL query
$stmt = $db->prepare("SELECT * FROM members");
$stmt->execute();

// Fetch the results
$results = $stmt->fetchAll(PDO::FETCH_ASSOC);

// Create XML document
$xml = new SimpleXMLElement('<members/>');

foreach ($results as $row) {
    $member = $xml->addChild('member');
    $member->addChild('name', htmlspecialchars($row['Name']));
    $member->addChild('membershipDate', htmlspecialchars($row['MembershipDate']));
    $member->addChild('Age', htmlspecialchars($row['Age']));
    $member->addChild('registered', htmlspecialchars($row['Registered']));
    $member->addChild('registrationDate', htmlspecialchars($row['RegistrationDate']));
    $member->addChild('weight', htmlspecialchars($row['Weight']));
    $member->addChild('numberOfFights', htmlspecialchars($row['NumberOfFights']));
    $member->addChild('PhoneNumber', htmlspecialchars($row['PhoneNumber']));
}

// Set the content type to XML
header('Content-Type: application/xml');

// Print the XML
echo $xml->asXML();
?>
