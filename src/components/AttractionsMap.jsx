import { useState, useEffect, useRef } from 'react'
import GoogleMapReact from 'google-map-react'
import { useAuth0 } from '@auth0/auth0-react'

import Attraction from './Attraction'
import AttractionForm from './AttractionForm'

const defaultMapProps = {
    apiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    center: { // Madrid For Refugees office
      lat: 40.407147,
      lng: -3.708679
    },
    zoom: 13,
    dimensionStyle: {
        height: '50vh',
        width: '100%'
    }
}

function AttractionsMap({children, initialAttractions, fetchAnewCallback}) {
    const [attractions, setAttractions] = useState([])
    const [editAttraction, setEditAttraction] = useState(null)
    const [newAttractionMode, setNewAttractionMode] = useState(false)
    const editFormRef = useRef()
    const { isAuthenticated, getAccessTokenSilently } = useAuth0();

    useEffect(() => {
        setAttractions(initialAttractions)
    }, [initialAttractions]);

    function editExistingAttraction(attraction) {
        if (!newAttractionMode && !editAttraction && attraction) {
            setEditAttraction(attraction)
            setNewAttractionMode(false)
        }
    }

    function clickOnMap({x, y, lat, lng, event}) {
        let [roundedLat, roundedLng] = [lat.toFixed(5), lng.toFixed(5)]
        if (newAttractionMode && !editAttraction) {
            setEditAttraction({
                id: crypto.randomUUID(),
                name: "",
                latitude: roundedLat,
                longitude: roundedLng,
                accessibilityType: null,
                severity: null,
                accessibilityRating: null
            })
        } else if (editAttraction) {
            editFormRef.current.changeGpsLocation(roundedLat, roundedLng);
        }
    }

    function submitAttraction(submittedAttraction) {
        if (newAttractionMode) {
            var newAttractionRequest = {
                attractionName: submittedAttraction.name,
                attractionLongitude: submittedAttraction.longitude,
                attractionLatitude: submittedAttraction.latitude,
                disabilityType: submittedAttraction.accessibilityType,
                ratingLevel: submittedAttraction.accessibilityRating
            }

            getAccessTokenSilently().then(accessToken => {
                fetch(`${import.meta.env.VITE_TRAVEL_APP_BACKEND_BASE_URL}/attraction`,
                    {
                        method: "POST",
                        headers: {
                            "Authorization": `Bearer ${accessToken}`,
                            "content-type": "application/json",
                        },
                        body: JSON.stringify(newAttractionRequest),
                    }
                ).then(response => fetchAnewCallback(Date.now()))
                .catch(error => console.error(error));
            });
        } else {
            window.alert("Updating an existing attraction has not yet been implemented!")
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
                                onClick={clickOnMap}>
                    {attractions.map(attraction => (
                        <Attraction key={attraction.id}
                                    lat={attraction.latitude} lng={attraction.longitude}
                                    attraction={attraction} selectCallback={editExistingAttraction}/>
                    ))}
                </GoogleMapReact>
            </div>
            {isAuthenticated && editAttraction && (
                <>
                    <i>{newAttractionMode ? 'New attraction details' : 'Existing attraction details'}</i>
                    <AttractionForm attraction={editAttraction}
                                    submitCallback={submitAttraction}
                                    cancelCallback={clearForm}
                                    ref={editFormRef}/>
                </>
            )}
            {isAuthenticated && !editAttraction && (
                <button disabled={newAttractionMode}
                        onClick={e => setNewAttractionMode(true)}>
                    {newAttractionMode ? 'Now click on desired map location' : 'Click here to add a new attraction'}
                </button>
            )}
        </>
    )
}

export default AttractionsMap
export {defaultMapProps}
