import './App.css'
import AttractionsMap from './components/AttractionsMap'
import { AccessibilityType, MobilitySeverity, AccessibilityRating, VisionSeverity, AudioSeverity } from './components/Enums'
import { useAuth0 } from '@auth0/auth0-react'
import LoginButton from './components/LoginButton'
import LogoutButton from './components/LogoutButton'

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
  const { isAuthenticated } = useAuth0();

  return (
    <>
      <section className='nav-section'>
        <h2>Attractions rated by disabled travelers</h2>
        {isAuthenticated ? (<LogoutButton/>) : (<LoginButton/>)}
      </section>
      <section className='main-section'>
        <AttractionsMap initialAttractions={initialAttractions}>
          <form onSubmit={e => e.preventDefault()}>
            <input type='text' placeholder='e.g. Madrid'/>
            <button type='submit'>Find nearby</button>
          </form>
        </AttractionsMap>
      </section>
    </>
  )
}

export default App
