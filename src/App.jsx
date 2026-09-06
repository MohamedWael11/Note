import { createBrowserRouter, RouterProvider } from "react-router-dom";
import  Home from './components/Home/Home'
import Login from './components/Login/Login'
import  Signup from './components/Signup/Signup'
import Layout from "./components/Layout/Layout";
import UserContextProvider from "./components/Context/Context";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";



function App() {
  const router = createBrowserRouter([
    {path:'',element:<Layout/>,children:[ 
       {index:true, element: <ProtectedRoute><Home /></ProtectedRoute> },
      { path: "login", element: <Login /> },
      { path: "signup", element: <Signup />}]}
    ]);
  return (
    
    <UserContextProvider>
       <RouterProvider router={router} />
    </UserContextProvider>
     
  
  );
}
export default App;