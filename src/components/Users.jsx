import {Link} from 'react-router'

function Users() {

    const myUsers = [
        {
            name: "Tri"
        },
        {
            name: "Vika"
        }
    ]

    return(
        <>
            <h1>Users</h1>
            <ul>
            {myUsers.map(user => (
                <Link to={'/react-mini-apps/article/' + user.name}><li>{user.name}</li></Link>
            ))}
        </ul>
      </>
    )

}

export default Users