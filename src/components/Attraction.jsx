import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWheelchair, faEye, faEarDeaf } from '@fortawesome/free-solid-svg-icons';

import { AccessibilityRating, AccessibilityType } from './Enums'
import './Attraction.css'

function getRatingColor(rating) {
    switch(rating) {
        case AccessibilityRating.Positive: return 'green'
        case AccessibilityRating.Neutral: return 'blue'
        default: return 'red'
    }
}

function Attraction({attraction, selectCallback}) {

    return (
        <>
            {attraction.accessibilityType == AccessibilityType.Mobility
                && (<FontAwesomeIcon icon={faWheelchair} size="3x" color={getRatingColor(attraction.accessibilityRating)} />)}
            {attraction.accessibilityType == AccessibilityType.Vision
                && (<FontAwesomeIcon icon={faEye} size="3x" color={getRatingColor(attraction.accessibilityRating)} />)}
            {attraction.accessibilityType == AccessibilityType.Audio
                && (<FontAwesomeIcon icon={faEarDeaf} size="3x"color={getRatingColor(attraction.accessibilityRating)} />)}

            <a onClick={e => selectCallback(attraction)}>{attraction.name}</a>
            <span>
                Type: <strong>{attraction.accessibilityType}</strong>
                <br/>
                Severity: <strong>{attraction.severity}</strong>
                <br/>
                Rating: <strong className={attraction.accessibilityRating.toLowerCase()}>{attraction.accessibilityRating}</strong>
            </span>
        </>
    )
}

export default Attraction
export { getRatingColor }
