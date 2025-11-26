export class TodoList {
    #uuid
    #title
    #description
    #todos

    constructor(title, description) {
        this.#uuid = self.crypto.randomUUID()
        this.#title = title
        this.#description = description
        this.#todos = []
    }

    get uuid() { return this.#uuid }

    get title() { return this.#title }
    set title(str) { this.#title = str }

    get description() { return this.#description }
    set description(str) { this.#description = str }

    addTodo(uuid) {
        this.#todos.push(uuid)
    }

    removeTodo(uuid) {
        const index = this.#todos.findIndex(uuid)
        if (index !== -1) {
            this.#todos = this.#todos.splice(index, 1)
        }
    }

    clearTodos() {
        this.#todos = []
    }
}

// Todo List Manager
export default (() => {
    const lists = []

    // Create
    function createTodoList(title, description) {
        lists.push(new TodoList(title, description))
    }

    function fillFromJSON(json) {
        const data = JSON.parse(json)
        for (const list of data) {
            const newList = new TodoList(list.title, list.description)

            for (const todo of list.todos) {
                newList.addTodo(todo)
            }

            lists.push(newList)
        }
    }

    // Read

    // Update

    // Delete


    return { createTodoList, fillFromJSON }
})()