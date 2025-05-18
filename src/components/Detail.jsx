import {useParams} from 'react-router'

function Detail() {
    let { id } = useParams()

    return (
        <h1>Detail of {id}</h1>
    )
}

export default Detail