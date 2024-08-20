
<!DOCTYPE html>
<html>
<head>

<link rel="stylesheet" type="text/css" href="includes/styles.css">
<meta name="viewport" content="width=device-width, initial-scale=1"> 

    <!-- Added AJAX jquery for SQL help -->
   <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
  <script src="includes/scripts.js"></script>

</head>

<body>
    <div class="header">
        <div class="top-bar">
            <img src="FISTS.png" alt="FISTS Logo"> 
            <div class="centered-text">FISTS Member Tracker</div>
        </div>
  
    <div class="tab">
        <button class="tablinks" onclick="openTab(event, 'AddNew')" id="defaultOpen">Add New</button>
        <button class="tablinks" onclick="openTab(event, 'Members')" id="membersButton">Members</button>
        <button class="tablinks" onclick="openTab(event, 'SearchExisting')">Search Existing</button>
        <button class="tablinks admin-tab" onclick="openTab(event, 'Admin')">Admin</button>
    </div>

    </div>
   <div class="content"> 
    </div>

<div class="form-container">
   
   <!----------------- Default Members tab area ----------------->
    <div id="Members" class="tabcontent">
           <table id="membersTable" border="1">
        <thead>
            <tr>
                <th>Name</th>
                <th>Membership Date</th>
                <th>Age</th>
                <th>Registered</th>
                <th>Registration Date</th>
                <th>Weight</th>
                <th>Number of Fights</th>
                <th>Phone Number</th>
            </tr>
        </thead>
        <tbody>
            <!-- Rows will be appended here by scripts.js -->
        </tbody>
    </table>

    </div>
  
  <!----------------- Add New members tab area ----------------->
        <div id="AddNew" class="tabcontent">
       <form>      
        <label for="name-input">Name:</label>
        <input type="text" id="name-input" name="nameInput">
           
           <div class="form-group">
            <label for="membership-input">Membership date:</label>
            <input type="checkbox" id="checkbox-input" name="checkboxInput"> 
            <label for="check-input" style="font-size: 14px; font-weight: normal;">Use today's date?</label>
          </div>
        <input type="text" id="membership-input" name="membershipInput">

        <label for="age-input">Age:</label>
        <input type="text" id="age-input" name="ageInput">
    
        <label for="registered-input">Registered:</label>
         <select id="registered-input" name="registeredInput">
          <option value="no">No</option>
          <option value="yes">Yes</option>
         </select>
            <div class="form-group">
        <label for="regDate-input">Registration Date:</label>
        <input type="checkbox" id="checkbox2-input" name="checkbox2Input">
        <label for="check-input" style="font-size: 14px; font-weight: normal;">Use today's date?</label>
        </div>
        <input type="text" id="regDate-input" name="regDateInput">
         
        <label for="weight-input">Weight:</label>
        <input type="text" id="weight-input" name="weightInput">

        <label for="fights-input">Number Of Fights:</label>
        <input type="text" id="fights-input" name="fightsInput">

        <label for="phone-input">Phone Number:</label>
         <input type="text" id="phone-input" name="phoneInput" placeholder="555-555-5555" pattern="\d{3}-\d{3}-\d{4}" required>
        <div class="button-row">
          <button type="button" class="addMember-button">Add Member</button>
        
        </form> 
    </div>
</div>
 <!----------------- Search Existing tab area ----------------->
<?php
// Database connection
$dbPath = 'C:\xampp\htdocs\FISTSMembersTrackerPHP\SQLiteDB\FISTSMembers.db';
$db = new PDO('sqlite:' . $dbPath);

// Define the range parameters
$ageRange = 3; // +/- 3 years
$weightRange = 10; // +/- 10 lbs

// Check if the form is submitted
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $searchInput = trim($_POST['searchInput']);

    // Check if the search input is numeric
    if (is_numeric($searchInput)) {
        // Calculate the age and weight ranges based on the input
        $ageMin = $searchInput - $ageRange;
        $ageMax = $searchInput + $ageRange;
        $weightMin = $searchInput - $weightRange;
        $weightMax = $searchInput + $weightRange;

        // Prepare the SQL query for numeric input
        $stmt = $db->prepare("
            SELECT * FROM members 
            WHERE (Age BETWEEN :ageMin AND :ageMax) 
            OR (Weight BETWEEN :weightMin AND :weightMax)
        ");
        $stmt->bindValue(':ageMin', $ageMin, PDO::PARAM_INT);
        $stmt->bindValue(':ageMax', $ageMax, PDO::PARAM_INT);
        $stmt->bindValue(':weightMin', $weightMin, PDO::PARAM_INT);
        $stmt->bindValue(':weightMax', $weightMax, PDO::PARAM_INT);
    } else {
        // Prepare the SQL query for name input
        $stmt = $db->prepare("
            SELECT * FROM members 
            WHERE Name LIKE :searchInput
        ");
        $stmt->bindValue(':searchInput', '%' . $searchInput . '%', PDO::PARAM_STR);
    }

    $stmt->execute();

    // Fetch the results
    $results = $stmt->fetchAll(PDO::FETCH_ASSOC);
}
?>
<div id="SearchExisting" class="tabcontent">
    <div class="search-existing-container">
        <div class="search-existing-child1">
            <form id="searchForm" method="post" action="">
                <div class="search-group">
                    <label for="search">Search Member, Age Range or by Weight Range:</label>
                    <input type="text" id="search" name="searchInput">
                </div>
                <div class="button-search">
                    <button type="submit" class="search-button">Search</button>
                </div>
            </form>

            <h1 id="search-results">Search Results</h1>

            <?php if (isset($results) && count($results) > 0) : ?>
                <table border="1">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Membership Date</th>
                            <th>Age</th>
                            <th>Registered</th>
                            <th>Registration Date</th>
                            <th>Weight</th>
                            <th>Number Of Fights</th>
                            <th>Phone Number</th>
                        </tr>
                    </thead>
                    <tbody>
                        <?php foreach ($results as $row) : ?>
                            <tr onclick="highlightRow(this)" data-name="<?php echo htmlspecialchars($row['Name']); ?>">
                                <td><?php echo htmlspecialchars($row['Name']); ?></td>
                                <td><?php echo htmlspecialchars($row['MembershipDate']); ?></td>
                                <td><?php echo htmlspecialchars($row['Age']); ?></td>
                                <td><?php echo htmlspecialchars($row['Registered']); ?></td>
                                <td><?php echo htmlspecialchars($row['RegistrationDate']); ?></td>
                                <td><?php echo htmlspecialchars($row['Weight']); ?></td>
                                <td><?php echo htmlspecialchars($row['NumberOfFights']); ?></td>
                                <td><?php echo htmlspecialchars($row['PhoneNumber']); ?></td>
                            </tr>
                        <?php endforeach; ?>
                    </tbody>
                </table>
            <?php else : ?>
                <p>No results found.</p>
            <?php endif; ?>
        </div>

            <div class="search-existing-child2">
        <form id="updateForm" onsubmit="return false;">
            <h2 id="Update">Modify the fields to update.</h2>
            <input type="text" id="Name" name="Name" readonly/>
            <input type="text" id="MembershipDate" name="MembershipDate" />
            <input type="text" id="Age" name="Age" />
            <input type="text" id="Registered" name="Registered" />
            <input type="text" id="RegistrationDate" name="RegistrationDate" />
            <input type="text" id="Weight" name="Weight" />
            <input type="text" id="NumberOfFights" name="NumberOfFights" />
            <input type="text" id="PhoneNumber" name="PhoneNumber" />
            <input type="hidden" id="updateAction" name="updateAction" value=""/>
            <div class="button-search">
                <button type="button" class="search-Update" name="search-Update" onclick="updateRecord()">Update</button>
            <input type="checkbox" id="checkbox3-input" name="checkbox3Input">
            <label for="check-inputSearch" style="font-size: 14px; font-weight: normal;">Update Membership?</label>
            </div>
        </form>
    </div>
    </div>
</div>
<!----------------- Admin tab area ----------------->

<div id="Admin" class="tabcontent">
    <div class="button-searchAdmin">
        <div class="button-pair">
            <label for="AdminBODUpdate">Run the age updater?:</label>
            <button type="button" class="AdminDOB-button">Update Ages</button>
        </div>
        <div class="button-pair">
            <label for="MembershipCheck">Run the MemberShip Checker?:</label>
            <button type="button" class="MemberCheck-button">Check Members</button>
        </div>
    </div>
</div>

<!-- Modal HTML that formats overdue memberships -->
<div id="overdueModal" class="modal">
    <div class="modal-content">
        <span class="close">&times;</span>
        <p id="overdueList"></p>
        <button id="exportButton" class="search-button">Export</button>
    </div>
</div>

</body>
    
</html>