import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import { routes } from "./routes/router";

createRoot(document.getElementById("root")).render(
  <ChakraProvider>
    <RouterProvider router={routes} />
  </ChakraProvider>
);
