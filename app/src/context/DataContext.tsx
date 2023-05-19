import { createContext, useState } from 'react'

interface RecipeType {
  [key: string]: {
    id: string
    title: string
    subtitle: string | null
    ingredients: { id: number; value: string }[]
    instructions: { id: number; value: string }[]
    image: string
    url: string | null
    comments: string | null
  }
}

interface DataContextType {
  data: RecipeType | null
  setData: (value: RecipeType | null) => void
}

// Create a new context
export const DataContext = createContext<DataContextType>({
  data: null,
  setData: (value: RecipeType | null) => {},
})

// Create a provider component
export const DataProvider = ({ children }: any) => {
  const [data, setData] = useState<RecipeType | null>(null)

  return (
    <DataContext.Provider value={{ data, setData }}>
      {children}
    </DataContext.Provider>
  )
}
