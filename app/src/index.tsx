import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import MyRecipeRoutes from './router/Routes'
import reportWebVitals from './reportWebVitals'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <React.StrictMode>
    <div className="bg-emerald-200 min-h-screen">
      <div className="spacing">
        <div className="px-8">
          <MyRecipeRoutes />
        </div>
      </div>
    </div>
  </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
