import './styles.css'

import TodoItemManager, { TodoItem, Priority } from './todo-item'
import TodoListManager, { TodoList } from './todo-list'
import StorageManager from './storage'
import domManager from './dom'
import validator from './validator'

if (process.env.NODE_ENV !== 'production') {
    console.log('Looks like we are in development mode!')
}

function setCurrentlySelected(uuid) {
    domManager.setSelectedList(uuid)

    // Update todos to render those of currently selected
    const list = TodoListManager.getTodoList(uuid)
    const todos = TodoItemManager.getTodos(list.todos)
    domManager.renderTodos(todos)
}

document.getElementById('new-todo-button').addEventListener('click', (event) => {
    const todoInputs = domManager.getNewTodoInputs()

    if (!validator.isNewTodoValid(todoInputs)) {
        return
    }

    // Add new todo item in manager
    const todoUUID = TodoItemManager.createTodo(todoInputs.title, todoInputs.description, todoInputs.dueDate, todoInputs.priority)

    // Add item to currently selected list
    const currentlySelected = domManager.getSelectedList()
    TodoListManager.addItemToList(currentlySelected, todoUUID)

    // Get todos of currently selected list and render
    const list = TodoListManager.getTodoList(currentlySelected)
    const todos = TodoItemManager.getTodos(list.todos)
    domManager.renderTodos(todos)

    domManager.resetNewTodoInputs()
})

document.querySelector('.lists').addEventListener('click', (event) => {
    const uuid = domManager.getUUIDFromEventTarget(event)
    domManager.removeSelectedList(uuid)
    setCurrentlySelected(uuid)
})

document.getElementById('new-list-button').addEventListener('click', () => {
    const newListName = domManager.getNewListName()

    // If name is not valid, then do nothing
    if (!validator.isNewListNameValid(newListName)) {
        return
    }

    // Add new list to manager
    TodoListManager.createTodoList(newListName)

    // Re-render lists with new list
    const lists = TodoListManager.getTodoLists()
    domManager.renderLists(lists)

    // Reset input field
    domManager.resetNewListInput()
})

// Initial list
const generalUUID = TodoListManager.createTodoList('General')
const lists = TodoListManager.getTodoLists()
domManager.renderLists(lists)

setCurrentlySelected(generalUUID)