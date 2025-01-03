import { useContext, useEffect, useState } from 'react';
import classes from './YeniSinavPage.module.css'
import { ReactContext } from '../../context/ReactContext';
import PageLabel from '../../components/PageLabel';
import Button from '../../components/Button';
import { NavLink, useNavigate } from 'react-router';

import trafikKategori from '../../assets/trafikKategori.jpg';
import ilkYardimKategori from '../../assets/ilkYardimKategori.jpg';
import motorKategori from '../../assets/motorKategori.jpg';
import trafikAdabiKategori from '../../assets/trafikAdabiKategori.jpg';
import ehliyetSinavKategori from '../../assets/ehliyetSinavKategori.jpg';

export default function() {
  const ctx = useContext(ReactContext);
  const navigate = useNavigate();

  return (
    <>
      <div className={classes.layout}>
        <PageLabel label="Yeni Sınav" />
        <div className={classes.sinavKategoriler}>
          <NavLink to="/dashboard/sinav/ehliyet" className={classes.sinavKategori}>
            <img src={ehliyetSinavKategori} />
            <h1>Ehliyet Sınav Soruları</h1>
          </NavLink>
          <NavLink to="/dashboard/sinav/ilkyardim" className={classes.sinavKategori}>
            <img src={ilkYardimKategori} />
            <h1>İlk Yardım Soruları</h1>
          </NavLink>

          <NavLink to="/dashboard/sinav/motor" className={classes.sinavKategori}>
            <img src={motorKategori} />
            <h1>Motor Soruları</h1>
          </NavLink>

          <NavLink to="/dashboard/sinav/trafik" className={classes.sinavKategori}>
            <img src={trafikKategori} />
            <h1>Trafik Soruları</h1>
          </NavLink>

          <NavLink to="/dashboard/sinav/trafikadabi" className={classes.sinavKategori}>
            <img src={trafikAdabiKategori} />
            <h1>Trafik Adabı Soruları</h1>
          </NavLink>
        </div>
      </div>
    </>
  );
}