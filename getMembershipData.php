<?php
include 'includes/database.inc';

$db = new SQLite3('C:/xampp/htdocs/FISTSMembersTrackerPHP/SQLiteDB/FISTSMembers.db');
$members = getMembershipData($db);

header('Content-Type: application/json');
echo json_encode($members);

?>