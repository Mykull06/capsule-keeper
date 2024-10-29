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

//Choose files button logic
document.getElementById('imageUpload').addEventListener('change', function(event) {
    const files = event.target.files;
    const previewContainer = document.getElementById('imagePreview');
    previewContainer.innerHTML = '';


    Array.from(files).forEach(file => {
      const reader = new FileReader();
      reader.onload = function(e) {
        const img = document.createElement('img');
        img.src = e.target.result;
        img.classList.add('w-full', 'h-auto');
        previewContainer.appendChild(img);
      };
      reader.readAsDataURL(file);
    });
  });


  document.getElementById('submitBtn').addEventListener('click', function() {
    const images = document.getElementById('imagePreview').innerHTML;
    const caption = document.getElementById('captionInput').value;


    // Save the images and caption to the website
    // This is a placeholder for the actual save functionality
    console.log('Images:', images);
    console.log('Caption:', caption);
  });