const todos = document.querySelector('#todo')
const completed = document.querySelector('#completed')

const form = document.querySelector('[data-action="form"]')
const input = form.querySelector('[data-action="input"]')

const container = document.querySelector('[data-action="container"]')

const filter = document.querySelector('[data-action="filter"]')


document.addEventListener("DOMContentLoaded", rendering)

let tasksTodo = [];

if(localStorage.getItem('tasks')){
  tasksTodo = JSON.parse(localStorage.getItem('tasks'))
}

form.addEventListener('submit', function(e){
  e.preventDefault()
  if(input.value){
    tasksTodo.push({
      id: ~~(Math.random() * 1000),
      value: input.value.trim(), //.replace(/\s{2,}/g, ' '),
      completed: false,
      display: ""
    })
    rendering()
  }
  input.value = ''
})

filter.addEventListener('keyup', filterItems)
filter.addEventListener('blur', filterInputBlur)

container.addEventListener('click', function(e){
  if(e.target.dataset.action === "delete") {
    let indexRemove = tasksTodo.findIndex(obj => obj.id == e.target.closest('li').id)
    if(indexRemove !== -1){
      tasksTodo.splice(indexRemove, 1)
    }
  }

  if(e.target.dataset.action === "completed") {
    let indexRemove = tasksTodo.findIndex(obj => obj.id == e.target.closest('li').id)
    tasksTodo[indexRemove].completed = !tasksTodo[indexRemove].completed 
  }
  
  rendering()
})

function rendering(){
  todos.innerHTML = ""
  completed.innerHTML = ""

  tasksTodo.forEach(item => {

    const newTask =  `
      <li id="${item.id}" data-action="${item.completed}" style="${item.display}" class="todo-item">
        <span class="text-todo">${item.value}</span>
        <div class="todo-buttons">
          <button data-action="delete" class="todo-remove"></button>
          <button data-action="completed" class="todo-complete"></button>
        </div>
      </li>
    `

    !item.completed ? todos.insertAdjacentHTML("afterbegin", newTask) 
      : completed.insertAdjacentHTML("afterbegin", newTask)
  })

  localStorage.setItem('tasks', JSON.stringify(tasksTodo))
}

function filterItems(e){
  const searchedText = e.target.value.toLowerCase();
  tasksTodo.forEach(el => {
    if(el.value.toLowerCase().includes(searchedText)){
      el.display = 'display: block'
    } else {
      el.display = 'display: none'
    }
    rendering()
  })
}

function filterInputBlur(e){
  e.target.value = ''
  tasksTodo.forEach(el => el.display = "display: block")
  rendering()
}





