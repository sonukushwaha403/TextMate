
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { logout } from './features/userSlice';
import {useDispatch} from 'react-redux';
//pages
import Home from "./pages/home";
import Login from "./pages/login";
import Register from "./pages/register";
//demo-> import  {ChatIcon} from "./svg";

function App() {
  const dispatch = useDispatch();
  return (
    <div>
    <button onClick={()=>{ dispatch(logout());}}>logout</button>
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />}></Route>
        <Route exact path="/login" element={<Login />}></Route>
        <Route exact path="/register" element={<Register />}></Route>

      </Routes>
    </Router>
    </div>
  );
}
 
export default App;
