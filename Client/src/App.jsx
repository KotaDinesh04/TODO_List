import { BrowserRouter,Routes,Route } from 'react-router-dom'
import { Home } from './Components/Home'
import './index.css'
import {Signup} from "./Components/Signup"
import { TodoList } from './Components/TodoList'
export const App = () => {
  const flag = true;
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home /> }></Route>
          <Route path='/signup' element={<Signup />}></Route>
          <Route path='/todolist' element={<TodoList />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}
