const allItemsList = document.querySelector('.saved-items-list');
const savedItem = document.querySelector('.saved-item');
const selectedItemsList = document.querySelector('.selected-items-list');

// Holds ALL items for the selected store.
const savedItems = []

// Holds the items that were clicked on by the user
const selectedItems = []

// Array that contains the SORTED selected items. This array is used when rendering
let sortedItems;

// Gets items from selected store and renders them. Also pushes to savedItems array for later manipulation
fetch('/sendData')
     .then((res) => {
          return res.json()
     })
     .then((data) => {
          data.forEach((item) => {
               savedItemMarkup(item.id, item.name, item.isle)
               savedItems.push(item)
          })
     })
     .catch((err) => {
          console.log(err)
     })


function savedItemMarkup(id, title, isle) {
     const markup = `
           <li>
                 <a class="saved-item" href="#${id}">
                       <div class="item-info">
                             <h4 class="item-title">${title}</h4>
                             <p class="isle-number">${isle}</p>
                       </div>
                 </a>
           </li>
     `;
     allItemsList.insertAdjacentHTML('beforeend', markup);
}


// Takes the selected items and sorts them by isle number. Returns sorted array to "sortedItems"
function sortItems() {
     sortedItems = [...selectedItems].sort((a, b) => {
          return a.isle - b.isle;
     })
}

// If the hash ID matches the item clicked ID, then push that item to selected items array.
function createSelectedItemsArray(itemID) {
     for (let i = 0; i < savedItems.length; i++) {
          if (savedItems[i].id == itemID) {
               selectedItems.push(savedItems[i])
          }
     }
}

// Is ran everytime there is a hashchange, aka an item is clicked
function savedItemClick() {
     const myItemId = window.location.hash.replace('#', '');
     createSelectedItemsArray(myItemId)
     sortItems();
     selectedItemsList.innerHTML = '';
     selectedItemMarkup(sortedItems)
};

// Renders all items that were selected and sorted by isle number
function selectedItemMarkup(items) {

     for (let i = 0; i < items.length; i++) {
          const markup = `
           <li class="selected-item">
                 <div class="selected-item-info">
                       <h4 class="selected-item-title">${items[i].name}</h4>
                       <p class="selected-isle-number">${items[i].isle}</p>
                 </div>
           </li>
     `;
          selectedItemsList.insertAdjacentHTML('beforeend', markup);
     }
}

// Listens for hashchange
['hashchange', 'load'].forEach(event => {
     window.addEventListener(event, savedItemClick)
});
