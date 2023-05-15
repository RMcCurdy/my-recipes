import { getDatabase, ref, set } from 'firebase/database'

const NewRecipe = () => {
  function handleAddNewRecipe() {
    console.log('adding')
    const today = new Date()
    const month = today.getMonth() + 1 // JavaScript counts months from 0, so add 1
    const day = today.getDate()
    const year = today.getFullYear()
    const database = getDatabase()
    const dbRef = ref(database, `recipes/shrimpRiceWraps${month}${day}${year}`)
    console.log('got database')
    // Set data at the location
    set(dbRef, {
      id: `shrimpRiceWraps${month}${day}${year}`,
      title: 'Shrimp Rice Wraps',
      subtitle: 'These are some good ass wraps',
      ingredients: ['1 cup of peanut butter', 'Bag of frozen shrimp'],
      instructions: ['Boil water', 'Make sauce', 'Unfreeze shrimp'],
      image:
        'https://therecipecritic.com/wp-content/uploads/2020/01/Shrimp-Spring-Rolls-1.jpg',
    })
    console.log('end')
  }

  return (
    <div>
      <div>New Recipe time</div>
      <button onClick={() => handleAddNewRecipe()}>Add</button>
    </div>
  )
}

export default NewRecipe
