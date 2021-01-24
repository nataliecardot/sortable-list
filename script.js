const draggable_list = document.getElementById('draggable-list');
const check = document.getElementById('check');

const richestPeople = [
  'Jeff Bezos',
  'Bill Gates',
  'Warren Buffett',
  'Bernard Arnault',
  'Carlos Slim Helu',
  'Amancio Ortega',
  'Larry Ellison',
  'Mark Zuckerberg',
  'Michael Bloomberg',
  'Larry Page',
];

// Store listitems
const listItems = [];

let dragStartIndex;

createList();

// Insert list items into DOM
function createList() {
  // Copy array with spread syntax
  [...richestPeople]
    // Map over array items to create an array of objects, one for each item, which also includes a random number to sort with
    .map((a) => ({ value: a, num: Math.random() }))
    // Sort numerical ascending by random number
    .sort((a, b) => a.num - b.num)
    // Turn (numerically sorted according to randomly generated numbers) array back into an array of strings (with only names)
    .map((a) => a.value)
    .forEach((person, index) => {
      const listItem = document.createElement('li');

      // data- precedes custom attribute in HTML5
      listItem.setAttribute('data-index', index);

      listItem.innerHTML = `
      <span class="number">${index + 1}</span>
      <div class="draggable" draggable="true">
        <p class="person-name">${person}</p>
        <i class="fas fa-grip-lines"></i>
      </div>
    `;

      listItems.push(listItem);

      draggable_list.appendChild(listItem);
    });
}
