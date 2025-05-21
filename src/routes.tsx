import { Login } from "./pages/main/Login";
import { Home } from "./pages/main/Home";
import { SignUp } from "./pages/main/SignUp";
import { FindId } from "./pages/main/FindId";
import { FindPw } from "./pages/main/FindPw";
import { SetPw } from "./pages/main/SetPw";

const routes = [
  {
    path: "/",
    element: <Login />
  },
  {
    path: "/home",
    element: <Home />
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "/findId",
    element: <FindId />
  },
  {
    path: "/findPw",
    element: <FindPw />
  },
    {
    path: "/setPw",
    element: <SetPw />
  }
];

export default routes;
