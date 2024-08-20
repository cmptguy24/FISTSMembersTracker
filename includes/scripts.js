// Get the list for the Members table and diplays in the Default Members tab area
$.ajax({
    url: 'getMembers.php',
    type: 'GET',
    dataType: 'xml',
    success: function(data) {
        $(data).find('member').each(function() {
            var name = $(this).find('name').text();
            var membershipDate = $(this).find('membershipDate').text();
            var Age = $(this).find('Age').text();
            var registered = $(this).find('registered').text();
            var registrationDate = $(this).find('registrationDate').text();
            var weight = $(this).find('weight').text();
            var numberOfFights = $(this).find('numberOfFights').text();
            var PhoneNumber = $(this).find('PhoneNumber').text();

             var row = '<tr>' +
                '<td>' + name + '</td>' +
                '<td>' + membershipDate + '</td>' +
                '<td>' + Age + '</td>' +
                '<td>' + registered + '</td>' +
                '<td>' + registrationDate + '</td>' +
                '<td>' + weight + '</td>' +
                '<td>' + numberOfFights + '</td>' +
                '<td>' + PhoneNumber + '</td>' +
                '</tr>';

            $('#membersTable tbody').append(row);
        });
    },
    error: function(xhr, status, error) {
        console.error("AJAX request failed: " + status + ", " + error);
    }
});

// Controls the tab clicks
 function openTab(evt, tabName) {
    // Declare all variables
    var i, tabcontent, tablinks;

    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    // Check if the tabName element exists
    var tabElement = document.getElementById(tabName);
    if (tabElement) {
        // Show the current tab, and add an "active" class to the button that opened the tab
        tabElement.style.display = "block";
        evt.currentTarget.className += " active";

        // Save the active tab in localStorage
        localStorage.setItem('activeTab', tabName);
    } else {
        console.error("Tab with ID '" + tabName + "' not found.");
    }
}

// Get the active tab from localStorage and open it. Added for Search tab
document.addEventListener('DOMContentLoaded', function () {
    var activeTab = localStorage.getItem('activeTab');
    if (activeTab) {
        var tabElement = document.getElementById(activeTab);
        if (tabElement) {
            tabElement.style.display = "block";
            var tablinks = document.getElementsByClassName("tablinks");
            for (var i = 0; i < tablinks.length; i++) {
                if (tablinks[i].getAttribute('onclick').includes(activeTab)) {
                    tablinks[i].className += " active";
                    break;
                }
            }
        } else {
            console.error("Tab with ID '" + activeTab + "' not found.");
        }
    } else {
        // If no tab is active, open the default tab
        document.getElementById("defaultOpen").click();
    }
});

// Controls the checkbox and date of membership
document.addEventListener('DOMContentLoaded', function() {
  const checkbox = document.getElementById('checkbox-input');
  if (checkbox) {
    checkbox.addEventListener('change', function() {
      if (this.checked) {
        const today = new Date();
        const day = String(today.getDate()).padStart(2, '0');
        const month = String(today.getMonth() + 1).padStart(2, '0'); // January is 0!
        const year = today.getFullYear();
        const formattedDate = `${month}/${day}/${year}`;
        document.getElementById('membership-input').value = formattedDate;
      } else {
        document.getElementById('membership-input').value = '';
      }
    });
  }
});
// Controls the checkbox2 and date of Registration
document.addEventListener('DOMContentLoaded', function() {
  const checkbox = document.getElementById('checkbox2-input');
  if (checkbox) {
    checkbox.addEventListener('change', function() {
      if (this.checked) {
        const today = new Date();
        const day = String(today.getDate()).padStart(2, '0');
        const month = String(today.getMonth() + 1).padStart(2, '0'); // January is 0!
        const year = today.getFullYear();
        const formattedDate = `${month}/${day}/${year}`;
        document.getElementById('regDate-input').value = formattedDate;
      } else {
        document.getElementById('regDate-input').value = '';
      }
    });
  }
});
// Controls the checkbox3 and date of Registration
document.addEventListener('DOMContentLoaded', function() {
  const checkbox = document.getElementById('checkbox3-input');
  if (checkbox) {
    checkbox.addEventListener('change', function() {
      if (this.checked) {
        const today = new Date();
        const day = String(today.getDate()).padStart(2, '0');
        const month = String(today.getMonth() + 1).padStart(2, '0'); // January is 0!
        const year = today.getFullYear();
        const formattedDate = `${month}/${day}/${year}`;
        document.getElementById('MembershipDate').value = formattedDate;
      } else {
        document.getElementById('MembershipDate').value = '';
      }
    });
  }
});
// Handles the add member function
document.addEventListener('DOMContentLoaded', function() {
  const addButton = document.querySelector('.addMember-button');
  if (addButton) {
    addButton.addEventListener('click', function() {
      const name = document.getElementById('name-input').value;
      const membershipDate = document.getElementById('checkbox-input').checked 
      ? new Date().toLocaleDateString('en-US') 
      : document.getElementById('membership-input').value;
      const age = document.getElementById('age-input').value;
      const registered = document.getElementById('registered-input').value;
      const registrationDate = document.getElementById('regDate-input').value;
      const weight = document.getElementById('weight-input').value;
      const numberOfFights = document.getElementById('fights-input').value;
      const phoneNumber = document.getElementById('phone-input').value;

      // Check if the name is not empty
      if (!name) {
        alert('Opps! Name is required');
        return;
      }

      const data = {
        name: name,
        membershipDate: membershipDate,
        age: age,
        registered: registered,
        registrationDate: registrationDate,
        weight: weight,
        numberOfFights: numberOfFights,
        phoneNumber: phoneNumber
      };

      fetch('insertMember.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
        alert('Member added successfully');
        location.reload(); // Refresh the page
      })
      .catch((error) => {
        console.error('Error:', error);
      });
    });
  }
});

// function to display the phone number input boxes
document.addEventListener('DOMContentLoaded', function () {
    // Handle phone-input formatting
    document.getElementById('phone-input').addEventListener('focus', function () {
        this.placeholder = '';
    });
    document.getElementById('phone-input').addEventListener('blur', function () {
        this.placeholder = '555-555-5555';
    });
    document.getElementById('phone-input').addEventListener('input', function (e) {
        var x = e.target.value.replace(/\D/g, '').match(/(\d{0,3})(\d{0,3})(\d{0,4})/);
        e.target.value = !x[2] ? x[1] : x[1] + '-' + x[2] + (x[3] ? '-' + x[3] : '');
    });

    // Handle PhoneNumber input (if any specific handling is needed)
    document.getElementById('PhoneNumber').addEventListener('focus', function () {
         this.placeholder = '';
    });
    document.getElementById('PhoneNumber').addEventListener('blur', function () {
        this.placeholder = '555-555-5555';
    });
    document.getElementById('PhoneNumber').addEventListener('input', function (e) {
        var x = e.target.value.replace(/\D/g, '').match(/(\d{0,3})(\d{0,3})(\d{0,4})/);
        e.target.value = !x[2] ? x[1] : x[1] + '-' + x[2] + (x[3] ? '-' + x[3] : '');
    });
});

//Controls the highlighting feature of the search row
function highlightRow(row) {
    var rows = document.getElementsByTagName('tr');
    for (var i = 0; i < rows.length; i++) {
        rows[i].style.backgroundColor = ''; // clear previous highlight
    }
    row.style.backgroundColor = 'yellow'; // highlight clicked row

    // Log the row to the console
    console.log('Highlighted Row:', row);

    populateInputs(row); // populate input boxes

    // Get the .search-existing-child2 container
    var container = document.querySelector('.search-existing-child2');

    // Check if the container exists
    if (container) {
        // Set the display property to block
        container.style.display = 'block';
    }
}
// function that populates hidden box to update members info
function populateInputs(row) {
    var cells = row.getElementsByTagName('td');
    var name = row.getAttribute('data-name'); // Get the name from the data attribute

    // Log the cells and name to the console
    console.log('Cells:', cells);
    console.log('Name:', name);

    // Populate the hidden name field
    var nameInput = document.getElementById('Name');
    if (nameInput) {
        nameInput.value = name;
    } else {
        console.error('Element with ID "Name" not found');
    }

    for (var i = 0; i < cells.length; i++) {
        var input;
        switch(i) {
            case 0:
                input = document.getElementById('Name');
                break;
            case 1:
                input = document.getElementById('MembershipDate');
                break;
            case 2:
                input = document.getElementById('Age');
                break;
            case 3:
                input = document.getElementById('Registered');
                break;
            case 4:
                input = document.getElementById('RegistrationDate');
                break;
            case 5:
                input = document.getElementById('Weight');
                break;
            case 6:
                input = document.getElementById('NumberOfFights');
                break;
            case 7:
                input = document.getElementById('PhoneNumber');
                break;
        }
        if (input) {
            input.value = cells[i].innerText;
        } else {
            console.error('Element with ID "' + input.id + '" not found');
        }
    }
}

// fuction that updates the Members table 
function updateRecord() {
    // Get form data
    var formData = {
        Name: document.getElementById('Name').value,
        MembershipDate: document.getElementById('MembershipDate').value,
        Age: document.getElementById('Age').value,
        Registered: document.getElementById('Registered').value,
        RegistrationDate: document.getElementById('RegistrationDate').value,
        Weight: document.getElementById('Weight').value,
        NumberOfFights: document.getElementById('NumberOfFights').value,
        PhoneNumber: document.getElementById('PhoneNumber').value,
        updateAction: document.getElementById('updateAction').value
    };

    // Log form data to console
    console.log('Form Data:', formData);

    // Check if Name is set
    if (!formData.Name) {
        console.error('Name is missing');
        alert('Name is missing. Please ensure the Name field is set correctly.');
        return;
    }

    // Send data to the server using fetch
    fetch('update.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(data => {
        // Log server response to console
        console.log('Server Response:', data);

        if (data.success) {
            alert('Record updated successfully!');
            location.reload(); // Refresh the page
        } else {
            alert('Failed to update record.');
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
}
// Handles the Age updater button click
document.addEventListener('DOMContentLoaded', function() {
    var button = document.querySelector('.AdminDOB-button');
    if (button) {
        button.addEventListener('click', function() {
            var xhr = new XMLHttpRequest();
            xhr.open('POST', 'update_ages.php', true);
            xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            xhr.onreadystatechange = function() {
                if (xhr.readyState === 4 && xhr.status === 200) {
                    alert(xhr.responseText);
                }
            };
            xhr.send('action=updateAges');
        });
    } else {
        console.error('Button not found');
    }
});

document.addEventListener('DOMContentLoaded', function() {
    function parseDate(dateString) {
        const parts = dateString.split('/');
        const month = parts[0].length === 1 ? '0' + parts[0] : parts[0];
        const day = parts[1].length === 1 ? '0' + parts[1] : parts[1];
        const year = parts[2];
        return new Date(`${year}-${month}-${day}`);
    }

function checkMembershipDates(members) {
    const currentDate = new Date();
    const overdueMembers = members.filter(member => {
        const membershipDate = parseDate(member.MembershipDate);
        const diffTime = Math.abs(currentDate - membershipDate);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays > 30;
    });
    return overdueMembers;
}
// Handles the the membership data button click 
async function getMembershipDataFromServer() {
    try {
        const response = await fetch('getMembershipData.php');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
    }
}
async function runMembershipCheck() {
    const membershipData = await getMembershipDataFromServer();
    if (membershipData) {
        // Omit the first 16 members
        const filteredMembershipData = membershipData.slice(16);

        const overdueMembers = checkMembershipDates(filteredMembershipData);
        if (overdueMembers.length > 0) {
            const overdueList = `The following memberships are overdue:<br>${overdueMembers.map(member => `${member.Name} (Membership expired on: ${member.MembershipDate})`).join('<br>')}`;
            document.getElementById('overdueList').innerHTML = overdueList;
            showModal();
        } else {
            alert('No memberships are overdue.');
        }
    }
}

// Displays list of overdue members greater than 1 month
function showModal() {
    const modal = document.getElementById('overdueModal');
    const span = document.getElementsByClassName('close')[0];
    const exportButton = document.getElementById('exportButton');

    modal.style.display = 'block';

    span.onclick = function() {
        modal.style.display = 'none';
    }

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    }

    exportButton.onclick = function() {
        exportOverdueList();
    }
}
// Handles export of overdue members list into a printable text format
function exportOverdueList() {
    const overdueList = document.getElementById('overdueList').innerText;
    const blob = new Blob([overdueList], { type: 'text/plain;charset=utf-8' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'overdue_memberships.txt';
    link.click();
}

document.querySelector('.MemberCheck-button').addEventListener('click', runMembershipCheck);
});




