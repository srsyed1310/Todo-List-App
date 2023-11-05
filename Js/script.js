const input = document.getElementById('input');
const listContainer = document.querySelector('.list_container');
const  search = document.getElementById('search');
const submit_btn = document.getElementById('btn');





submit_btn.addEventListener('click', ()=>{

    const itemTask = input.value.trim();

    if (itemTask !== '') {

        const listItem = createTodoList(itemTask);
        listContainer.appendChild(listItem);

    }
    input.value = '';
    saveData();

});

// Add a List Item

function createTodoList(itemTask){

    const listItem = document.createElement('div');
    listItem.classList.add('list');

    listItem.innerHTML = `
    <li>${itemTask}</li>
    <span>
    <i id="edit_btn" class="ri-pencil-fill"></i>
    <i id = "Up_arrow" class="ri-arrow-up-circle-fill"></i>
        <i id = "Down_arrow" class="ri-arrow-down-circle-fill"></i>
        <i id = "Tick_btn" class="fa-solid fa-circle-check"></i>
        <i id ="delete_btn" class="fa-solid fa-circle-xmark"></i>
    </span>
    `
    return listItem
};

// Add a list Checked or Unchecked

listContainer.addEventListener('click', (e)=>{

    if (e.target.tagName === 'LI') {
        e.target.classList.toggle('checked');
        saveData();

        // Add Image For Checked or Unchecked

        const listItemBefore = e.target.previousElementSibling;

        if (e.target.classList.contain('checked')) {
            listItemBefore.style.backgroundImage = 'url(./images/checked.png)'
            saveData();
        }
        else{
            listItemBefore.style.backgroundImage = 'url(./images/unchecked.png)'
             saveData();
        }

    }
    // Edit The Task List
    else if (e.target.id === 'edit_btn') {
        const listItem = e.target.parentElement.parentElement;
        const listItemText = listItem.querySelector('li');
        const editText = prompt('Edit the task:', listItemText.textContent);

        if (editText !== null) {
            listItemText.textContent = editText;
            saveData();
        }
    }

    else if (e.target.id === 'delete_btn') {
        e.target.parentElement.parentElement.remove();
        saveData();

    }

});



// Up and Down Arrow

function UpAndDown(listItem) {
    listItem.querySelector('#Up_arrow').addEventListener('click',()=> moveTaskUp(listItem));
    listItem.querySelector('#Down_arrow').addEventListener('click',()=> moveTaskDown(listItem));

    saveData();
}



function moveTaskUp(listItem) {
    if (listItem.previousElementSibling) {
        const prevItem = listItem.previousElementSibling;

        listItem.style.transform = `translateY(-${listItem.offsetHeight}px)`
        prevItem.style.transform = `translateY(${listItem.offsetHeight}px)`

        setTimeout(()=>{

            listContainer.insertBefore(listItem, prevItem);
            listItem.style.transform = '';
            prevItem.style.transform = '';
            saveData();

        },100)

    }
};



function moveTaskDown(listItem) {
    if (listItem.nextElementSibling) {

        const nextItem = listItem.nextElementSibling;

        listItem.style.transform = `translateY(${nextItem.offsetHeight}px)`
        nextItem.style.transform = `translateY(-${nextItem.offsetHeight}px)`
    
        setTimeout(()=>{

            listContainer.insertBefore(nextItem, listItem);
            listItem.style.transform = '';
            nextItem.style.transform = '';

            saveData();

        },300)
    }
}


// Search Data By using Search Input

search.addEventListener('input',()=>{

    const searchInput = search.value.toLowerCase();

    const listItem = listContainer.querySelectorAll('.list');

    listItem.forEach((listItem)=>{

    const taskText = listItem.querySelector('li').textContent.toLowerCase();

    if (taskText.includes(searchInput)) {
        listItem.style.display = 'flex';
    }
    else{
        listItem.style.display = 'none';
    }

});

});


// Add Data and Store in local Storage

function saveData() {
    localStorage.setItem('Data', listContainer.innerHTML)
}

function getData() {
    const saveData = localStorage.getItem("Data");

    if (saveData) {

        listContainer.innerHTML = saveData;
        const listItem = listContainer.querySelectorAll('.list');

        listItem.forEach((listItem)=>{
            UpAndDown(listItem)
        });
    }


}

getData();