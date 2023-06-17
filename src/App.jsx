import {
  createBrowserRouter,
  Route,
  createRoutesFromElements,
  RouterProvider
} from "react-router-dom";
import GlobalStyles from "./GlobalStyles";

// Pages
import Home from "./pages/Home";
import User from "./pages/User";
import Movies from "./pages/Movies";
import NotFound from "./pages/NotFound";

// Layouts
import RootLayout from "./layouts/RootLayout";

const routes = createRoutesFromElements(
  <Route path="/" element={<RootLayout />}>
    <Route index element={<Home />} />
    <Route path="user/" element={<User />} />
    <Route path="movies" element={<Movies />} />
    <Route path="*" element={<NotFound />} />
  </Route>
);

const router = createBrowserRouter(routes);

function App() {
  return (
    <>
      <GlobalStyles />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
