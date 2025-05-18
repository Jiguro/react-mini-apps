import { AccessibilityRating } from "./Attractions"
import './Attraction.css'

function Attraction(props) {

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
                        stroke={getRatingColor(props.attraction.accessibilityRating)} />
            </svg>
            <span>{props.attraction.name}</span>
        </>
    )
}

export default Attraction
