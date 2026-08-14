import { Routes, Route } from 'react-router'
import { HomePage } from './Components/HomePape'
import './App.css'

function App() {

  return (
    <Routes>
      <Route path='' element={<HomePage />}></Route>
    </Routes>
  );
}

export default App
