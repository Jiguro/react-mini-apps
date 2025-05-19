import { useState } from 'react'
import GoogleMapReact from 'google-map-react'

import Attraction from './Attraction'

const AccessibilityType = {
    Mobility: 'Mobility',
    Vision: 'Vision',
    Audio: 'Audio',
}

const MobilitySeverity = {
    Wheelchair: 'Wheelchair',
    WalkingAid: 'WalkingAid',
    ShortDistances: 'ShortDistances',
}

const VisionSeverity = {
    FullyBlind: 'FullyBlind',
    PartiallyBlind: 'PartiallyBlind',
}

const AudioSeverity = {
    FullyDeaf: 'FullyDeaf',
    PartiallyDeaf: 'PartiallyDeaf',
}

const AccessibilityRating = {
    Positive: 'Positive',
    Neutral: 'Neutral',
    Negative: 'Negative',
}

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

function Attractions() {
    const [attractions, setAttractions] = useState(initialAttractions)
    const [editAttraction, setEditAttraction] = useState(null)
    const [newAttractionMode, setNewAttractionMode] = useState(false)
    const defaultMapProps = {
        apiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
        center: { // Louvre museum
          lat: 48.861027,
          lng: 2.335708
        },
        zoom: 12,
        hoverDistance: 10
    }

    function attractionEdit(attraction) {
        setEditAttraction(attraction)
        setNewAttractionMode(false)
    }

    function formSubmit(event) {
        event.preventDefault()
        if (editAttraction && !newAttractionMode) {
            setAttractions(attractions.map(attraction => attraction.id == editAttraction.id ? editAttraction : attraction))
        } else if (editAttraction && newAttractionMode) {
            setAttractions([...attractions, editAttraction])
        }
        formClear()
    }

    function formClear() {
        setEditAttraction(null)
        setNewAttractionMode(false)
    }

    function mapClick({x, y, lat, lng, event}) {
        if (newAttractionMode) {
            setEditAttraction({
                id: attractions.length + 1,
                name: "",
                latitude: lat,
                longitude: lng,
                accessibilityType: AccessibilityType.Mobility,
                severity: MobilitySeverity.Wheelchair,
                accessibilityRating: AccessibilityRating.Negative
            })
        }
    }

    return (
        <>
            <h1>Attractions suitable for disabled visitors</h1>
            <div style={{ height: '50vh', width: '100%' }}>
                <GoogleMapReact bootstrapURLKeys={{ key: defaultMapProps.apiKey }}
                                defaultCenter={defaultMapProps.center}
                                defaultZoom={defaultMapProps.zoom}
                                onClick={mapClick}>
                    {attractions.map(attraction => (
                        <Attraction key={attraction.id}
                                    lat={attraction.latitude} lng={attraction.longitude}
                                    attraction={attraction} selectCallback={attractionEdit}/>
                    ))}
                </GoogleMapReact>
            </div>
            {editAttraction && (
                <>
                    <i>{newAttractionMode ? 'Adding new attraction' : 'Editing existing attraction'}</i>
                    <form onSubmit={formSubmit}>
                        <input type='text' value={editAttraction.name}
                            onChange={e => setEditAttraction({...editAttraction, name: e.target.value})}/>
                        <button type='submit'>Submit</button>
                        <button onClick={e => formClear()}>Cancel</button>
                    </form>
                </>
            )}
            {!editAttraction && (
                <button disabled={newAttractionMode}
                        onClick={e => setNewAttractionMode(true)}>
                    {newAttractionMode ? 'Now click on desired map location' : 'Click here to add new attraction'}
                </button>
            )}
        </>
    )
}

export default Attractions
export {AccessibilityType, MobilitySeverity, VisionSeverity, AudioSeverity, AccessibilityRating}
