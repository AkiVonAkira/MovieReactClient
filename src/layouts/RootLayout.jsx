import { NavLink, Outlet } from "react-router-dom";

export default function RootLayout() {
  return (
    <div className="root-layout">
      <header>
        <nav>
          <h1>10/10 Movies</h1>
          <NavLink to="/">Home</NavLink>
          <NavLink to="user">User</NavLink>
          <NavLink to="movies">Movies</NavLink>
        </nav>
      </header>

      <main>
        <Outlet />
      </main>
    </div>
  );
}
