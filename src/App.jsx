import './App.css'
import Counter from './Counter'

function App() {

  return (
    <>
      <section>
        <h1>Fitness Tracker</h1>
        <Counter label="Cardio sessions"/>
        <Counter label="Free weights sessions"/>
        <Counter label="Sips of water"/>
      </section>
    </>
  )
}

export default App
