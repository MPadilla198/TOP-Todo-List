import { TodoItem, Priority } from './todo-item'
import { TodoList } from './todo-list'

export default (() => {
    const listsContainer = document.querySelector('.lists')
    const todosContainer = document.querySelector('.todos')

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
    }

    return { renderTodos, renderLists }
})()