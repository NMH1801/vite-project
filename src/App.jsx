import { Provider } from 'react-redux'
import './App.css'
import TodoApp from './bindings/TodoApp'
import store from './redux/store'

export default function App() {
  return (
    <TodoApp />
  )
}

