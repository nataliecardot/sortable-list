const draggable_list = document.getElementById('draggable-list');
const check = document.getElementById('check');

const germanNumbers = [
  'eins',
  'zwei',
  'drei',
  'vier',
  'fünf',
  'sechs',
  'sieben',
  'acht',
  'neun',
  'zehn',
  'elf',
  'zwölf',
  'dreizehn',
  'vierzehn',
  'fünfzehn',
  'sechzehn',
  'siebzehn',
  'achtzehn',
  'neunzehn',
  'zwanzig',
];

// Store listitems
const listItems = [];

let dragStartIndex;

createList();

// Insert list items into DOM
function createList() {
  // Copy array with spread syntax
  [...germanNumbers]
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

  addEventListeners();
}

function dragStart() {
  // Using unary plus operator to convert to a number
  // li is parent of target element, div with person's name
  // The closest() method traverses the Element and its parents (heading toward the document root) until it finds a node that matches the provided selector string. Will return itself or the matching ancestor
  dragStartIndex = +this.closest('li').getAttribute('data-index');
  // Can also use parentNode - same result
  // dragStartIndex = +this.parentNode.getAttribute('data-index');
}

function dragEnter() {
  // this keyword pertains to element (event listeners are executed with 'this' set to the event target - automatically passed to function called by event listener)
  this.classList.add('over');
}

function dragLeave() {
  this.classList.remove('over');
}

// Only including this one to keep dragover event from interfering with drop event; preventing default behavior - otherwise dragDrop won't be executed
function dragOver(e) {
  e.preventDefault();
}

function dragDrop() {
  const dragEndIndex = +this.getAttribute('data-index');
  // Note: dragStartIndex was reassigned by function dragStart (initialized in top-level scope)
  swapItems(dragStartIndex, dragEndIndex);

  this.classList.remove('over');
}

// Swap drag-and-drop list items
function swapItems(fromIndex, toIndex) {
  // The querySelector() method of the Element interface returns the first element that is a descendant of the element on which it is invoked that matches the specified group of selectors - getting div with class draggable that is a child of li item of specified index
  const itemOne = listItems[fromIndex].querySelector('.draggable');
  const itemTwo = listItems[toIndex].querySelector('.draggable');

  listItems[fromIndex].appendChild(itemTwo);
  listItems[toIndex].appendChild(itemOne);
}

// Check order of list items
function checkOrder() {
  listItems.forEach((listItem, index) => {
    const personName = listItem.querySelector('.draggable').innerText.trim();

    if (personName !== germanNumbers[index]) {
      listItem.classList.add('wrong');
    } else {
      listItem.classList.remove('wrong');
      listItem.classList.add('right');
    }
  });
}

function addEventListeners() {
  // querySelectorAll gives you a static NodeList
  const draggables = document.querySelectorAll('.draggable');
  const dragListItems = document.querySelectorAll('.draggable-list li');

  draggables.forEach((draggable) => {
    draggable.addEventListener('dragstart', dragStart);
  });

  dragListItems.forEach((item) => {
    item.addEventListener('dragover', dragOver);
    item.addEventListener('drop', dragDrop);
    item.addEventListener('dragenter', dragEnter);
    item.addEventListener('dragleave', dragLeave);
  });
}

check.addEventListener('click', checkOrder);
