import { createBrowserRouter } from "react-router-dom";
import App from "../app/App";
import { PATH_URL } from "../constants/cons";
import { Collection, Home, Popular, TopRated, UniqInfo } from "../pages";

const rotersAll = [
  {
    element: <App />,
    path: "/",
    children: [
      { element: <Home />,
        index:true
       },
      { element: <Popular />, path: PATH_URL.popular },
      { element: <UniqInfo />, path: PATH_URL.films + `/:filmID` },
      { element: <Collection />, path: PATH_URL.collection },
      { element: <TopRated />, path: PATH_URL.topRated },
    ],
  },
];

export const routes = createBrowserRouter(rotersAll);
