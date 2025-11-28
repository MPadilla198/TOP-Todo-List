import { TodoItem, Priority } from './todo-item'
import { TodoList } from './todo-list'

export default (() => {
    const listsContainer = document.querySelector('.lists')
    const todosContainer = document.querySelector('.todos')

    let currentlySelected = null

    function resetTodos() {
        while (todosContainer.firstChild) {
            todosContainer.removeChild(todosContainer.firstChild)
        }
    }

    function resetLists() {
        while (listsContainer.firstChild) {
            listsContainer.removeChild(listsContainer.firstChild)
        }
    }

    function getUUIDFromEventTarget(event) {
        let target = event.target
        if (!target.dataset.id) {
            // If target element does not have data-id, then the parent should have it
            target = target.parentNode
        }

        return target.dataset.id
    }

    function getNewListName() {
        return document.getElementById('list-name').value
    }

    function resetNewListInput() {
        document.getElementById('list-name').value = ''
    }

    function getNewTodoInputs() {
        return {
            title: document.getElementById('todo-title').value,
            description: document.getElementById('todo-description').value,
            dueDate: document.getElementById('todo-due-date').value,
            priority: document.getElementById('todo-priority').value
        }
    }

    function resetNewTodoInputs() {
        document.getElementById('todo-title').value = ''
        document.getElementById('todo-description').value = ''
        document.getElementById('todo-due-date').value = ''
        document.getElementById('todo-priority').value = 'low'
    }

    function removeSelectedList(uuid) {
        // Do nothing if already selected
        if (currentlySelected === uuid) {
            return
        }

        // TODO Move this paragraph to domManager
        // Remove styles from currently selected
        const lists = document.querySelectorAll('.list')
        for (const list of lists) {
            if (list.dataset.id === currentlySelected) {
                list.classList.remove('selected-list')
                break
            }
        }
    }

    function setSelectedList(uuid) {
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
    }

    function renderTodos(todos) {
        resetTodos()

        for (const todo of todos) {
            if (!(todo instanceof TodoItem)) {
                throw new Error(`A todo in todos given to renderTodos is not instance of TodoItem: ${todo}`)
            }

            // Add here
        }
    }

    function renderLists(lists) {
        resetLists()

        for (const list of lists) {
            if (!(list instanceof TodoList)) {
                throw new Error(`A list in lists given to renderLists is not instance of TodoList: ${list}`)
            }

            const div = document.createElement('div')
            div.classList.add('list')
            div.dataset.id = list.uuid

            const title = document.createElement('p')
            title.textContent = list.title
            div.appendChild(title)
            listsContainer.appendChild(div)
        }

        setSelectedList(currentlySelected)
    }

    return { renderTodos, renderLists, removeSelectedList, setSelectedList, getNewListName, resetNewListInput, getUUIDFromEventTarget, getNewTodoInputs, resetNewTodoInputs }
})()