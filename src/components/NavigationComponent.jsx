import { NavLink, useLocation } from "react-router";
import classes from './NavigationComponent.module.css';
import { useContext } from "react";
import { ReactContext } from "../context/ReactContext";

export default function() {
  const ctx = useContext(ReactContext);
  const location = useLocation();

  const isAdmin = ctx.user.yonetici;

  const adminNavLinks = [
    {link: "/dashboard/profil", label:"Profil"},
    {link: "/dashboard/sorular", label:"Sorular"},
  ];

  const userNavLinks = [
    {link: "/dashboard/profil", label:"Profil"},
    {link: "/dashboard/sinavlar", label:"Sınavlarım"},
    {link: "/dashboard/yeniSinav", label:"Yeni Sınav Başlat"},
  ];

  const navLinks = isAdmin ? adminNavLinks : userNavLinks;

  const navLinksElements = navLinks.map(
    item => 
      <NavLink
        key={item.link}
        className={classes.navLink}
        to={item.link}
        data-active={location.pathname == item.link || undefined}
      >
        {item.label}
      </NavLink>
  );

  return (
    <nav className={classes.nav}>
      {navLinksElements}
    </nav>
  );
}