export const Priority = Object.freeze({
    LOW: 0,
    NORMAL: 1,
    HIGH: 2
})

export class TodoItem {
    #uuid
    #title
    #description
    #dueDate
    #priority

    constructor(title, description, dueDate, priority = Priority.LOW) {
        this.#uuid = self.crypto.randomUUID()
        this.#title = title
        this.#description = description
        this.#dueDate = dueDate
        this.#priority = priority
        // ? this.notes = notes
        // ? this.checklist = checklist
    }

    get uuid() { return this.#uuid }

    get title() { return this.#title }
    set title(str) { this.#title = str }

    get description() { return this.#description }
    set description(str) { this.#description = str }

    get dueDate() { return this.#dueDate }
    set dueDate(date) { this.#dueDate = date }

    get priority() { return this.#priority }
    set priority(prior) { this.#priority = prior }
}

// Todo Item Manager
export default (() => {
    const todoItems = []

    // Create
    function createTodo(title, description, dueDate, priority = Priority.LOW) {
        todoItems.push(new TodoItem(title, description, dueDate, priority))
    }

    function fillFromJSON(json) {
        const data = JSON.parse(json)
        for (const item of data) {
            todoItems.push(
                new TodoItem(item.title, item.description, item.dueDate, item.priority))
        }
    }

    // Read
    function getTodo(uuid) {
        for (const item of todoItems) {
            if (item.uuid === uuid) {
                return item
            }
        }

        return null
    }

    function getTodos(uuids) {
        uuids = new Set(uuids)
        result = []

        for (const item of todoItems) {
            if (uuids.has(item.uuid)) {
                result.push(item)
            }
        }

        return result
    }

    function toJSON() {
        return JSON.stringify(todoItems)
    }

    // Update
    function updateTodo(uuid, title = null, description = null, dueDate = null, priority = null) {
        for (const item of todoItems) {
            if (item.uuid === uuid) {
                if (title !== null) {
                    item.title = title
                }

                if (description !== null) {
                    item.description = description
                }

                if (dueDate !== null) {
                    item.dueDate = dueDate
                }

                if (priority !== null) {
                    item.priority = priority
                }

                return
            }
        }
    }

    // Delete
    function deleteTodo(uuid) {
        let index = 0
        for (const item of todoItems) {
            if (item.uuid === uuid) {
                todoItems = todoItems.splice(index, 1)

                return
            }

            index++
        }
    }

    return { createTodo, fillFromJSON, getTodo, getTodos, toJSON, updateTodo, deleteTodo }
})();