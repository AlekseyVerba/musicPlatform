import React from "react"
import { Link, useLocation, NavLink } from "react-router-dom"
import { useActions } from "../../hooks/useActions"
import { useTypedSelector } from "../../hooks/useTypedSelector"
import "./index.scss"

const NavBar: React.FC = () => {

  const { pathname } = useLocation()
  const { isAuth, user: {_id} } = useTypedSelector(state => state.user)
  const { actionLogout } = useActions()
  // {pathname.indexOf("tracks") !== -1 ? "nav-link active" : "nav-link"}
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">Музыкальная платформа</Link>

        <div className="collapse navbar-collapse" id="navbarColor01">
          <ul className="navbar-nav navbar-nav--wrapper me-auto">
            <div className="navbar-nav me-auto navbar-nav__left">
              <li className="nav-item">
                <NavLink className={(navData) => navData.isActive ? "nav-link active" : "nav-link"} to={"/tracks"}>Треки</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className={(navData) => navData.isActive ? "nav-link active" : "nav-link"} to={"/albums"}>Альбомы</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className={(navData) => navData.isActive ? "nav-link active" : "nav-link"} to={"/users"}>Пользователи</NavLink>
              </li>
              

              {
                isAuth ?
                <>
                  <li className="nav-item">
                    <NavLink className={(navData) => navData.isActive ? "nav-link active" : "nav-link"} to={`/users/${_id}`}>Мой профиль</NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className={(navData) => navData.isActive ? "nav-link active" : "nav-link"} to={"/my-friends-tracks"}>Новые песни моих друзей</NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className={(navData) => navData.isActive ? "nav-link active" : "nav-link"} to={"/my-tracks"}>Мои песни</NavLink>
                  </li>
                </>
                  
                  :

                  null
              }



            </div>
            <div className="navbar-nav__right">
              {isAuth ?
               <li className="nav-item">
               <a href="" onClick={actionLogout} className="nav-link">Выйти</a>
             </li>
              :
              <li className="nav-item">
                <Link className={pathname.indexOf("auth") !== -1 ? "nav-link active" : "nav-link"} to={"/auth/login"}>Войти</Link>
              </li>
            }
              
            </div>
          </ul>
        </div>
      </div>
    </nav>
  )

}

export default NavBar