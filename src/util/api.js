import axios from 'axios';
// const url = "http://localhost:3000";
const url = "https://staj-back.vercel.app";

// ================== KULLANICI ==================
// ================== KULLANICI ==================
export async function login(kullaniciadi, sifre) {
  try {
    const body = { kullaniciadi, sifre };
    const response = await axios.post(`${url}/kullanici/giris`, body);
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
}

export async function signup(ad, soyad, kullaniciadi, sifre) {
  try {
    const body = { ad, soyad, kullaniciadi, sifre };
    const response = await axios.post(`${url}/kullanici`, body);
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
}

export async function kullaniciGuncelle(token, ad, soyad, sifre) {
  try {
    const body = { ad, soyad, sifre};
    const options = { headers: { token, } }
    const response = await axios.patch(`${url}/kullanici`, body, options);
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
}
// ================== KULLANICI ==================
// ================== KULLANICI ==================





// ================== SORU ==================
// ================== SORU ==================
export async function soruOlustur(token, soru, a, b, c, d, dogruCevap, kategori, resim) {
  try {
    const body = { soru, a, b, c, d, dogruCevap, kategori, resim };
    const options = { headers: { token, } }
    const response = await axios.post(`${url}/soru`, body, options);
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
}

export async function sorulariGetir(token) {
  try {
    const options = { headers: { token, } }
    const response = await axios.get(`${url}/soru`, options);
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
}

export async function soruGuncelle(token, soruId, soru, a, b, c, d, dogruCevap, kategori, resim) {
  try {
    const body = { soru, a, b, c, d, dogruCevap, kategori, resim};
    const options = { headers: { token, } }
    const response = await axios.patch(`${url}/soru/${soruId}`, body, options);
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
}

export async function soruSil(token, soruId) {
  try {
    const options = { headers: { token, } }
    const response = await axios.delete(`${url}/soru/${soruId}`, options);
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
}
// ================== SORU ==================
// ================== SORU ==================





// ================== SINAV ==================
// ================== SINAV ==================
export async function sinavlariGetir(token) {
  try {
    const options = { headers: { token, } }
    const response = await axios.get(`${url}/sinav`, options);
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
}

export async function sinavOlustur(token, kategori) {
  try {
    const body = { kategori };
    const options = { headers: { token, } }
    const response = await axios.post(`${url}/sinav`, body, options);
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
}

export async function sinavBitir(token, sinavId, soruCevap) {
  try {
    const body = { soruCevap };
    const options = { headers: { token, } }
    const response = await axios.post(`${url}/sinav/${sinavId}`, body, options);
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
}
// ================== SINAV ==================
// ================== SINAV ==================