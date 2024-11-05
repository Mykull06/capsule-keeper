//JavaScript for Date Fun Facts

// Function to fetch fact about the specified date
function getFunFact() {
    // Get values from input fields
    const month = document.getElementById('month').value;
    const day = document.getElementById('day').value;

    // Check if values are valid
    if (!month || !day || month < 1 || month > 12 || day < 1 || day > 31) {
        alert("Please enter a valid month (1-12) and day (1-31).");
        return;
    }

    // URL for Numbers API with date format
    const apiUrl = `http://numbersapi.com/${month}/${day}/date`;

    // Getting the fact
    fetch(apiUrl)
        .then(response => response.text())
        .then(fact => {
            // Display the fact in the factContainer div
            const factContainer = document.getElementById('factContainer');
            factContainer.innerHTML = `<p>${fact}</p>`;
        })
        .catch(error => {
            console.error("Error fetching the fun fact:", error);
            alert("Sorry, something went wrong. Please try again later.");
        });
}

// Event listener for the button to fetch and display the fact
document.getElementById('getFactButton').addEventListener('click', getFunFact);
