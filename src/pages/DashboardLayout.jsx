import { Outlet, useLocation, useNavigate } from 'react-router';
import classes from './DashboardLayout.module.css'
import DashboardLeftPanel from '../components/DashboardLeftPanel';
import { useContext, useEffect } from 'react';
import { ReactContext } from '../context/ReactContext';

export default function() {
  const ctx = useContext(ReactContext);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname == '/') {
      if (ctx.user.yonetici) {
        navigate('/sorular');
      } else {
        navigate('/yeniSinav');
      }
    }
  }, [])
  
  return (
    <div className={classes.layout}>
      <DashboardLeftPanel />
      <div className={classes.outletCont}>
        <Outlet/>
      </div>
    </div>
  );
}