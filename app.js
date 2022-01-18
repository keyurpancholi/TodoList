//ELEMENTS 
const todoInput = document.querySelector('.todo-input');
const todoSubmit = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');

//EVENT LISTENERS
todoSubmit.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteItem);
filterOption.addEventListener('click', filterTodo);
document.addEventListener('DOMContentLoaded', getTodos);

//FUNCTIONS
function addTodo(e){
    e.preventDefault();
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');
    const newTodo = document.createElement('li');
    newTodo.classList.add('todo-item');
    newTodo.innerText = todoInput.value;
    todoDiv.appendChild(newTodo);
    //ADD TODO TO LOCAL STORAGE
    saveLocalTodos(todoInput.value);

    //CHECK MARK BUTTON
    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<li class="fas fa-check"></li>';
    completedButton.classList.add('completed-btn');
    todoDiv.appendChild(completedButton);

    //TRASH BUTTON
    const trash  = document.createElement('button');
    trash.innerHTML = '<li class="fas fa-trash"></li>';
    trash.classList.add('trash-btn');
    todoDiv.appendChild(trash);

    //APPEND TO UL
    todoList.appendChild(todoDiv);
    todoInput.value = "";
}

function deleteItem(e){
    const item = e.target;
    //DELETE LIST
    if(item.classList[0] === 'trash-btn'){
        const todo = item.parentElement;
        todo.classList.add('fall');
        removeLocalTodos(todo);
        todo.addEventListener('transitionend', () => {
            todo.remove();
        })
    }

    if(item.classList[0] === 'completed-btn'){
        const todo = item.parentElement;
        todo.classList.toggle('done');
    }
}

function filterTodo(e){
    const todo = todoList.childNodes;

    todo.forEach((todo) => {
        switch(e.target.value){
            case "all":
                todo.style.display = "flex";
                break;
            case "completed":
                if(todo.classList.contains('done')){
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none"
                }
                break;
            case "incomplete":
                if(!todo.classList.contains('done')){
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }
                break;
        }
    })
}

function saveLocalTodos(todo){
    let todos;
    if(localStorage.getItem('todos') === null){
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos(){
    let todos;
    if(localStorage.getItem('todos') === null){
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.forEach(function(todo){
        const todoDiv = document.createElement('div');
        todoDiv.classList.add('todo');
        const newTodo = document.createElement('li');
        newTodo.classList.add('todo-item');
        newTodo.innerText = todo;
        todoDiv.appendChild(newTodo);

        //CHECK MARK BUTTON
        const completedButton = document.createElement('button');
        completedButton.innerHTML = '<li class="fas fa-check"></li>';
        completedButton.classList.add('completed-btn');
        todoDiv.appendChild(completedButton);

        //TRASH BUTTON
        const trash  = document.createElement('button');
        trash.innerHTML = '<li class="fas fa-trash"></li>';
        trash.classList.add('trash-btn');
        todoDiv.appendChild(trash);

        //APPEND TO UL
        todoList.appendChild(todoDiv);
    })
}

function removeLocalTodos(todo){
    let todos;
    if(localStorage.getItem('todos') === null){
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem("todos", JSON.stringify(todos))
}