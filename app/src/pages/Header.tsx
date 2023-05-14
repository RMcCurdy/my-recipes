import logo from '../images/logo.png'
import { useNavigate } from 'react-router-dom'

const Header = () => {
  const navigate = useNavigate()
  return (
    <>
      <div className="px-8 py-4 md:flex items-center justify-between text-lg">
        <div
          onClick={() => navigate('')}
          className="flex items-center justify-center mb-2 md:mb-0 font-rochaline text-2xl hover:cursor-pointer"
        >
          <img className="w-10 mx-2" src={logo} alt="Recipe Icon" />{' '}
          <div className="mx-2">Let's Cook!</div>
        </div>
        <nav>
          <ul className="font-light flex justify-center space-x-8">
            <li
              className="hover:underline hover:cursor-pointer"
              onClick={() => navigate('recipes')}
            >
              Recipes
            </li>
            <li
              className="hover:underline hover:cursor-pointer"
              onClick={() => navigate('calculator')}
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