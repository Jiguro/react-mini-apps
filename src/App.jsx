import viteLogo from '/vite.svg'
import './App.css'
import Counter from './components/Counter'
import ToDoList from './components/ToDoList'
import AttractionsMap from './components/AttractionsMap'
import { AccessibilityType, MobilitySeverity, AccessibilityRating, VisionSeverity, AudioSeverity } from './components/Enums'

const initialAttractions = [
    {
        id: 1,
        name: "Eiffel Tower",
        latitude: 48.8584,
        longitude: 2.2945,
        accessibilityType: AccessibilityType.Audio,
        severity: AudioSeverity.PartiallyDeaf,
        accessibilityRating: AccessibilityRating.Positive
    }, {
        id: 2,
        name: "Sacre Coeur",
        latitude: 48.886452,
        longitude: 2.343121,
        accessibilityType: AccessibilityType.Mobility,
        severity: MobilitySeverity.WalkingAid,
        accessibilityRating: AccessibilityRating.Negative
    }, {
      id: 3,
      name: "Louvre",
      latitude: 48.861027,
      longitude: 2.335708,
      accessibilityType: AccessibilityType.Vision,
      severity: VisionSeverity.FullyBlind,
      accessibilityRating: AccessibilityRating.Neutral
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
    </>
  )
}

export default App
