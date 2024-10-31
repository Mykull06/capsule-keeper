document.addEventListener('DOMContentLoaded', () => {
    const openModalButton = document.getElementById('create-new-content');
    const modal = document.getElementById('modal');
    const closeModalButton = document.getElementById('close-modal');
    const imageUpload = document.getElementById('imageUpload');
    const imagePreview = document.getElementById('imagePreview');
    const submitButton = document.getElementById('submitBtn'); // Use consistent casing

// test

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

    // Close the modal when the submit button is clicked
    submitButton.addEventListener('click', () => {
        modal.style.display = 'none';
        // Optionally, handle form submission logic here
    });

    // Handle image upload
    imageUpload.addEventListener('change', (event) => {
        const files = event.target.files;
        imagePreview.innerHTML = ''; // Clear previous previews

        Array.from(files).forEach(file => {
            const reader = new FileReader();

            reader.onload = (e) => {
                const imgContainer = document.createElement('div');
                imgContainer.classList.add('img-container');

                const img = document.createElement('img');
                img.src = e.target.result;
                imgContainer.appendChild(img);

                // Create a description input
                const descriptionInput = document.createElement('input');
                descriptionInput.type = 'text';
                descriptionInput.placeholder = 'Describe this image';
                imgContainer.appendChild(descriptionInput);

                imagePreview.appendChild(imgContainer);
            };

            reader.readAsDataURL(file);
        });
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
    // (You would typically make an API call here or update the UI accordingly)
    console.log('Images:', images); // Log the HTML of the images for debugging
    console.log('Caption:', caption); // Log the caption for debugging
});
// Function to save caption to local storage
function saveCaptionToLocalStorage(caption) {
    // Save the caption to local storage
    localStorage.setItem('caption', caption);
}

// Function to load caption from local storage and display it on page load
function loadCaptionFromLocalStorage() {
    // Retrieve the caption from local storage
    const caption = localStorage.getItem('caption');
    // If a caption exists, set it to the caption input field
    if (caption) {
        document.getElementById('captionInput').value = caption;
    }
}

// Call the function to load the caption from local storage when the page loads
window.onload = function() {
    loadImagesFromLocalStorage();
    loadCaptionFromLocalStorage();
};

// Update the submit button event listener to save the caption to local storage
document.getElementById('submitBtn').addEventListener('click', function() {
    // Retrieve the inner HTML of the preview container (this contains the images)
    const images = document.getElementById('imagePreview').innerHTML;

    // Get the value of the caption input field
    const caption = document.getElementById('captionInput').value;

    // Save the caption to local storage
    saveCaptionToLocalStorage(caption);

    // Placeholder to save the images and caption to the website
    // (You would typically make an API call here or update the UI accordingly)
    console.log('Images:', images); // Log the HTML of the images for debugging
    console.log('Caption:', caption); // Log the caption for debugging
});