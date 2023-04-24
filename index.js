import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js';

import {
  getDatabase,
  ref,
  push,
  onValue,
  remove,
} from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js';

const appSettings = {
  databaseURL:
    'https://cartapp-2ea5d-default-rtdb.europe-west1.firebasedatabase.app/',
};

const app = initializeApp(appSettings);

const database = getDatabase(app);

const cartListInDB = ref(database, 'cartItems');

const input = document.querySelector('#input-field');

const btn = document.querySelector('#add-button');

const ulListEl = document.querySelector('#shopping-list');

btn.addEventListener('click', () => {
  let inputVal = input.value;

  if (inputVal === '') {
    return;
  }

  push(cartListInDB, inputVal);
  resetInput();
});

onValue(cartListInDB, function (snapshot) {
  if (snapshot.exists()) {
    let cartValuesArr = Object.entries(snapshot.val());
    ulListEl.innerHTML = '';
    for (let i = 0; i < cartValuesArr.length; i++) {
      let currentItem = cartValuesArr[i];

      appendLi(currentItem);
    }
  } else {
    ulListEl.innerHTML = `<li>Nothing to display yet</li>`;
  }

  // let allLists = document.querySelectorAll('li')

  // function addDblclick() {
  //   for (let i = 0; i < allLists.length; i++) {
  //     allLists[i].addEventListener('dblclick', () => {
  //       console.log('li clicked');
  //       });
  //   }
  // }
});

function resetInput() {
  input.value = '';
}

function appendLi(item) {
  let currentId = item[0];
  let currentValue = item[1];

  let listEl = document.createElement('li');

  listEl.textContent = currentValue;

  listEl.addEventListener('click', () => {
    let exactListItemLocation = ref(database, `cartItems/${currentId}`);
    remove(exactListItemLocation);
  });
  ulListEl.append(listEl);
}
