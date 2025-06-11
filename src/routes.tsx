import { Login } from "./pages/auth/Login";
import { Home } from "./pages/main/Home";
import { SignUp } from "./pages/auth/SignUp";
import { FindId } from "./pages/auth/FindId";
import { FindPw } from "./pages/auth/FindPw";
import { SetPw } from "./pages/auth/SetPw";
import { KakaoSignUp } from "./pages/auth/KakaoSignUp";

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
  },
  {
    path: "/kakaoSignUp",
    element: <KakaoSignUp />
  }
];

export default routes;
