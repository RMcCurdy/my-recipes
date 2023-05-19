import { useNavigate } from 'react-router-dom'

const NotFound = () => {
  const navigate = useNavigate()
  return (
    <>
      <div className="pt-10 text-4xl text-center font-coolvetica md:text-6xl lg:text-7xl">
        404: Page Not Found
      </div>
      <div
        onClick={() => navigate('my-recipes')}
        className="pt-8 text-lg text-center underline md:text-xl lg:text-2xl hover:cursor-pointer"
      >
        Back Home
      </div>
    </>
  )
}

export default NotFound
