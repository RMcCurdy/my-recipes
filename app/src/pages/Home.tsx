import { useState, useContext } from 'react'
import { AuthContext } from '../context/AuthContext'

const Home = () => {
  const { authenticated, setAuthenticated } = useContext(AuthContext)

  const [value, setValue] = useState<string>('')
  const [invalid, setInvalid] = useState<boolean>(false)
  const [time, setTime] = useState<string>('')

  function handleClick(value: string) {
    setTime(new Date().toLocaleTimeString())
    if (value.toLowerCase() === 'marcia1234') {
      setAuthenticated(true)
    } else {
      setInvalid(true)
    }
  }

  return (
    <>
      <div className="pt-10 text-center font-coolvetica text-4xl md:text-6xl lg:text-7xl">
        Welcome to the wonderful world of Marcia and Robert's recipes!
      </div>
      {!authenticated && (
        <>
          <div className="pt-8 text-center text-lg md:text-xl lg:text-2xl">
            Please enter the password below to view the website
          </div>
          <div className="flex items-center justify-center mt-10">
            <input
              className="mr-2"
              type="text"
              onChange={(e) => setValue(e.target.value)}
            />
            <button
              className="border px-2 py-1 rounded border-black"
              onClick={() => handleClick(value)}
            >
              Enter
            </button>
          </div>
        </>
      )}

      <div className="flex items-center justify-center mt-2">
        {invalid && !authenticated && (
          <div className="text-red-500">Wrong password ({time})</div>
        )}
        {authenticated && (
          <div className="text-green-800 text-xl mt-10">
            Login successful. You can now view the website
          </div>
        )}
      </div>
    </>
  )
}

export default Home
