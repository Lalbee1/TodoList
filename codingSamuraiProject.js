let todoItemsElement = document.getElementById("todo-items");
let addItemsBtnElement = document.getElementById("add-item-Btn");
let addItemsElement = document.getElementById("add-items");
let filterStateDropdown = document.getElementById("filter-state-dropdown");
let filterPriorityDropdown = document.getElementById("filter-priority-dropdown");

function DisplayItems(filterState = "All", filterPriority = "All") {
    let itemsFromLocalStorage = JSON.parse(localStorage.getItem("todoItems")) || [];
    addItemsElement.innerHTML = ""; 

    let filteredItems = itemsFromLocalStorage.filter(item => {
        const stateMatch = filterState === "All" || item.state === filterState;
        const priorityMatch = filterPriority === "All" || item.priority === filterPriority;
        return stateMatch && priorityMatch;
    });

    filteredItems.forEach((item, i) => {
        addItemsElement.innerHTML += `
            <li class="li-btn">
                ${item.text}
                <button onclick="EditItem(${i})" class="edit-button">Edit</button>
                <button onclick="DeleteItem(${i})" class="delete-button">Delete</button>
                <select onchange="updateState(${i}, this.value)" class="state-dropdown">
                    <option value="Pending" ${item.state === "Pending" ? "selected" : ""}>Pending</option>
                    <option value="Completed" ${item.state === "Completed" ? "selected" : ""}>Completed</option>
                </select>
                <select onchange="updatePriority(${i}, this.value)" class="priority-dropdown">
                    <option value="High" ${item.priority === "High" ? "selected" : ""}>High</option>
                    <option value="Medium" ${item.priority === "Medium" ? "selected" : ""}>Medium</option>
                    <option value="Low" ${item.priority === "Low" ? "selected" : ""}>Low</option>
                </select>
            </li>`;
    });
}

function updateState(index, newState) {
    let itemsFromLocalStorage = JSON.parse(localStorage.getItem("todoItems")) || [];
    itemsFromLocalStorage[index].state = newState; 
    localStorage.setItem("todoItems", JSON.stringify(itemsFromLocalStorage)); 
    DisplayItems(filterStateDropdown.value, filterPriorityDropdown.value); 
}

function updatePriority(index, newPriority) {
    let itemsFromLocalStorage = JSON.parse(localStorage.getItem("todoItems")) || [];
    itemsFromLocalStorage[index].priority = newPriority;
    localStorage.setItem("todoItems", JSON.stringify(itemsFromLocalStorage)); 
    DisplayItems(filterStateDropdown.value, filterPriorityDropdown.value); 
}

function DeleteItem(index) {
    let itemsFromLocalStorage = JSON.parse(localStorage.getItem("todoItems")) || [];
    itemsFromLocalStorage.splice(index, 1); 
    localStorage.setItem("todoItems", JSON.stringify(itemsFromLocalStorage));
    DisplayItems(filterStateDropdown.value, filterPriorityDropdown.value); 
}

function EditItem(index) {
    let itemsFromLocalStorage = JSON.parse(localStorage.getItem("todoItems")) || [];
    let newValue = prompt("Edit item:", itemsFromLocalStorage[index].text); 

    if (newValue !== null && newValue.trim() !== "") {
        itemsFromLocalStorage[index].text = newValue; 
        localStorage.setItem("todoItems", JSON.stringify(itemsFromLocalStorage)); 
        DisplayItems(filterStateDropdown.value, filterPriorityDropdown.value); 
    }
}

addItemsBtnElement.addEventListener("click", function () {
    let itemsFromLocalStorage = JSON.parse(localStorage.getItem("todoItems")) || [];
    let taskText = todoItemsElement.value.trim();
    let selectedPriority = document.getElementById("add-priority").value; 

    if (taskText !== "") {
        itemsFromLocalStorage.push({
            text: taskText,
            state: "Pending",
            priority: selectedPriority
        });
        localStorage.setItem("todoItems", JSON.stringify(itemsFromLocalStorage)); 
        DisplayItems(filterStateDropdown.value, filterPriorityDropdown.value); 
        todoItemsElement.value = ""; 
    } else {
        alert("Please enter a task!");
    }
});

filterStateDropdown.addEventListener("change", function () {
    DisplayItems(this.value, filterPriorityDropdown.value); 
});
filterPriorityDropdown.addEventListener("change", function () {
    DisplayItems(filterStateDropdown.value, this.value); 
});
DisplayItems();
