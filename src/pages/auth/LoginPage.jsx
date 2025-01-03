import { NavLink, Outlet } from 'react-router';
import classes from './Page.module.css'
import Button from '../../components/Button';
import { useContext, useState } from 'react';
import { ReactContext } from '../../context/ReactContext';
import ErrorState from '../../components/ErrorState';

export default function() {
  const ctx = useContext(ReactContext);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [username, setUsername] = useState(''); 
  const [password, setPassword] = useState(''); 

  async function login() {
    setLoading(true);
    setError('');
    const response = await ctx.api.login(username, password);
    if (response.error) {
      setError(response.errorMsg);
    } else {
      ctx.saveUser(response.kullanici)
      
    }
    setLoading(false);
  }

  return (
    <form className={classes.form}>
      {error && <ErrorState msg={error} />}

      <h1 className={classes.formTitle}>Giriş Yap</h1>

      <div className={classes.formInputCont}>
        <label className={classes.formLabel} htmlFor="username">Kullanıcıadı:</label>
        <input className={classes.formInput} id="username" name="username" value={username} onChange={(e) => setUsername(e.target.value)} />
      </div>
      <div className={classes.formInputCont}>
        <label className={classes.formLabel} htmlFor="password">Şifre:</label>
        <input className={classes.formInput} type="password" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>
      <div className={classes.formInputCont}>
        <Button label={loading ? "İşleniyor ..." : "Giriş Yap"} type="Action" disabled={loading} onClick={login}/>
      </div>
      <div className={classes.formInputCont}>
        <NavLink className={classes.link} to="/signup">Hesap Oluştur</NavLink>
      </div>
    </form>
  );
}