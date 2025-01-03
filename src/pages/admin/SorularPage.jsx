import { useContext, useEffect, useState } from 'react';
import classes from './Page.module.css'
import { ReactContext } from '../../context/ReactContext';
import PageLabel from '../../components/PageLabel';
import LoadingState from '../../components/LoadingState';
import ErrorState from '../../components/ErrorState';
import Button from '../../components/Button';

export default function() {
  const ctx = useContext(ReactContext);

  const [loading, setLoading] = useState(false); 
  const [error, setError] = useState(''); 
  
  const [openCreateOverlay, setOpenCreateOverlay] = useState(false);
  const [openUpdateOverlay, setOpenUpdateOverlay] = useState(false); 
  const [actionLoading, setActionLoading] = useState(false); 
  const [refresh, setRefresh] = useState(0); 
 
  const [sorular, setSorular] = useState([]);
  
  const [soru, setSoru] = useState(''); 
  const [a, setA] = useState('');
  const [b, setB] = useState('');
  const [c, setC] = useState('');
  const [d, setD] = useState('');
  const [dogruCevap, setDogruCevap] = useState('');
  const [kategori, setKategori] = useState(''); 
  const [resim, setResim] = useState('');
  
  const [updateId, setUpdateId] = useState('');
  const [actionError, setActionError] = useState('');

  useEffect(() => {
    (async function() {
      setLoading(true);
      setError('');

      const response = await ctx.api.sorulariGetir(ctx.user.token);
      if (response.error) {
        setError(response.errorMsg);
      } else {
        setSorular(response.sorular);
      }
      setLoading(false);
    })();
  }, [refresh])

  async function deleteAction(id) {
    setActionLoading(true);
    const response = await ctx.api.soruSil(ctx.user.token, id);
    if (response.error) {
      setError(response.errorMsg);
    } else {
      setRefresh(Math.random());
    }
    setActionLoading(false);
  }

  async function soruOlustur() {
    setActionLoading(true);
    const response = await ctx.api.soruOlustur(ctx.user.token, soru, a, b, c, d, dogruCevap, kategori, resim);
    if (response.error) {
      setActionError(response.errorMsg);
    } else {
      setOpenCreateOverlay(false);
      clearActionForm();
      setRefresh(Math.random());
    }
    setActionLoading(false);
  }

  async function soruGuncelle() {
    setActionLoading(true);
    const response = await ctx.api.soruGuncelle(ctx.user.token, updateId, soru, a, b, c, d, dogruCevap, kategori, resim);
    if (response.error) {
      setActionError(response.errorMsg);
    } else {
      setOpenUpdateOverlay(false);
      clearActionForm();
      setRefresh(Math.random());
    }
    setActionLoading(false);
  }

  function clearActionForm() {
    setSoru("");
    setA("");
    setB("");
    setC("");
    setD("");
    setDogruCevap("");
    setKategori("");
    setResim("");
    
    setActionError([]);
    setUpdateId('');
  }

  function prepareUpdate(id, soru, a, b, c, d, dogruCevap, kategori, resim) {
    setUpdateId(id);

    setSoru(soru);
    setA(a);
    setB(b);
    setC(c);
    setD(d);
    setDogruCevap(dogruCevap);
    setKategori(kategori);
    setResim(resim);
    
    setOpenUpdateOverlay(true);
  }

  return (
    <>
      <div className={classes.layout}>
        <PageLabel label="Sorular" />
        {
          loading
          ? <LoadingState />
          : error.length > 0
            ? <ErrorState msg={error} />
            : <>
                <div>
                  <Button label="+ Yeni Soru Ekle" type="Action" disabled={actionLoading} onClick={() => setOpenCreateOverlay(true)} />
                </div>
                <table className={classes.table}>
                  <thead className={classes.tableHeadRow}>
                    <tr>
                      <th>Soru</th>
                      <th>A</th>
                      <th>B</th>
                      <th>C</th>
                      <th>D</th>
                      <th>Cevap</th>
                      <th>Kategori</th>
                      <th className={classes.buttonColumn}>Güncelle</th>
                      <th className={classes.buttonColumn}>Sil</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      sorular.map(soru => <tr key={soru.id} className={classes.tableDataRow}>
                        <td>{soru.soru}</td>
                        <td>{soru.a}</td>
                        <td>{soru.b}</td>
                        <td>{soru.c}</td>
                        <td>{soru.d}</td>
                        <td>{soru.dogruCevap}</td>
                        <td>{soru.kategori}</td>
                        <td><Button label="Update" type="Update" disabled={actionLoading} onClick={() => prepareUpdate(soru.id, soru.soru, soru.a, soru.b, soru.c, soru.d, soru.dogruCevap, soru.kategori, soru.resim || "")}/></td>
                        <td><Button label="Delete" type="Delete" disabled={actionLoading} onClick={() => deleteAction(soru.id)}/></td>
                      </tr>)
                    }
                  </tbody>
                </table>
              </>
        }
      </div>

      <div className={openCreateOverlay ? classes.overlayOpened : classes.overlayClosed}>
        <form className={classes.form}>
          {actionError.length > 0 && <ErrorState msg={actionError} />}

          <h1 className={classes.formTitle}>Soru Oluştur</h1>
          <div className={classes.formInputCont}>
            <label className={classes.formLabel} htmlFor="soru">Soru:</label>
            <input className={classes.formInput} id="soru" name="soru" value={soru} onChange={(e) => setSoru(e.target.value)} />
          </div>
          <div className={classes.formInputCont}>
            <label className={classes.formLabel} htmlFor="a">A:</label>
            <input className={classes.formInput} id="a" name="a" value={a} onChange={(e) => setA(e.target.value)} />
          </div>
          <div className={classes.formInputCont}>
            <label className={classes.formLabel} htmlFor="b">B:</label>
            <input className={classes.formInput} id="b" name="b" value={b} onChange={(e) => setB(e.target.value)} />
          </div>
          <div className={classes.formInputCont}>
            <label className={classes.formLabel} htmlFor="c">C:</label>
            <input className={classes.formInput} id="c" name="c" value={c} onChange={(e) => setC(e.target.value)} />
          </div>
          <div className={classes.formInputCont}>
            <label className={classes.formLabel} htmlFor="d">D:</label>
            <input className={classes.formInput} id="d" name="d" value={d} onChange={(e) => setD(e.target.value)} />
          </div>
          <div className={classes.formInputCont}>
            <label className={classes.formLabel} htmlFor="resim">Resim Link:</label>
            <input className={classes.formInput} id="resim" name="resim" value={resim} onChange={(e) => setResim(e.target.value)} />
          </div>
          <div className={classes.formInputCont}>
            <label className={classes.formLabel} htmlFor="dogruCevap">Doğru Cevap:</label>
            <select className={classes.formInput} id="dogruCevap" name="dogruCevap" value={dogruCevap} onChange={(e) => setDogruCevap(e.target.value)}>
              <option value='a'>A</option>
              <option value='b'>B</option>
              <option value='c'>C</option>
              <option value='d'>D</option>
            </select>
          </div>
          <div className={classes.formInputCont}>
            <label className={classes.formLabel} htmlFor="kategori">Kategori:</label>
            <select className={classes.formInput} id="kategori" name="kategori" value={kategori} onChange={(e) => setKategori(e.target.value)}>
              <option value='ehliyet'>Ehliyet Sınav</option>
              <option value='ilkyardim'>İlk Yardım</option>
              <option value='trafik'>Trafik</option>
              <option value='trafikadabi'>Trafik Adabı</option>
              <option value='motor'>Motor</option>
            </select>
          </div>
          
          <div className={classes.formInputCont}>
            <Button label={actionLoading ? "İşleniyor ..." : "Oluştur"} type="Action" disabled={actionLoading} onClick={soruOlustur}/>
            <Button label={actionLoading ? "İşleniyor ..." : "İptal"} type="Action" disabled={actionLoading} onClick={() => {setOpenCreateOverlay(false); clearActionForm()} }/>
          </div>
        </form>
      </div>

      <div className={openUpdateOverlay ? classes.overlayOpened : classes.overlayClosed}>
        <form className={classes.form}>
          {actionError.length > 0 && <ErrorState msg={actionError} />}

          <h1 className={classes.formTitle}>Soru Güncelle</h1>

          <div className={classes.formInputCont}>
            <label className={classes.formLabel} htmlFor="soru">Soru:</label>
            <input className={classes.formInput} id="soru" name="soru" value={soru} onChange={(e) => setSoru(e.target.value)} />
          </div>
          <div className={classes.formInputCont}>
            <label className={classes.formLabel} htmlFor="a">A:</label>
            <input className={classes.formInput} id="a" name="a" value={a} onChange={(e) => setA(e.target.value)} />
          </div>
          <div className={classes.formInputCont}>
            <label className={classes.formLabel} htmlFor="b">B:</label>
            <input className={classes.formInput} id="b" name="b" value={b} onChange={(e) => setB(e.target.value)} />
          </div>
          <div className={classes.formInputCont}>
            <label className={classes.formLabel} htmlFor="c">C:</label>
            <input className={classes.formInput} id="c" name="c" value={c} onChange={(e) => setC(e.target.value)} />
          </div>
          <div className={classes.formInputCont}>
            <label className={classes.formLabel} htmlFor="d">D:</label>
            <input className={classes.formInput} id="d" name="d" value={d} onChange={(e) => setD(e.target.value)} />
          </div>
          <div className={classes.formInputCont}>
            <label className={classes.formLabel} htmlFor="resim">Resim Link:</label>
            <input className={classes.formInput} id="resim" name="resim" value={resim} onChange={(e) => setResim(e.target.value)} />
          </div>
          <div className={classes.formInputCont}>
            <label className={classes.formLabel} htmlFor="dogruCevap">Doğru Cevap:</label>
            <select className={classes.formInput} id="dogruCevap" name="dogruCevap" value={dogruCevap} onChange={(e) => setDogruCevap(e.target.value)}>
              <option value='a'>A</option>
              <option value='b'>B</option>
              <option value='c'>C</option>
              <option value='d'>D</option>
            </select>
          </div>
          <div className={classes.formInputCont}>
            <label className={classes.formLabel} htmlFor="kategori">Kategori:</label>
            <select className={classes.formInput} id="kategori" name="kategori" value={kategori} onChange={(e) => setKategori(e.target.value)}>
              <option value='ehliyet'>Ehliyet Sınav</option>
              <option value='ilkyardim'>İlk Yardım</option>
              <option value='trafik'>Trafik</option>
              <option value='trafikadabi'>Trafik Adabı</option>
              <option value='motor'>Motor</option>
            </select>
          </div>

          <div className={classes.formInputCont}>
            <Button label={actionLoading ? "İşleniyor ..." : "Güncelle"} type="Action" disabled={actionLoading} onClick={soruGuncelle}/>
            <Button label={actionLoading ? "İşleniyor ..." : "İptal"} type="Action" disabled={actionLoading} onClick={() => {setOpenUpdateOverlay(false); clearActionForm()} }/>
          </div>
        </form>
      </div>
    </>
  );
}