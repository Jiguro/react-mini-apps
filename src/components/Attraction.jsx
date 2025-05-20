import { AccessibilityRating } from './Enums'
import './Attraction.css'

function Attraction({attraction, selectCallback}) {

    function getRatingColor(rating) {
        if (rating == AccessibilityRating.Positive) {
            return 'green'
        } else if (rating == AccessibilityRating.Neutral) {
            return 'blue'
        } else {
            return 'red'
        }
    }

    return (
        <>
            <svg height="30" width="30" xmlns="http://www.w3.org/2000/svg">
                <circle r="10" cx="15" cy="15" strokeWidth="5" fill="none"
                        stroke={getRatingColor(attraction.accessibilityRating)} />
            </svg>
            <a onClick={e => selectCallback(attraction)}>{attraction.name}</a>
            <span>
                Type: <strong>{attraction.accessibilityType}</strong>
                <br/>
                Severity: <strong>{attraction.severity}</strong>
                <br/>
                Rating: <strong>{attraction.accessibilityRating}</strong>
            </span>
        </>
    )
}

export default Attraction
