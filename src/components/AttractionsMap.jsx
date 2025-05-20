import { useState } from 'react'
import GoogleMapReact from 'google-map-react'

import Attraction from './Attraction'
import AttractionForm from './AttractionForm'
import { AccessibilityType, MobilitySeverity, VisionSeverity, AudioSeverity, AccessibilityRating } from './Enums'

const defaultMapProps = {
    apiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    center: { // Louvre museum
      lat: 48.861027,
      lng: 2.335708
    },
    zoom: 12,
    dimensionStyle: {
        height: '50vh',
        width: '100%'
    }
}

function AttractionsMap({children, initialAttractions}) {
    const [attractions, setAttractions] = useState(initialAttractions)
    const [editAttraction, setEditAttraction] = useState(null)
    const [newAttractionMode, setNewAttractionMode] = useState(false)

    function editExistingAttraction(attraction) {
        if (!editAttraction && attraction) {
            setEditAttraction(attraction)
            setNewAttractionMode(false)
        }
    }

    function editNewAttraction({x, y, lat, lng, event}) {
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

    function submitAttraction(submittedAttraction) {
        if (newAttractionMode) {
            setAttractions([...attractions, submittedAttraction])
        } else {
            setAttractions(attractions.map(attraction => attraction.id == submittedAttraction.id ? submittedAttraction : attraction))
        }
        clearForm()
    }

    function clearForm() {
        setEditAttraction(null)
        setNewAttractionMode(false)
    }

    return (
        <>
            <div>{children}</div>
            <div style={defaultMapProps.dimensionStyle}>
                <GoogleMapReact bootstrapURLKeys={{ key: defaultMapProps.apiKey }}
                                defaultCenter={defaultMapProps.center}
                                defaultZoom={defaultMapProps.zoom}
                                onClick={editNewAttraction}>
                    {attractions.map(attraction => (
                        <Attraction key={attraction.id}
                                    lat={attraction.latitude} lng={attraction.longitude}
                                    attraction={attraction} selectCallback={editExistingAttraction}/>
                    ))}
                </GoogleMapReact>
            </div>
            {editAttraction && (
                <>
                    <i>{newAttractionMode ? 'New attraction details' : 'Existing attraction details'}</i>
                    <AttractionForm attraction={editAttraction}
                                    submitCallback={submitAttraction}
                                    cancelCallback={clearForm}/>
                </>
            )}
            {!editAttraction && (
                <button disabled={newAttractionMode}
                        onClick={e => setNewAttractionMode(true)}>
                    {newAttractionMode ? 'Now click on desired map location' : 'Click here to add a new attraction'}
                </button>
            )}
        </>
    )
}

export default AttractionsMap
