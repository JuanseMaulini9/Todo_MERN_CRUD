import {BrowserRouter, Route, Routes} from 'react-router-dom'
import RegisterPage from './pages/RegisterPage'
import LoginPage from './pages/LoginPage'
import { AuthProvider } from './context/AuthContext'

export default function App() {
  return(
    <AuthProvider>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<h1>Home page</h1>} />
        <Route path='/login' element={<LoginPage/>} />
        <Route path='/register' element={<RegisterPage />} />
        <Route path='/tasks' element={<h1>tasks page</h1>} />
        <Route path='/add-task' element={<h1>new task</h1>} />
        <Route path='/task/:id' element={<h1>update task</h1>} />
        <Route path='/profile' element={<h1>profile</h1>} />
      </Routes>
    </BrowserRouter>
    </AuthProvider>
  )
}