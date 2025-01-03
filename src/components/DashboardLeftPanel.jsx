import NavigationComponent from "./NavigationComponent";
import classes from './DashboardLeftPanel.module.css';
import { useContext } from "react";
import { ReactContext } from "../context/ReactContext";

export default function() {
  const ctx = useContext(ReactContext);
  const isAdmin = ctx.user.yonetici;

  return (
    <div className={classes.leftPanel}>
      <h1 className={classes.leftPanelLabel}>
        {isAdmin ? "Admin Sayfası" : "Kullanıcı Sayfası"}
      </h1>
      <div className={classes.leftPanelUsername}>
        <p>@{ctx.user.kullaniciadi} {isAdmin && "- admin"}</p>
        <p className={classes.logoutButton} onClick={() => ctx.logout()}>Logout</p>
      </div>
      <div className={classes.leftPanelUsername}>
        <p>{ctx.user.ad} {ctx.user.soyad}</p>
      </div>

      <NavigationComponent />
    </div>
  );
}