import { useContext, useEffect, useState } from 'react';
import classes from './SinavPage.module.css'
import { ReactContext } from '../../context/ReactContext';
import PageLabel from '../../components/PageLabel';
import LoadingState from '../../components/LoadingState';
import ErrorState from '../../components/ErrorState';
import Soru from '../../components/Soru';
import { useParams } from 'react-router';
import Button from '../../components/Button';
import puanHesaplama from '../../util/puanHesaplama';

export default function() {
  const ctx = useContext(ReactContext);
  const {kategori} = useParams();

  const [loading, setLoading] = useState(false); 
  const [actionLoading, setActionLoading] = useState(false); 
  const [error, setError] = useState(''); 
  const [sinav, setSinav] = useState([]);
  const [sorular, setSorular] = useState([]);
  const [dogruCevaplar, setDogruCevaplar] = useState({});
  const [cevaplar, setCevaplar] = useState({});
  const [sonuc, setSonuc] = useState({});

  
  useEffect(() => {
    (async function() {
      setLoading(true);
      setError('');

      const response = await ctx.api.sinavOlustur(ctx.user.token, kategori);
      if (response.error) {
        setError(response.errorMsg);
      } else {
        setSinav(response.sinav);
        setSorular(response.sorular);
      }
      setLoading(false);
    })();
  }, [])

  function changeCevap(idx, cevap) {
    if (!cevap) cevap = undefined;
    setCevaplar(state => ({...state, [idx]: cevap}))
  }

  async function sinavBitir() {
    const soruCevap = {};
    sorular.forEach((soru, idx) => soruCevap[soru.id] = cevaplar[idx] || '');
    setActionLoading(true);
    setError('');
    const response = await ctx.api.sinavBitir(ctx.user.token, sinav.id, soruCevap);
    if (response.error) {
      setError(response.errorMsg);
    } else {
      const dogruCevapListesi = {}
      response.sorular.forEach(soru => {
        dogruCevapListesi[soru.id] = soru.dogruCevap;
      });
      setDogruCevaplar(dogruCevapListesi);
      setSonuc({
        dogruCevaplar: response.dogruCevaplar,
        yanlisCevaplar: response.yanlisCevaplar,
        bosCevaplar: response.bosCevaplar,
        puan: puanHesaplama(response.dogruCevaplar, response.yanlisCevaplar, response.bosCevaplar),
      })
    }
    setActionLoading(false);

  }

  return (
    <>
      <div className={classes.layout}>
        <PageLabel label="Sınavlar" />
        {
          loading
          ? <LoadingState />
          : error.length > 0
            ? <ErrorState msg={error} />
            : <>
                <div>
                  { Object.keys(dogruCevaplar).length <= 0 
                    ? <Button label="Sınavı Bitir" type="Action" disabled={actionLoading} onClick={sinavBitir} />
                    : <div className={classes.sonucCont}>
                        <p className={classes.dogruCevap}>Doğru Cevap Sayısı: {sonuc.dogruCevaplar}</p>
                        <p className={classes.yanlisCevap}>Yanlış Cevap Sayısı: {sonuc.yanlisCevaplar}</p>
                        <p className={classes.bosCevap}>Boş Cevap Sayısı: {sonuc.bosCevaplar}</p>
                        <p className={classes.puan}>Puan: {sonuc.puan}</p>
                      </div>
                  }
                </div>
                <div className={classes.sorular}>
                  {sorular.map((soru, idx) => <Soru key={soru.id} soru={soru} soruIdx={idx} value={cevaplar[idx]} setValue={changeCevap} dogruCevap={dogruCevaplar[soru.id]} />)}
                </div>
              </>
            
        }
      </div>
    </>
  );
}