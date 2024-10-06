import { BrowserRouter,Routes,Route } from 'react-router-dom'
import { Home } from './Components/Home'
import './index.css'
import {Signup} from "./Components/Signup"
export const App = () => {
  const flag = true;
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home /> }></Route>
          <Route path='/signup' element={<Signup />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}
