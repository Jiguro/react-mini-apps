import viteLogo from '/vite.svg'
import './App.css'
import Counter from './components/Counter'
import ToDoList from './components/ToDoList'
import AttractionsMap from './components/AttractionsMap'
import { AccessibilityType, MobilitySeverity, AccessibilityRating } from './components/Enums'

const initialAttractions = [
    {
        id: 1,
        name: "Eiffel Tower",
        latitude: 48.8584,
        longitude: 2.2945,
        accessibilityType: AccessibilityType.Mobility,
        severity: MobilitySeverity.Wheelchair,
        accessibilityRating: AccessibilityRating.Positive
    }, {
        id: 2,
        name: "Sacre Coeur",
        latitude: 48.886452,
        longitude: 2.343121,
        accessibilityType: AccessibilityType.Mobility,
        severity: MobilitySeverity.WalkingAid,
        accessibilityRating: AccessibilityRating.Neutral
    }
]

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
        <AttractionsMap initialAttractions={initialAttractions}>
          <h1>Attractions suitable for disabled visitors</h1>
        </AttractionsMap>
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
