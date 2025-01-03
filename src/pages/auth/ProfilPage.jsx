import classes from './Page.module.css'
import Button from '../../components/Button';
import { useContext, useState } from 'react';
import { ReactContext } from '../../context/ReactContext';
import ErrorState from '../../components/ErrorState';
import PageLabel from '../../components/PageLabel';

export default function() {
  const ctx = useContext(ReactContext);
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [name, setName] = useState(ctx.user.ad); 
  const [surname, setSurname] = useState(ctx.user.soyad); 
  const [password, setPassword] = useState(''); 

  async function guncelle() {
    setLoading(true);
    setError('');
    const response = await ctx.api.kullaniciGuncelle(ctx.user.token, name, surname, password);
    if (response.error) {
      setError(response.errorMsg);
    } else {
      ctx.saveUser({...ctx.user, ...response.kullanici});
    }
    setLoading(false);
  }

  return (
    <>
      <div className={classes.layout}>
        <PageLabel label="Profil" />
        <form className={`${classes.form} ${classes.profilGuncellemeForm}`}>
          {error.length > 0 && <ErrorState msg={error} />}

          <h1 className={classes.formTitle}>Profil Güncelle</h1>

          <div className={classes.formInputCont}>
            <label className={classes.formLabel} htmlFor="name">Ad:</label>
            <input className={classes.formInput} id="name" name="name" value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div className={classes.formInputCont}>
            <label className={classes.formLabel} htmlFor="surname">Soyad:</label>
            <input className={classes.formInput} id="surname" name="surname" value={surname} onChange={(e) => setSurname(e.target.value)} />
          </div>
          <div className={classes.formInputCont}>
            <label className={classes.formLabel} htmlFor="password">Şifre:</label>
            <input className={classes.formInput} type="password" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <div className={classes.formInputCont}>
            <Button label={loading ? "İşleniyor ..." : "Profil Güncelle"} type="Action" disabled={loading} onClick={guncelle}/>
          </div>
        </form>
      </div>
    </>
  );
}