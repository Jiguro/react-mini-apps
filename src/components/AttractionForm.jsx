import { useState } from 'react'

function AttractionForm({attraction, submitCallback, cancelCallback}) {
    const [editAttraction, setEditAttraction] = useState(attraction)

    function submitAttraction(event) {
        event.preventDefault()
        submitCallback(editAttraction)
    }

    return (
        <>
            <form onSubmit={submitAttraction}>
                <input type='text' value={editAttraction.name}
                       onChange={e => setEditAttraction({...editAttraction, name: e.target.value})}/>
                <button type='submit'>Submit</button>
                <button onClick={cancelCallback}>Cancel</button>
            </form>
        </>
    )
}

export default AttractionForm
