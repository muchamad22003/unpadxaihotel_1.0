// === GANTI dengan URL Apps Script kamu ===
const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx/exec';

// Password login petugas
const PASSWORD = 'admin123';

// Elemen login
const loginCard = document.getElementById('loginCard');
const mainCard = document.getElementById('mainCard');
const loginForm = document.getElementById('loginForm');
const loginStatus = document.getElementById('loginStatus');

// Elemen form utama
const form = document.getElementById('dataForm');
const statusEl = document.getElementById('status');

// ==== LOGIN HANDLER ====
loginForm.addEventListener('submit', e => {
  e.preventDefault();
  const pass = document.getElementById('passwordInput').value;
  if (pass === PASSWORD) {
    loginCard.style.display = 'none';
    mainCard.style.display = 'block';
  } else {
    loginStatus.textContent = '❌ Password salah!';
    loginStatus.className = 'error show';
  }
});

// ==== SUBMIT FORM ====
form.addEventListener('submit', e => {
  e.preventDefault();

  const nama = document.getElementById('nama').value.trim();
  const hotel = document.getElementById('hotel').value.trim();

  if (!nama || !hotel) return;

  statusEl.innerHTML = '<span class="loader"></span> Mengirim...';
  statusEl.className = 'loading show';

  fetch(SCRIPT_URL, {
    method: 'POST',
    mode: 'no-cors',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ nama, hotel, timestamp: new Date().toLocaleString('id-ID') })
  })
  .then(() => {
    statusEl.textContent = '✅ Data berhasil dikirim!';
    statusEl.className = 'success show';
    form.reset();
  })
  .catch(err => {
    statusEl.textContent = '❌ Gagal mengirim data.';
    statusEl.className = 'error show';
    console.error(err);
  });
});
