import { useState } from 'react'
import './index.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div class="bg-blue-500 text-white p-4">
        <h1 class="text-2xl font-bold">Hello, Tailwind CSS!</h1>
        <p class="mt-2">This is a simple example of using Tailwind CSS in a React project.</p>
      </div>
    </>
  )
}

export default App
