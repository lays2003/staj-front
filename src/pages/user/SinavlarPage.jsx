import { useContext, useEffect, useState } from 'react';
import classes from './SinavlarPage.module.css'
import { ReactContext } from '../../context/ReactContext';
import PageLabel from '../../components/PageLabel';
import LoadingState from '../../components/LoadingState';
import ErrorState from '../../components/ErrorState';
import puanHesaplama from '../../util/puanHesaplama';

export default function() {
  const ctx = useContext(ReactContext);

  const [loading, setLoading] = useState(false); 
  const [error, setError] = useState(''); 
  const [sinavlar, setSinavlar] = useState([]);
  
  useEffect(() => {
    (async function() {
      setLoading(true);
      setError('');

      const response = await ctx.api.sinavlariGetir(ctx.user.token);
      if (response.error) {
        setError(response.errorMsg);
      } else {
        setSinavlar(response.sinavlar);
      }
      setLoading(false);
    })();
  }, [])

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
                <table className={classes.table}>
                  <thead className={classes.tableHeadRow}>
                    <tr>
                      <th>Tarih</th>
                      <th>Kategori</th>
                      <th>Doğru Cevaplar</th>
                      <th>Yanlış Cevaplar</th>
                      <th>Cevaplanmayan Sorular</th>
                      <th>Puan</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      sinavlar.map(sinav => <tr key={sinav.id} className={classes.tableDataRow}>
                        <td>{new Date(sinav.tarih).toLocaleDateString('tr')}</td>
                        <td>{sinav.kategori}</td>
                        <td>{sinav.dogruCevaplar}</td>
                        <td>{sinav.yanlisCevaplar}</td>
                        <td>{sinav.bosCevaplar}</td>
                        <td>{puanHesaplama(sinav.dogruCevaplar, sinav.yanlisCevaplar, sinav.bosCevaplar)}</td>
                      </tr>)
                    }
                  </tbody>
                </table>
              </>
        }
      </div>
    </>
  );
}