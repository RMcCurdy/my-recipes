import { useContext } from 'react'
import logo from '../images/logo.png'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'

const Header = () => {
  const { authenticated } = useContext(AuthContext)
  const navigate = useNavigate()
  return (
    <>
      <div className="items-center justify-between px-8 py-4 text-lg md:flex">
        <div
          onClick={() => navigate('/my-recipes')}
          className="flex items-center justify-center mb-2 text-2xl md:mb-0 font-rochaline hover:cursor-pointer"
        >
          <img className="w-10 mx-2" src={logo} alt="Recipe Icon" />
          <div className="mx-2">Let's Cook!</div>
        </div>
        <nav>
          <ul className="flex justify-center space-x-8 text-sm font-light md:text-base lg:text-lg">
            <li
              className="hover:underline hover:cursor-pointer"
              onClick={() =>
                authenticated
                  ? navigate('/my-recipes/recipes')
                  : navigate('/my-recipes')
              }
            >
              Recipes
            </li>
            <li
              className="hover:underline hover:cursor-pointer"
              onClick={() =>
                authenticated
                  ? navigate('/my-recipes/calculator')
                  : navigate('/my-recipes')
              }
            >
              Ingredients Calculator
            </li>
          </ul>
        </nav>
      </div>
      <hr className="border-gray-800" />
    </>
  )
}

export default Header
