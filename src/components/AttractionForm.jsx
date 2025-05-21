import React, { useState, forwardRef, useImperativeHandle } from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil, faWheelchair, faEye, faEarDeaf, faThumbsUp, faHandPeace, faThumbsDown } from '@fortawesome/free-solid-svg-icons';

import { AccessibilityType, MobilitySeverity, VisionSeverity, AudioSeverity, AccessibilityRating } from './Enums'
import { getRatingColor } from './Attraction'
import './AttractionForm.css'

function getSeverityEnum(accType) {
    switch(accType) {
        case AccessibilityType.Mobility: return MobilitySeverity
        case AccessibilityType.Vision: return VisionSeverity
        default: return AudioSeverity
    }
}

function getTypeIcon(accType) {
    switch(accType) {
        case AccessibilityType.Mobility: return faWheelchair
        case AccessibilityType.Vision: return faEye
        default: return faEarDeaf
    }
}

function getRatingIcon(accRat) {
    switch(accRat) {
        case AccessibilityRating.Positive: return faThumbsUp
        case AccessibilityRating.Neutral: return faHandPeace
        default: return faThumbsDown
    }
}

const AttractionForm = forwardRef((props, ref) => {
    const [editAttraction, setEditAttraction] = useState(props.attraction)
    const [currentType, setCurrentType] = useState(props.attraction.accessibilityType)
    const [gpsLocationMode, setGpsLocationMode] = useState(false)

    function submitAttraction(event) {
        event.preventDefault()
        props.submitCallback(editAttraction)
    }

    function switchAccessibilityType(accType) {
        setCurrentType(accType)
        setEditAttraction({...editAttraction, accessibilityType: accType})
    }

    const changeGpsLocation = (lat, lng) => {
        if (gpsLocationMode) {
            setEditAttraction({...editAttraction, latitude: lat, longitude: lng})
            setGpsLocationMode(false)
        }
    } 

    useImperativeHandle(ref, () => ({
        changeGpsLocation
    }));

    return (
        <>
            <form onSubmit={submitAttraction}>
                <input type='text' value={editAttraction.name} required
                       onChange={e => setEditAttraction({...editAttraction, name: e.target.value})}/>
                <br/>
                <span>GPS latitude=<strong>{editAttraction.latitude}</strong> | longitude=<strong>{editAttraction.longitude}</strong></span>
                {gpsLocationMode
                    ? (<><br/><i>(Click on map to choose location!)</i></>)
                    : (<FontAwesomeIcon icon={faPencil} onClick={e => setGpsLocationMode(true)}/>)}
                <br/>
                {Object.keys(AccessibilityType).map(accType => (
                    <label key={'accType-' + accType}>
                        <input type='radio' value={accType} name='accType' required
                               checked={accType == editAttraction.accessibilityType}
                               onChange={e => switchAccessibilityType(accType)}/>
                        {accType} <FontAwesomeIcon icon={getTypeIcon(accType)}/>
                    </label>
                ))}
                <br/>
                {Object.keys(getSeverityEnum(currentType)).map(sev => (
                    <label key={'sev-' + sev}>
                        <input type='radio' value={sev} name={'sev' + currentType} required
                               checked={sev == editAttraction.severity}
                               onChange={e => setEditAttraction({...editAttraction, severity: sev})}/>
                        {sev}
                    </label>
                ))}
                <br/>
                {Object.keys(AccessibilityRating).map(accRat => (
                    <label key={'accRat-' + accRat}>
                        <input type='radio' value={accRat} name='accRat' required
                               checked={accRat == editAttraction.accessibilityRating}
                               onChange={e => setEditAttraction({...editAttraction, accessibilityRating: accRat})}/>
                        {accRat} <FontAwesomeIcon icon={getRatingIcon(accRat)} color={getRatingColor(accRat)}/>
                    </label>
                ))}
                <br/>
                <button type='submit'>Submit</button>
                <button onClick={props.cancelCallback}>Cancel</button>
            </form>
        </>
    )
});

export default AttractionForm
export { getSeverityEnum, getTypeIcon, getRatingIcon }
