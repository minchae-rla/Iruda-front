import { Login } from "./pages/main/Login";
import { Home } from "./pages/main/Home";
import { SignUp } from "./pages/main/SignUp";

const routes = [
  {
    path: "/",
    element: <Login/>
  },
  {
    path: "/home",
    element: <Home/>
  },
  {
    path: "/signup",
    element: <SignUp />,
  }
];

export default routes;
