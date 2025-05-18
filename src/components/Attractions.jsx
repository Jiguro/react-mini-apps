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
    const defaultMapProps = {
        apiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
        center: { // Louvre museum
          lat: 48.861027,
          lng: 2.335708
        },
        zoom: 12,
        hoverDistance: 10
    }

    return (
        <>
            <h1>Attractions suitable for disabled visitors</h1>
            <div style={{ height: '100vh', width: '100%' }}>
                <GoogleMapReact bootstrapURLKeys={{ key: defaultMapProps.apiKey }}
                                defaultCenter={defaultMapProps.center}
                                defaultZoom={defaultMapProps.zoom}>
                    {attractions.map(attraction => (
                        <Attraction lat={attraction.latitude} lng={attraction.longitude}
                                    key={attraction.id} attraction={attraction}/>
                    ))}
                </GoogleMapReact>
            </div>
        </>
    )
}

export default Attractions
export {AccessibilityType, MobilitySeverity, VisionSeverity, AudioSeverity, AccessibilityRating}
