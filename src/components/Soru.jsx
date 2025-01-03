import { useState } from 'react';
import classes from './Soru.module.css';

export default function({soruIdx, soru, dogruCevap, value, setValue}) {
  return (
    <div className={classes.soru}>
      <div className={classes.soruCont}>
        <p> Soru {soruIdx + 1}: </p>
        <h1>{soru.soru}</h1>
        {soru.resim && <img className={classes.resim} src={soru.resim} />}
      </div>
      <form className={classes.cevaplar}>
        <div className={classes.cevapCont}>
          <input type="radio" name={soru.id} value="a" id={`${soru.id}-a`} checked={value=="a"} onChange={(e) => setValue(soruIdx, e.target.value)} disabled={dogruCevap}/>
          <label htmlFor={`${soru.id}-a`}>A - {soru.a}</label>
        </div>
        <div className={classes.cevapCont}>
          <input type="radio" name={soru.id} value="b" id={`${soru.id}-b`} checked={value=="b"} onChange={(e) => setValue(soruIdx, e.target.value)} disabled={dogruCevap}/>
          <label htmlFor={`${soru.id}-b`}>B - {soru.b}</label>
        </div>
        <div className={classes.cevapCont}>
          <input type="radio" name={soru.id} value="c" id={`${soru.id}-c`} checked={value=="c"} onChange={(e) => setValue(soruIdx, e.target.value)} disabled={dogruCevap}/>
          <label htmlFor={`${soru.id}-c`}>C - {soru.c}</label>
        </div>
        <div className={classes.cevapCont}>
          <input type="radio" name={soru.id} value="d" id={`${soru.id}-d`} checked={value=="d"} onChange={(e) => setValue(soruIdx, e.target.value)} disabled={dogruCevap}/>
          <label htmlFor={`${soru.id}-d`}>D - {soru.d}</label>
        </div>
        <div className={classes.cevapCont}>
          <input type="radio" name={soru.id} value="" id={`${soru.id}-0`} checked={!value} onChange={(e) => setValue(soruIdx, e.target.value)} disabled={dogruCevap}/>
          <label htmlFor={`${soru.id}-0`}>Boş Bırak</label>
        </div>
        {
          dogruCevap &&
          <div className={classes.cevapCont}>
            {
              dogruCevap == value
              ? <p className={classes.dogruCevap}>DOĞRU CEVAP!</p>
              : <p className={classes.yanlisCevap}>YANLIŞ! - DOĞRU CEVAP: {dogruCevap.toUpperCase()}</p>
            }
          </div>
        }
      </form>
    </div>
  );
}