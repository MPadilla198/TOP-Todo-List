import './styles.css'

import TodoItemManager, { TodoItem, Priority } from './todo-item'
import TodoListManager, { TodoList } from './todo-list'
import StorageManager from './storage'
import domManager from './dom'

if (process.env.NODE_ENV !== 'production') {
    console.log('Looks like we are in development mode!')
}

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
})