import './styles.css'

import TodoItemManager, { TodoItem, Priority } from './todo-item'
import TodoListManager, { TodoList } from './todo-list'
import StorageManager from './storage'
import domManager from './dom'

if (process.env.NODE_ENV !== 'production') {
    console.log('Looks like we are in development mode!')
}

function setCurrentlySelected(uuid) {
    // Update currentlySelected
    currentlySelected = uuid

    // Add style to currently selected
    const lists = document.querySelectorAll('.list')
    for (const list of lists) {
        if (list.dataset.id === uuid) {
            list.classList.add('selected-list')
            break
        }
    }

    // Update todos to render those of currently selected
    const list = TodoListManager.getTodoList(uuid)
    const todos = TodoItemManager.getTodos(list.todos)
    domManager.renderTodos(todos)
}

function replaceCurrentlySelected(uuid) {
    // Do nothing if already selected
    if (currentlySelected === uuid) {
        return
    }

    // Remove styles from currently selected
    const lists = document.querySelectorAll('.list')
    for (const list of lists) {
        if (list.dataset.id === currentlySelected) {
            list.classList.remove('selected-list')
            break
        }
    }

    setCurrentlySelected(uuid)
}

document.querySelector('.lists').addEventListener('click', (event) => {
    let target = event.target
    if (!target.dataset.id) {
        // If target element does not have data-id, then the parent should have it
        target = target.parentNode
    }

    const uuid = target.dataset.id
    replaceCurrentlySelected(uuid)
})

document.getElementById('new-list-button').addEventListener('click', () => {
    const newListNameInput = document.getElementById('list-name')
    const newListName = newListNameInput.value

    if (newListName.length === 0) {
        console.log('A new list must have a name of non-zero length')
        return
    }

    console.log(`New list with name ${newListName}`)

    // Add new list to manager
    TodoListManager.createTodoList(newListName)

    // Re-render lists with new list
    const lists = TodoListManager.getTodoLists()
    domManager.renderLists(lists)

    // Reset input field
    newListNameInput.value = ''

    setCurrentlySelected(currentlySelected)
})

// Initial list
const generalUUID = TodoListManager.createTodoList('General')
const lists = TodoListManager.getTodoLists()
domManager.renderLists(lists)

let currentlySelected = null
setCurrentlySelected(generalUUID)