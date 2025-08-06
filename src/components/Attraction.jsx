import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWheelchair, faEye, faEarDeaf } from '@fortawesome/free-solid-svg-icons';

import { AccessibilityRating, AccessibilityType } from './Enums'
import './Attraction.css'

function getRatingColor(rating) {
    switch(rating) {
        case AccessibilityRating.GOOD: return 'green'
        case AccessibilityRating.NEUTRAL: return 'blue'
        default: return 'red'
    }
}

function Attraction({attraction, selectCallback}) {

    return (
        <>
            <div className={'icon-box ' + attraction.accessibilityRating.toLowerCase()}>
                {attraction.accessibilityType == AccessibilityType.MOBILITY
                    && (<FontAwesomeIcon icon={faWheelchair} size="3x" color={getRatingColor(attraction.accessibilityRating)} />)}
                {attraction.accessibilityType == AccessibilityType.VISION
                    && (<FontAwesomeIcon icon={faEye} size="3x" color={getRatingColor(attraction.accessibilityRating)} />)}
                {attraction.accessibilityType == AccessibilityType.AUDIO
                    && (<FontAwesomeIcon icon={faEarDeaf} size="3x"color={getRatingColor(attraction.accessibilityRating)} />)}
            </div>
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
