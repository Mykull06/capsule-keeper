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
