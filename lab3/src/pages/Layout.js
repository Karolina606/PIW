import { Outlet, Link } from "react-router-dom";

const Layout = () => {
  return (
      <>
        <nav class="navbar navbar-dark bg-dark">
            {/* <div class="collapse navbar-collapse" id="navbarNav"> */}
              <ul>
                  <li class="nav-item">
                      <Link to="/announcements">Ogłoszenia par</Link>
                  </li>
                  <li class="nav-item">
                      <Link to="/addForm">Dodaj ogłoszenie pary</Link>
                  </li>
                  <li class="nav-item">
                      <Link to="/groupAnnouncements">Ogłoszenia grup</Link>
                  </li>
                  <li class="nav-item">
                      <Link to="/groupAddForm">Dodaj ogłoszenie grupy</Link>
                  </li>
              </ul>
          </nav>
        <Outlet />
      </>
  )
};

export default Layout;