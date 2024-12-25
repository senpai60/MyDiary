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

// AutoSuggetions
// document.addEventListener("DOMContentLoaded", function () {
//     const myTextarea = document.getElementById("content");
//     const awesompleteInstance = new Awesomplete(myTextarea, {
//       minChars: 1,
//       autoFirst: true,
//       maxItems: 5,
//     });
  
//     let debounceTimeout;
  
//     // Listen for input events and update the suggestions
//     myTextarea.addEventListener("input", function () {
//       clearTimeout(debounceTimeout); // Clear any ongoing debounce timeout
  
//       debounceTimeout = setTimeout(function () {
//         const query = myTextarea.value;
  
//         // If query is empty, no need to show suggestions
//         if (query === "") {
//           awesompleteInstance.list = [];
//           return;
//         }
  
//         // Fetch suggestions from the backend
//         fetch(`/suggestions?query=${query}`)
//           .then((response) => response.json())
//           .then((data) => {
//             // Update Awesomplete's suggestion list with new data
//             awesompleteInstance.list = data;
//           })
//           .catch((err) => {
//             console.error("Error fetching suggestions:", err);
//           });
//       }, 300); // Debounce for smoother typing experience
//     });
  
//     // Handle space or word selection
//     myTextarea.addEventListener("keyup", function (e) {
//       const query = myTextarea.value;
  
//       // Reset list when space is pressed or text is cleared
//       if (query.endsWith(" ") || query.length === 0) {
//         awesompleteInstance.list = []; // Reset list after space to prevent extra suggestions
//       }
//     });
  
//     // Listen for when a suggestion is selected
//     myTextarea.addEventListener("awesomplete-selectcomplete", function () {
//       const query = myTextarea.value;
  
//       // Clear the suggestions when a word is selected
//       awesompleteInstance.list = [];
  
//       // If the input ends with space, it means the user is ready to type again
//       if (query.endsWith(" ")) {
//         // Reset suggestions to start fresh after a word is typed
//         awesompleteInstance.list = [];
//       } else {
//         // Focus the input to keep suggestions available for the next word
//         myTextarea.focus();
//       }
//     });
//   });
  