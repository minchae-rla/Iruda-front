import { Home } from "./pages/main/Home";
import Login from "./pages/main/Login";
import { SignUp } from "./pages/main/SignUp";

const routes = [
  {
    path: "/",
    element: <Home/>
  },
  {
    path: "/login",
    element: <Login/>
  },
  {
    path: "/signup",
    element: <SignUp />,
  },

];

export default routes;
