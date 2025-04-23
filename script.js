const addBtn = document.querySelector(".btn");
const textInput = document.querySelector('#item-input');
const itemList = document.getElementById('item-list');
const clearBtn = document.getElementById('clear');
const filterInput = document.getElementById('filter');
let editItemName, editItemElement;

/**
 * 
 * @param {item name from event} e 
 * @returns 
 */
function addItemLocalStorage(e){
    e.preventDefault();
    
    if(textInput.value === "" || textInput.value.trim() === ""){
        alert('Enter the Item Name');
        return;
    }
    
    //chaning if the btn is update to add and deleting the old item to update it to latest
    const updateBtn = document.querySelector('.update');
    if(updateBtn){
        let localItems = JSON.parse(localStorage.getItem('items'));
        let index = localItems.indexOf(editItemName);
        console.log(index);
        localItems.splice(index,1);
        localStorage.setItem('items',JSON.stringify(localItems));
        editItemElement.remove()

        updateBtn.className = 'btn'
        updateBtn.innerHTML=`
            <i class="fa-solid fa-plus"></i> Add Item
        `
    }

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

    let localItems = JSON.parse(localStorage.getItem('items'));
    localItems.push(textInput.value)
    localStorage.setItem('items',JSON.stringify(localItems));

    //clearing input field after adding item
    textInput.value='';

    checkUI();
}


function displayLocalElements(){
    let localItems = JSON.parse(localStorage.getItem('items'));
    localItems.forEach((eachLocalItem)=>{
        const ul = document.querySelector('#item-list');
        ul.innerHTML += `
        <li>
            ${eachLocalItem}
            <button class="remove-item btn-link text-red">
                <i class="fa-solid fa-xmark"></i>
            </button>
        </li>
        `
    })
}


function clikOnItems(e){
    //to remove items
    if(e.target.parentElement.classList.contains('remove-item')){
        removeItemFromLocalStorage(e.target.parentElement.parentElement,e.target.parentElement.parentElement.innerText)
    }

    //to edit the item
    if(e.target.tagName === 'LI'){
        editItem(e.target)
    }
}


function editItem(item){
    const li = document.querySelectorAll('#item-list li')
    li.forEach((i)=>{
        i.style.opacity='1'
    })
    console.log(item)
    const updateBtn = document.querySelector('.form-control button')
    updateBtn.className='btn update';
    updateBtn.innerHTML = `
            <i class="fa-solid fa-pen"></i> Update Item
    `
    textInput.value = item.innerText.trim();
    editItemName = item.innerText.trim();
    editItemElement = item;
    item.style.opacity='0.6';
}


function removeItemFromLocalStorage(item,text) {
    console.log(item.innerText,text)

    if(confirm(`Are you sure want to delete ${item.innerText}`)){
        item.remove();
        
        let localItems = JSON.parse(localStorage.getItem('items'));
        let index = localItems.indexOf(item.innerText.trim());
        console.log(item,item.textContent.trim(),index,text,localItems);
        localItems.splice(index,1);
        localStorage.setItem('items',JSON.stringify(localItems));

        checkUI();
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
    localStorage.removeItem('items');
    checkUI();
}


function addFilter(e){
    const filterValue = e.target.value.toLowerCase();
    const items = document.querySelectorAll('li');
    items.forEach((item)=>{
        let itemText = item.innerText.toLowerCase();
        let k = itemText.indexOf(filterValue);//can also use icludes()
        if(k !== -1){
            item.style.display = 'flex';
        }else{
            item.style.display = 'none';
        }
    })
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


//This is for adding items by localstorage
if(localStorage.getItem('items')){
    displayLocalElements()
}else{
    localStorage.setItem('items',JSON.stringify([]));
}
addBtn.addEventListener('click', addItemLocalStorage)
//This is for removing items inside parent itemList
itemList.addEventListener('click',clikOnItems);
//This is for clearing all items
clearBtn.addEventListener('click',clearItems);
//to remove the filter and clearBtn when no items are present
checkUI()
//Adding filter
filterInput.addEventListener('input',addFilter);
