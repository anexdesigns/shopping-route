const selectedItemsList = document.querySelector('.selected-items-list');

let unsortedArray = []
let sortedArray = []

function sortItems(unsortedItems) {
     sortedArray = []
     function Comparator(a, b) {
          if (a[1] < b[1]) return -1;
          if (a[1] > b[1]) return 1;
          return 0;
     }

     unsortedItems.forEach((item) => {
          sortedArray.push(item)
     })

     sortedArray.sort(Comparator)
}


function renderSortedItems(sortedItems) {
     selectedItemsList.innerHTML = ''
     for (i = 0; i < sortedItems.length; i++) {
          const markup = `
          <li class="selected-item" onclick=changeStyle(this)>
               <div class="selected-item-info">
                    <h4 class="selected-item-title">${sortedItems[i][0]}</h4>
                    <p class="selected-isle-number">${sortedItems[i][1]}</p>
               </div>
          </li>
          `;
          selectedItemsList.insertAdjacentHTML('beforeend', markup);
     }
}


// Renders all items that were selected and sorted by isle number
function selectedItemMarkup(itemTitle, itemIsle) {
     const itemIsleNum = parseInt(itemIsle)
     unsortedArray.push([itemTitle, itemIsleNum])
     sortItems(unsortedArray)
     renderSortedItems(sortedArray)
}



// *********** STYLING *********** //

// Set the width of the sidebar to 250px and the left margin of the page content to 250px
function openNav() {
     document.getElementById("sidebar").style.width = "250px";
}

// Set the width of the sidebar to 0 and the left margin of the page content to 0 
function closeNav() {
     document.getElementById("sidebar").style.width = "0";
     document.querySelector(".openbtn").style.marginLeft = "0";
}

function changeStyle(element) {
     element.style.opacity = "0.4"
     element.style.color = "red"
     element.style.textDecoration = "line-through"
}
