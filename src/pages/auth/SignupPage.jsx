import { NavLink, Outlet, useNavigate } from 'react-router';
import classes from './Page.module.css'
import Button from '../../components/Button';
import { useContext, useState } from 'react';
import { ReactContext } from '../../context/ReactContext';
import ErrorState from '../../components/ErrorState';

export default function() {
  const ctx = useContext(ReactContext);
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [name, setName] = useState(''); 
  const [surname, setSurname] = useState(''); 
  const [username, setUsername] = useState(''); 
  const [password, setPassword] = useState(''); 

  async function signup() {
    setLoading(true);
    setError('');
    const response = await ctx.api.signup(name, surname, username, password);
    if (response.error) {
      setError(response.errorMsg);
    } else {
      navigate('/login');
    }
    setLoading(false);
  }

  return (
    <form className={classes.form}>
      {error && <ErrorState msg={error} />}

      <h1 className={classes.formTitle}>Hesap Oluştur</h1>

      <div className={classes.formInputCont}>
        <label className={classes.formLabel} htmlFor="name">Ad:</label>
        <input className={classes.formInput} id="name" name="name" value={name} onChange={(e) => setName(e.target.value)} />
      </div>
      <div className={classes.formInputCont}>
        <label className={classes.formLabel} htmlFor="surname">Soyad:</label>
        <input className={classes.formInput} id="surname" name="surname" value={surname} onChange={(e) => setSurname(e.target.value)} />
      </div>
      <div className={classes.formInputCont}>
        <label className={classes.formLabel} htmlFor="username">Kullanıcıadı:</label>
        <input className={classes.formInput} id="username" name="username" value={username} onChange={(e) => setUsername(e.target.value)} />
      </div>
      <div className={classes.formInputCont}>
        <label className={classes.formLabel} htmlFor="password">Şifre:</label>
        <input className={classes.formInput} type="password" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>
      <div className={classes.formInputCont}>
        <Button label={loading ? "İşleniyor ..." : "Hesap Oluştur"} type="Action" disabled={loading} onClick={signup}/>
      </div>
      <div className={classes.formInputCont}>
        <NavLink className={classes.link} to="/login">Giriş Yap</NavLink>
      </div>
    </form>
  );
}