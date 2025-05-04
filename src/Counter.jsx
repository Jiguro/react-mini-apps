import { useState } from 'react'

function Counter({label}) {
  const [count, setCount] = useState(0)

  return (
    <>
      <h3>{label}</h3>
      <button onClick={e => setCount(count - 1)}>-</button>
      <strong> {count} </strong>
      <button onClick={e => setCount(count + 1)}>+</button>
    </>
  )
}

export default Counter
