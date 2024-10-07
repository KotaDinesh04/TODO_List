import { BrowserRouter,Routes,Route } from 'react-router-dom'
import { Home } from './Components/Home'
import './index.css'
import {Signup} from "./Components/Signup"
import { TodoList } from './Components/TodoList'
import { ActiveTodos } from './Components/ActiveTodos'
import { CompletedTodos } from './Components/CompletedTodos'
import { AllTodos } from './Components/AllTodos'
export const App = () => {
  const flag = true;
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home /> }></Route>
          <Route path='/signup' element={<Signup />}></Route>
          <Route path='/todolist' element={<TodoList />}></Route>
          <Route path='/displaytodo' element={<ActiveTodos />}></Route>
          <Route path='/completedtodos' element={<CompletedTodos /> }></Route>
          <Route path='/alltodos' element={<AllTodos />} ></Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}
