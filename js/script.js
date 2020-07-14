window.addEventListener('load', start);

var globalNames = ['Um', 'Dois', 'Três', 'Quatro'];
var globalInputName = null;
var isEditing = false;
var currentIndex = null;

function start() {
  globalInputName = document.querySelector('#nameInput');
  preventFormSubmit();
  actvatedInput();
  render();
}
function preventFormSubmit() {
  function handleFormSubmit(event) {
    event.preventDefault();
  }
  var form = document.querySelector('form');
  form.addEventListener('submit', handleFormSubmit);
}

function actvatedInput() {
  function insertName(newName) {
    globalNames.push(newName);
  }

  function updateName(editedName) {
    globalNames[currentIndex] = editedName;
  }

  function handleTyping(event) {
    if (event.key === 'Enter' && event.target.value.trim() !== '') {
      if (isEditing) {
        updateName(event.target.value);
      } else {
        insertName(event.target.value);
      }
      render();
      isEditing = false;
      clearInput();
    }
  }
  globalInputName.addEventListener('keyup', handleTyping);
  globalInputName.focus();
}

function render() {
  function createDeleteButton(index) {
    function deleteButton() {
      globalNames.splice(index, 1);
      render();
    }
    var button = document.createElement('button');
    button.textContent = 'x';
    button.classList.add('deleteButton');
    button.addEventListener('click', deleteButton);
    return button;
  }

  function createSpan(name, index) {
    function editItem() {
      globalInputName.value = name;
      globalInputName.focus();
      isEditing = true;
      currentIndex = index;
    }
    var span = document.createElement('span');
    span.classList.add('clickable');
    span.textContent = name;
    span.addEventListener('click', editItem);
    return span;
  }

  var divNames = document.querySelector('#dataShow');
  divNames.innerHTML = '';
  var ul = document.createElement('ul');

  for (var i = 0; i < globalNames.length; i++) {
    var currentName = globalNames[i];
    var li = document.createElement('li');

    var button = createDeleteButton(i);

    var span = createSpan(currentName, i);

    li.appendChild(button);
    li.appendChild(span);
    ul.appendChild(li);
  }
  divNames.appendChild(ul);
  clearInput();
}

function clearInput() {
  globalInputName.value = '';
  globalInputName.focus();
}
