export default (() => {
    function isNewListNameValid(newListName) {
        if (newListName.length === 0) {
            console.log('A new list must have a name of non-zero length')
            return false
        }

        return true
    }

    function isNewTodoValid(todo) {
        if (todo.title.length === 0) {
            console.log('A new todo must have a title of non-zero length')
            return false
        }

        if (todo.dueDate.length === 0) {
            console.log('A new todo must have a due date')
            return false
        }

        return true
    }

    return { isNewListNameValid, isNewTodoValid }
})()