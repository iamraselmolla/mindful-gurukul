import { createBrowserRouter } from "react-router-dom";
import Main from "./Main";
import Register from "./page/Register";
import Login from "./page/Login";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/login",
        element: <Login />,
      },
    ],
  },
]);

export default router;
