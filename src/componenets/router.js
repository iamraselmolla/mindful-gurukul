import { createBrowserRouter } from "react-router-dom";
import Main from "./Main";
import Register from "./page/Register";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "/register",
        element: <Register />,
      },
    ],
  },
]);

export default router;
