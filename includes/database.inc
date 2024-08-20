<?php
// Database connection and query functions
function connectToDatabase() {
    $dbPath = 'C:\xampp\htdocs\FISTSMembersTrackerPHP\SQLiteDB\FISTSMembers.db';

    try {
        $db = new PDO('sqlite:' . $dbPath);
    } catch (PDOException $e) {
        die("Connection failed: " . $e->getMessage());
    }

    return $db;
}

function Query($strQuery) {
    $db = connectToDatabase();   
    $result = $db->query($strQuery);

    if ($result === false) {
        die("Query failed: " . $db->errorInfo()[2]);
    }

    return $result;
}

function updateMember($data) {
    // Database connection
    $db = new SQLite3('C:/xampp/htdocs/FISTSMembersTrackerPHP/SQLiteDB/FISTSMembers.db');

    // Prepare the SQL update statement
    $stmt = $db->prepare('UPDATE members SET MembershipDate = :MembershipDate, Age = :Age, Registered = :Registered, RegistrationDate = :RegistrationDate, Weight = :Weight, NumberOfFights = :NumberOfFights, PhoneNumber = :PhoneNumber WHERE Name = :Name');

    // Bind parameters
    $stmt->bindValue(':Name', $data['Name'], SQLITE3_TEXT);
    $stmt->bindValue(':MembershipDate', $data['MembershipDate'], SQLITE3_TEXT);
    $stmt->bindValue(':Age', $data['Age'], SQLITE3_INTEGER);
    $stmt->bindValue(':Registered', $data['Registered'], SQLITE3_TEXT);
    $stmt->bindValue(':RegistrationDate', $data['RegistrationDate'], SQLITE3_TEXT);
    $stmt->bindValue(':Weight', $data['Weight'], SQLITE3_INTEGER);
    $stmt->bindValue(':NumberOfFights', $data['NumberOfFights'], SQLITE3_INTEGER);
    $stmt->bindValue(':PhoneNumber', $data['PhoneNumber'], SQLITE3_TEXT);

    // Execute the statement
    $result = $stmt->execute();

    return $result ? true : false;
}
// Does a check to match date of birth to Age column, updates accordingly 
function updateAges($db) {
    $query = "SELECT ID, DateOfBirth, Age FROM Members";
    $result = $db->query($query);

    while ($row = $result->fetchArray(SQLITE3_ASSOC)) {
        if (!isset($row['ID'])) {
            echo "ID not found for row: " . json_encode($row);
            continue;
        }

        $dob = DateTime::createFromFormat('m/d/Y', $row['DateOfBirth']);
        if (!$dob) {
            // Handle invalid date format
            echo "Invalid date format for ID: " . $row['ID'];
            continue;
        }

        $now = new DateTime();
        $age = $now->diff($dob)->y;

        // Check if the birthday has passed this year
        $currentYearBirthday = DateTime::createFromFormat('m/d/Y', $dob->format('m/d/') . $now->format('Y'));
        if ($now < $currentYearBirthday) {
            $age--;
        }

        // Only update if the birthday has passed this year and the age has changed
        if ($now >= $currentYearBirthday && $row['Age'] != $age) {
            $updateQuery = "UPDATE Members SET Age = :age WHERE ID = :id";
            $stmt = $db->prepare($updateQuery);
            $stmt->bindValue(':age', $age, SQLITE3_INTEGER);
            $stmt->bindValue(':id', $row['ID'], SQLITE3_INTEGER);
            $stmt->execute();
        }
    }

    echo "Ages updated successfully.";
}

// Does a check on membership status
function getMembershipData($db) {
    $results = $db->query('SELECT Name, MembershipDate FROM Members');
    $members = [];
    while ($row = $results->fetchArray(SQLITE3_ASSOC)) {
        $members[] = $row;
    }
    return $members;
}


?>

