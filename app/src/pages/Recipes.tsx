import { useEffect, useRef, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { getDatabase, ref, get } from 'firebase/database'
import firebase from 'firebase/compat/app'
import { DataContext } from '../context/DataContext'

const Recipes = () => {
  const navigate = useNavigate()
  const { data, setData } = useContext(DataContext)

  function handleClick(userId: string) {
    navigate(`/my-recipes/recipe/${userId}`)
  }

  const firebaseInitializedRef = useRef(false)

  useEffect(() => {
    if (firebase.apps.length) firebaseInitializedRef.current = true
  }, [])

  useEffect(() => {
    if (firebaseInitializedRef.current && !data) {
      const database = getDatabase()
      const dbRef = ref(database, `recipes`)
      get(dbRef).then((snapshot) => {
        setData(snapshot.val())
      })
    }
  }, [firebaseInitializedRef, data, setData])

  return (
    <div className="grid grid-cols-1 gap-4 py-4 md:grid-cols-2 lg:grid-cols-4">
      <div
        onClick={() => navigate('/my-recipes/add')}
        className="flex items-center justify-center py-8 text-center bg-white rounded-lg hover:cursor-pointer"
      >
        <div className="mr-2">New Recipe</div>
        <button className="text-xl">➕</button>
      </div>
      {data ? (
        Object.entries(data).map(([key, value]) => {
          return (
            <div key={key} className="bg-white rounded-lg">
              <div className="flex items-center justify-center h-32 overflow-hidden rounded-t-lg lg:h-64">
                <img className="w-full h-auto" src={value.image} alt="recipe" />
              </div>
              <div className="p-3">
                <div className="text-lg font-coolvetica lg:text-2xl">
                  {value.title}
                </div>
                <div>{value.subtitle}</div>
                <button
                  onClick={() => handleClick(value.id)}
                  className="px-3 py-2 mt-2 bg-green-300 rounded"
                >
                  Go to Recipe
                </button>
              </div>
            </div>
          )
        })
      ) : (
        <div>Fetching data...</div>
      )}
    </div>
  )
}

export default Recipes
