import { useState } from 'react'

import './ToDoList.css'

function ToDoList({children, initialTodos}) {
  const [newTask, setNewTask] = useState("")
  const [todos, setTodos] = useState(initialTodos)

  function addNewTodo(e) {
    e.preventDefault()
    if (newTask != '') {
      let newTodos = todos.concat({
        id: todos.length + 1,
        task: newTask,
        completed: false
      })
      setTodos(newTodos)
      setNewTask('')
    }
  }

  function toggleTodo(todo) {
    let index = todos.indexOf(todo)
    let todosBefore = todos.slice(0, index)
    let todosAfter = todos.slice(index + 1, todos.length)

    let toggledTodo = {...todo, completed: !todo.completed}
    let newTodos = todosBefore.concat(toggledTodo).concat(todosAfter)
    setTodos(newTodos)
  }

  return (
    <>
      <div>{children}</div>
      <form onSubmit={addNewTodo}>
        <input type='text' value={newTask} onChange={e => setNewTask(e.target.value)}/>
        <button type='submit'>Add new task</button>
      </form>
      <ul>
        {todos.map(todo => (
          <li key={todo.id} className={todo.completed ? 'completed' : 'not-completed'}>
            <label>{todo.task}</label>
            <input type='checkbox' defaultChecked={todo.completed} onClick={e => toggleTodo(todo)}/>
          </li>
        ))}
      </ul>
      <strong>{todos.filter(t => t.completed).length}/{todos.length} tasks completed</strong>
    </>
  )
}

export default ToDoList
