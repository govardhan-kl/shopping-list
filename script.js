const addBtn = document.querySelector(".btn");
const textInput = document.querySelector('#item-input');
const itemList = document.getElementById('item-list');
const clearBtn = document.getElementById('clear');
const filterInput = document.getElementById('filter');

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

    checkUI();
}


function removeItem(e) {
    if (e.target.parentElement.classList.contains('remove-item')) {
        if(confirm(`Are you sure want to delete ${e.target.parentElement.parentElement.innerText}`)){
            e.target.parentElement.parentElement.remove();
            checkUI();
        }
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
    checkUI();
}


//when items are cleared no need of filter and clear button.
function checkUI(){
    // if we remove it like below, again when we add items they wont come up
    // filterInput.remove() or filterInput.parentElement.removeChild(filterInput) or clearBtn.remove()
    if(itemList.firstElementChild){
        filterInput.style.display='block';
        clearBtn.style.display='block'
    }else{
        filterInput.style.display='none';
        clearBtn.style.display='none'
    } 
}


//This is for adding items
addBtn.addEventListener('click', addItem)
//This is for removing items inside parent itemList
itemList.addEventListener('click',removeItem);
//This is for clearing all items
clearBtn.addEventListener('click',clearItems);
//to remove the filter and clearBtn when no items are present
checkUI()
