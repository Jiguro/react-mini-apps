import viteLogo from '/vite.svg'
import './App.css'
import Counter from './components/Counter'
import ToDoList from './components/ToDoList'
import Attractions from './components/Attractions'

const initialTodosMfr = [
  {
    id: 1,
    task: "Learn Angular",
    completed: true
  }, {
    id: 2,
    task: "Learn ReactJS",
    completed: false
  }
]

function App() {

  return (
    <>
      <section>
        <Attractions></Attractions>
      </section>
      <section>
        <h1>Fitness Tracker</h1>
        <Counter label='Cardio sessions'/>
        <Counter label='Free weights sessions'/>
        <Counter label='Sips of water'/>
      </section>
      <section>
        <ToDoList initialTodos={initialTodosMfr}>
          <h3>MFR ToDos</h3>
        </ToDoList>
      </section>
      <section>
        <ToDoList initialTodos={[]}>
          <img src={viteLogo}/>
        </ToDoList>
      </section>
    </>
  )
}

export default App
