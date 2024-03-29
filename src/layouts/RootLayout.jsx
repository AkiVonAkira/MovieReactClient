import { NavLink, Outlet } from "react-router-dom";
import styled from "styled-components";

const RootLayoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background: var(--secondary);
`;

const Nav = styled.nav`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 1em;
  align-items: center;
`;

const NavLinkStyled = styled(NavLink)`
  flex-grow: 1;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  padding: 1em;
  border-radius: 4px;
  color: white;
  transition: background 0.3s;

  &.active {
    background: var(--primary);
    box-shadow: 0 10px 20px -15px black;
  }

  &:hover {
    background: rgba(255, 255, 255, 0.1);
    box-shadow: 0 10px 20px -15px black;
  }
`;

const Main = styled.main`
  max-width: 1200px;
  margin: 40px auto;
`;

const RootLayout = () => {
  return (
    <RootLayoutContainer>
      <Header>
        <h1 className="text-3xl font-bold ">10/10 Movies</h1>
        <Nav>
          <NavLinkStyled to="/" activeclassname="active" exact="true">
            Home
          </NavLinkStyled>
          <NavLinkStyled to="/user" activeclassname="active">
            User
          </NavLinkStyled>
          <NavLinkStyled to="/movies" activeclassname="active">
            Movies
          </NavLinkStyled>
        </Nav>
      </Header>

      <Main>
        <Outlet />
      </Main>
    </RootLayoutContainer>
  );
};

export default RootLayout;
