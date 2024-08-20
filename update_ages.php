<?php
include 'includes/database.inc';

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['action']) && $_POST['action'] === 'updateAges') {
    $db = new SQLite3('C:/xampp/htdocs/FISTSMembersTrackerPHP/SQLiteDB/FISTSMembers.db');
    updateAges($db);
}
?>
