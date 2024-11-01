document.addEventListener('DOMContentLoaded', () => {
    const openModalButton = document.getElementById('create-new-content');
    const modal = document.getElementById('modal');
    const closeModalButton = document.getElementById('close-modal');

    // Open the modal
    openModalButton.addEventListener('click', () => {
        modal.style.display = 'block';
    });

    // Close the modal when the close button is clicked
    closeModalButton.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    // Close the modal if the user clicks outside of it
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
});

// Event listener for when the file input changes (i.e., when images are uploaded)
document.getElementById('imageUpload').addEventListener('change', function(event) {
    // Get the files from the input element
    const files = event.target.files;
    // Select the preview container
    const previewContainer = document.getElementById('imagePreview');
    // Clear any existing content in the preview container
    previewContainer.innerHTML = '';

    // Iterate over each file selected by the user
    Array.from(files).forEach(file => {
        // Create a FileReader object to read the file data
        const reader = new FileReader();

        // Define what happens when the file is read
        reader.onload = function(e) {
            // Create a new image element
            const img = document.createElement('img');
            // Set the source of the image to the Base64 data read from the file
            img.src = e.target.result;
            // Add CSS classes to style the image
            img.classList.add('w-full', 'h-auto');
            // Append the image to the preview container
            previewContainer.appendChild(img);
            // Call the function to save the image data to local storage
            saveImageToLocalStorage(e.target.result);
        };
        // Read the file as a data URL
        reader.readAsDataURL(file);
    });
});

// Function to save images to local storage
function saveImageToLocalStorage(imageData) {
    // Retrieve existing images from local storage and parse them as an array
    const existingImages = JSON.parse(localStorage.getItem('images')) || [];
    // Add the new image data to the existing images array
    existingImages.push(imageData);
    // Convert the updated images array back to a string and save it to local storage
    localStorage.setItem('images', JSON.stringify(existingImages));
}

// Function to load images from local storage and display them on page load
function loadImagesFromLocalStorage() {
    // Retrieve existing images from local storage and parse them as an array
    const existingImages = JSON.parse(localStorage.getItem('images')) || [];
    // Select the preview container where images will be displayed
    const previewContainer = document.getElementById('imagePreview');
    
    // Iterate over each image data retrieved from local storage
    existingImages.forEach(imageData => {
        // Create a new image element for each stored image
        const img = document.createElement('img');
        // Set the source of the image to the Base64 data
        img.src = imageData;
        // Add CSS classes to style the image
        img.classList.add('w-full', 'h-auto');
        // Append the image to the preview container
        previewContainer.appendChild(img);
    });
}

// Call the function to load images from local storage when the page loads
window.onload = loadImagesFromLocalStorage;
// Add an event listener to the submit button for when it is clicked
document.getElementById('submitBtn').addEventListener('click', function() {
    // Retrieve the inner HTML of the preview container (this contains the images)
    const images = document.getElementById('imagePreview').innerHTML;

    // Get the value of the caption input field
    const caption = document.getElementById('captionInput').value;

    // Placeholder to save the images and caption to the website
    console.log('Images:', images); // Log the HTML of the images for debugging
    console.log('Caption:', caption); // Log the caption for debugging
});

 // Select the input and button elements
 const submitButton = document.getElementById('submitBtnText');
 const captionInput = document.getElementById('captionInput');
 const memoryContainer = document.getElementById('memoryContainer');

 // Load saved memories from localStorage when the page loads
 window.addEventListener('DOMContentLoaded', loadMemoriesFromLocalStorage);

 // Add event listener to submit button
 submitButton.addEventListener('click', () => {
     // Get the value from the input
     const memoryText = captionInput.value;

     // Create a new memory div if there's text
     if (memoryText) {
         addMemory(memoryText);

         // Save the memory to localStorage
         saveMemoryToLocalStorage(memoryText);

         // Clear the input field after submitting
         captionInput.value = '';
     }
 });

 // Function to create and add a memory element to the DOM
 function addMemory(text) {
     const newMemoryDiv = document.createElement('div');
     newMemoryDiv.classList.add('memory-item');
     newMemoryDiv.textContent = text;
     memoryContainer.appendChild(newMemoryDiv);
 }

 // Save a memory to localStorage
 function saveMemoryToLocalStorage(text) {
     const memories = JSON.parse(localStorage.getItem('memories')) || [];
     memories.push(text);
     localStorage.setItem('memories', JSON.stringify(memories));
 }

 // Load memories from localStorage
 function loadMemoriesFromLocalStorage() {
     const memories = JSON.parse(localStorage.getItem('memories')) || [];
     memories.forEach(memory => addMemory(memory));
 }