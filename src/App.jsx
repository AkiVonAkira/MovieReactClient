import { useState } from "react";
import {
  createBrowserRouter,
  Route,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import GlobalStyles from "./GlobalStyles";

// Pages
import Home from "./pages/Home";
import User from "./pages/User";
import NotFound from "./pages/NotFound";

// Layouts
import RootLayout from "./layouts/RootLayout";
import MovieLayout from "./layouts/MovieLayout";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<Home />} />
      <Route path="user" element={<User />} />
      <Route path="movies" element={<MovieLayout />} />

      <Route path="*" element={<NotFound />} />
    </Route>
  )
);

function App() {
  return (
    <>
      <GlobalStyles />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
