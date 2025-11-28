export default (() => {
    function isNewListNameValid(newListName) {
        if (newListName.length === 0) {
            console.log('A new list must have a name of non-zero length')
            return false
        }

        return true
    }

    return { isNewListNameValid }
})()