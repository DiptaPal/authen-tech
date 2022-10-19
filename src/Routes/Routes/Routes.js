import Main from '../../layout/Main';
import ErrorPage from '../../components/ErrorPage';
import Home from "../../components/Home";
import Profile from "../../components/Profile";
import Wallet from "../../components/Wallet";
import Login from "../../components/Login";
import Register from "../../components/Register";
import { createBrowserRouter } from 'react-router-dom';
import PrivateRoutes from '../PrivateRoutes/PrivateRoutes';

export const routes = createBrowserRouter([
    {
      path: '/',
      element: <Main></Main>,
      errorElement: <ErrorPage></ErrorPage>,
      children: [
        {
          path: '/',
          element: <Home></Home>
        },
        {
          path: '/home',
          element: <Home></Home>
        },
        {
          path: '/profile',
          element: <PrivateRoutes><Profile></Profile></PrivateRoutes>
        },
        {
          path: '/wallet',
          element: <PrivateRoutes><Wallet></Wallet></PrivateRoutes>
        },
        {
          path: '/login',
          element: <Login></Login>
        },
        {
          path: '/register',
          element: <Register></Register>
        },

      ]
    }
  ])