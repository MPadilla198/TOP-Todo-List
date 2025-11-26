import './styles.css'

import TodoItemManager, { TodoItem, Priority } from './todo-item'
import TodoListManager, { TodoList } from './todo-list'
import StorageManager from './storage'
import domManager from './dom'

if (process.env.NODE_ENV !== 'production') {
    console.log('Looks like we are in development mode!')
}