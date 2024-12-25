const sideContentContainer = document.querySelector('.main-side');
const addButtons = document.querySelectorAll('.dlt-add'); // Select all initial 'add' buttons

const MAX_DIVS = 3; // Maximum number of divs

// Function to create a new `.side-content` div
function createSideContentDiv() {
  const newDiv = document.createElement('div');
  newDiv.classList.add('side-content');
  newDiv.innerHTML = `
    <input
      type="text"
      name="sidecontent"
      id="sidecontent"
      placeholder="Add Side Content"
    />
    <div class="dlt-add">
      <i class="ri-subtract-fill"></i> <!-- Remove Icon -->
    </div>
  `;

  // Add a listener to the remove button inside the new div
  const removeButton = newDiv.querySelector('.dlt-add');
  removeButton.addEventListener('click', () => {
    const currentDivCount = sideContentContainer.querySelectorAll('.side-content').length;

    if (currentDivCount > 1) {
      // Allow removing only if there's more than one div
      newDiv.remove();

      // Reset the `add` button if the count falls below the max
      const addButton = sideContentContainer.querySelector('.dlt-add i.ri-subtract-fill');
      if (addButton && currentDivCount - 1 < MAX_DIVS) {
        addButton.classList.replace('ri-subtract-fill', 'ri-add-fill');
      }
    }
  });

  return newDiv;
}

// Attach event listeners to all existing `add` buttons
addButtons.forEach((addButton) => {
  addButton.addEventListener('click', () => {
    const currentDivCount = sideContentContainer.querySelectorAll('.side-content').length;

    if (currentDivCount < MAX_DIVS) {
      // Add a new div if under the max limit
      const newDiv = createSideContentDiv();
      sideContentContainer.appendChild(newDiv);

      // If max is reached, toggle the current add button to remove
      if (currentDivCount + 1 === MAX_DIVS) {
        addButton.querySelector('i').classList.replace('ri-add-fill', 'ri-subtract-fill');
      }
    }
  });
});

// Ensure at least one div exists on page load
if (sideContentContainer.querySelectorAll('.side-content').length === 0) {
  const initialDiv = createSideContentDiv();
  sideContentContainer.appendChild(initialDiv);
}
