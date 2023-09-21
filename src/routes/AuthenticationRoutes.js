import { lazy } from 'react';

// project imports
import Loadable from 'ui-component/Loadable';
import MinimalLayout from 'layout/MinimalLayout';

// login option 3 routing
const LandingPage = Loadable(lazy(() => import('views/pages/landing/LandingPage')));
const Login = Loadable(lazy(() => import('views/pages/Login/Signin')));
const Register = Loadable(lazy(() => import('views/pages/Register/Signup')));

// ==============================|| AUTHENTICATION ROUTING ||============================== //

const AuthenticationRoutes = {
  path: '/',
  element: <MinimalLayout />,
  children: [
    {
      path: '/',
      element: <LandingPage />
    },
    {
      path: '/pages/login',
      element: <Login />
    },
    {
      path: '/pages/register',
      element: <Register />
    }
  ]
};

export default AuthenticationRoutes;
