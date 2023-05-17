import { NavLink, Outlet } from "react-router-dom";

export default function MovieLayout() {
  return (
    <div className="movie-layout">
      <h2>Movies</h2>
      <p>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nulla, fugit!
      </p>

      <nav>
        <NavLink to="genres">View the Genres</NavLink>
      </nav>

      <Outlet />
    </div>
  );
}
