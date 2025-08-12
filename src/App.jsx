import { useState, useEffect } from 'react';

import './App.css'
import AttractionsMap, { defaultMapProps } from './components/AttractionsMap'
import { useAuth0 } from '@auth0/auth0-react'
import LoginButton from './components/LoginButton'
import LogoutButton from './components/LogoutButton'

function App() {
  const { isAuthenticated } = useAuth0();
  const [fetchedAttractions, setFetchedAttractions] = useState([])
  const [fetchAnew, setFetchAnew] = useState(Date.now())

  function convert(dto) {
    return {
        id: dto.id,
        name: dto.attraction.name,
        longitude: dto.attraction.location.coordinates[0],
        latitude: dto.attraction.location.coordinates[1],
        accessibilityType: dto.disabilityType,
        accessibilityRating: dto.ratingLevel
    }
  }

  useEffect(() => {
    fetch(`${import.meta.env.VITE_TRAVEL_APP_BACKEND_BASE_URL}/attraction?searchPointLongitude=${defaultMapProps.center.lng}&searchPointLatitude=${defaultMapProps.center.lat}`)
      .then(response => response.json())
      .then(json => setFetchedAttractions(json.content.map(dto => convert(dto))))
      .catch(error => console.error(error));
  }, [fetchAnew]);

  return (
    <>
      <section className='nav-section'>
        <h2>Attractions rated by disabled travelers</h2>
        {isAuthenticated ? (<LogoutButton/>) : (<LoginButton/>)}
      </section>
      <section className='main-section'>
        <AttractionsMap initialAttractions={fetchedAttractions} fetchAnewCallback={setFetchAnew}>
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
