import { createBrowserRouter, Routes, Route, RouterProvider } from 'react-router-dom';
import './App.css';
import Username from "./components/Username";
import Login from "./components/Login";
import Register from './components/Register';
import Profile from './components/Profile';
import PageNotFound from "./components/PageNotFound"
import Recovery from './components/Recovery';
import Password from "./components/Password"
import Reset  from './components/Reset';
const router = createBrowserRouter([
  {
    path: "/",
    element: <Username></Username>,
  },
  {
    path: "/register",
    element: <Register></Register>,
  },
  {
    path: "/login",
    element: <Login></Login>,
  },
  {
    path: "/profile",
    element: <Profile></Profile>,
  },
  {
    path: "/recovery",
    element: <Recovery></Recovery>,
  },
  {
    path: "/reset",
    element: <Reset></Reset>,
  },
  {
    path: "/password",
    element: <Password></Password>
  },
  {
    path: "/*",
    element: <PageNotFound></PageNotFound>,
  },
]);


function App() {
  return (
    <main className="app">
        <RouterProvider router={router}></RouterProvider>
    </main>
  );
}

export default App;
