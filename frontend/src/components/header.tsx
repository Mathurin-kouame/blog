import { NavLink } from "react-router-dom"
import { User } from "../shared/data-access/api/models/user"
import { useAuthStore } from "../shared/data-access/store/auth.store"


const GuestHeader = () => {
  return (
    <nav className="navbar navbar-light">
      <div className="container">
        <a className="navbar-brand" href="/">conduit</a>
        <ul className="nav navbar-nav pull-xs-right">
          <li className="nav-item">
            <NavLink className={({ isActive }) => isActive ? 'active nav-link' : 'nav-link'} to="/">Home</NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="login" className={({ isActive }) => isActive ? 'active nav-link' : 'nav-link'}>Sign in</NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="register" className={({ isActive }) => isActive ? 'active nav-link' : 'nav-link'}>Sign up</NavLink>
          </li>
        </ul>
      </div>
    </nav>
  )
}

const UserHeader = ({ user }: { user: User | undefined }) => {
  return (
    <nav className="navbar navbar-light">
      <div className="container">
        <a className="navbar-brand" href="/">conduit</a>
        <ul className="nav navbar-nav pull-xs-right">
          <li className="nav-item">
            <NavLink className={({ isActive }) => isActive ? 'active nav-link' : 'nav-link'} to="/">Home</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className={({ isActive }) => isActive ? 'active nav-link' : 'nav-link'} to="/editor"> <i className="ion-compose"></i>&nbsp;New Article </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className={({ isActive }) => isActive ? 'active nav-link' : 'nav-link'} to="/settings"> <i className="ion-gear-a"></i>&nbsp;Settings </NavLink>
          </li>
          <li className="nav-item">
            <NavLink reloadDocument className={({ isActive }) => isActive ? 'active nav-link' : 'nav-link'} to={`/profile/${user?.username}`}>
              <img src={user?.image} className="user-pic" />
              {user?.username}
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  )
}



export const Header = () => {

  const { isAuthenticated, user } = useAuthStore();

  return (
    <>
      {
        isAuthenticated ? <UserHeader user={user} /> : <GuestHeader />
      }
    </>
  )
}
