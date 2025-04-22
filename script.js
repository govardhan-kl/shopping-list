const addBtn = document.querySelector(".btn");
const textInput = document.querySelector('#item-input');
const itemList = document.getElementById('item-list');
const clearBtn = document.getElementById('clear');

/**
 * 
 * @param {item name from event} e 
 * @returns 
 */
function addItem(e){
    e.preventDefault();
    
    if(textInput.value === "" || textInput.value.trim() === ""){
        alert('Enter the Item Name');
        return;
    }
    //method 1
    // const ul = document.querySelector('#item-list');
    // ul.innerHTML += `
    // <li>
    //     ${textInput.value}
    //     <button class="remove-item btn-link text-red">
    //         <i class="fa-solid fa-xmark"></i>
    //     </button>
    // </li>
    // `
    
    //method-2
    const ul = document.querySelector('#item-list');
    const li = document.createElement('li');
    const btn = document.createElement('button');
    const i = document.createElement('i');
    btn.className = 'remove-item btn-link text-red'
    i.className = 'fa-solid fa-xmark'
    
    li.appendChild(document.createTextNode(`${textInput.value}`));
    li.appendChild(btn);
    btn.appendChild(i);
    ul.appendChild(li);

    //clearing input field after adding item
    textInput.value='';
}


function removeItem(e) {
    if (e.target.parentElement.classList.contains('remove-item')) {
      e.target.parentElement.parentElement.remove();
    }
}


function clearItems(){
    //simpler way
    // itemList.innerHTML = ``;

    //other way is
    while(itemList.firstChild){
        // itemList.firstChild.remove()
        itemList.removeChild(itemList.firstChild)
    }
}


//This is for adding items
addBtn.addEventListener('click', addItem)
//This is for removing items inside parent itemList
itemList.addEventListener('click',removeItem);
//This is for clearing all items
clearBtn.addEventListener('click',clearItems);

