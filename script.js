document.addEventListener('DOMContentLoaded', () => {
  // Kumpulkan referensi elemen DOM
  const elements = {
    form: document.getElementById('form-pesanan'),
    kendaraan: document.getElementById('pilih-kendaraan'),
    hari: document.getElementById('lama-sewa'),
    helm: document.getElementById('cek-helm'),
    supir: document.getElementById('cek-supir'),
    total: document.getElementById('total-biaya')
  }

  // Fungsi format angka ke Rupiah
  const formatRupiah = (angka) => {
    return `Rp ${angka.toLocaleString('id-ID')}`;
  };

  // Fungsi kalkulasi total biaya sewa
  const hitungTotalBiaya = () => {
    const hargaKendaraan = Number(elements.kendaraan.value) || 0;
    const lamaSewa = Math.max(1, Number(elements.hari.value) || 1);

    let totalBiaya = hargaKendaraan * lamaSewa;

    if (elements.helm.checked) {
      totalBiaya += Number(elements.helm.value);
    }
    if (elements.supir.checked) {
      totalBiaya += Number(elements.supir.value) * lamaSewa;
    }

    elements.total.textContent = formatRupiah(totalBiaya);
  };

  // Pasang event listener untuk perubahan input kalkulasi
  if (elements.kendaraan && elements.hari && elements.total) {
    elements.kendaraan.addEventListener('change', hitungTotalBiaya);
    elements.hari.addEventListener('input', hitungTotalBiaya);
    elements.helm.addEventListener('change', hitungTotalBiaya);
    elements.supir.addEventListener('change', hitungTotalBiaya);
  }

  // Pasang event listener untuk pengiriman formulir
  // Pasang event listener untuk pengiriman formulir
  if (elements.form) {
    elements.form.addEventListener('submit', (e) => {
      e.preventDefault();

      // Ambil file gambar (KTP/Bukti Pembayaran)
      const fileInput = document.getElementById('ktp'); // Sesuaikan dengan ID input file Anda
      const file = fileInput.files[0];

      // Fungsi untuk menyimpan data dan pindah halaman
     // Fungsi untuk menyimpan data dan pindah halaman
      const simpanDanPindah = (base64Image) => {
        const dataPemesanan = {
          nama: document.getElementById('nama').value.trim(),
          wa: document.getElementById('wa').value.trim(),
          email: document.getElementById('email').value.trim(),
          alamat: document.getElementById('alamat').value.trim(),
          kendaraan: elements.kendaraan.options[elements.kendaraan.selectedIndex].text,
          lama: elements.hari.value,
          helm: elements.helm.checked ? 'Ya' : 'Tidak',
          supir: elements.supir.checked ? 'Ya' : 'Tidak',
          metode: document.getElementById('metode').value,
          totalBiaya: elements.total.textContent
        };

        // Buka tab baru
        const newWindow = window.open("", "_blank");
        
        // Tulis halaman HTML baru dengan desain yang lebih rapi (Card Style)
        newWindow.document.write(`
          <!DOCTYPE html>
          <html lang="id">
            <head>
              <meta charset="UTF-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <title>Bukti Pemesanan - RentalKu</title>
              <link rel="stylesheet" href="style.css">
              <style>
                body {
                  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                  background-color: #f4f7f6;
                  color: #333;
                  margin: 0;
                  padding: 40px 20px;
                  display: flex;
                  justify-content: center;
                }
                .invoice-card {
                  background: #fff;
                  width: 100%;
                  max-width: 600px;
                  border-radius: 12px;
                  box-shadow: 0 8px 24px rgba(0,0,0,0.1);
                  overflow: hidden;
                }
                .invoice-header {
                  background: #2c3e50;
                  color: white;
                  padding: 20px;
                  text-align: center;
                }
                .invoice-header h1 {
                  margin: 0;
                  font-size: 24px;
                }
                .invoice-body {
                  padding: 30px;
                }
                .detail-row {
                  display: flex;
                  border-bottom: 1px solid #eee;
                  padding: 12px 0;
                }
                .detail-row:last-child {
                  border-bottom: none;
                }
                .detail-label {
                  font-weight: 600;
                  width: 40%;
                  color: #555;
                }
                .detail-value {
                  width: 60%;
                  color: #222;
                }
                .total-row {
                  background: #f8f9fa;
                  padding: 15px;
                  border-radius: 8px;
                  margin-top: 20px;
                  display: flex;
                  justify-content: space-between;
                  align-items: center;
                  font-weight: bold;
                  font-size: 18px;
                }
                .total-angka {
                  color: #e74c3c;
                  font-size: 22px;
                }
                .img-container {
                  margin-top: 25px;
                }
                .img-container img {
                  max-width: 100%;
                  border-radius: 8px;
                  border: 1px solid #ddd;
                  box-shadow: 0 4px 12px rgba(0,0,0,0.05);
                }
                .img-title {
                  font-weight: 600;
                  margin-bottom: 10px;
                  color: #555;
                }
                @media (max-width: 480px) {
                  .detail-row { flex-direction: column; }
                  .detail-label { width: 100%; margin-bottom: 4px; }
                  .detail-value { width: 100%; }
                }
              </style>
            </head>
            <body>
              <div class="invoice-card">
                <div class="invoice-header">
                  <h1>Detail Pemesanan Anda</h1>
                </div>
                <div class="invoice-body">
                  <div class="detail-row"><div class="detail-label">Nama</div><div class="detail-value">${dataPemesanan.nama}</div></div>
                  <div class="detail-row"><div class="detail-label">WhatsApp</div><div class="detail-value">${dataPemesanan.wa}</div></div>
                  <div class="detail-row"><div class="detail-label">Email</div><div class="detail-value">${dataPemesanan.email}</div></div>
                  <div class="detail-row"><div class="detail-label">Alamat</div><div class="detail-value">${dataPemesanan.alamat}</div></div>
                  <div class="detail-row"><div class="detail-label">Kendaraan</div><div class="detail-value">${dataPemesanan.kendaraan}</div></div>
                  <div class="detail-row"><div class="detail-label">Lama Sewa</div><div class="detail-value">${dataPemesanan.lama} Hari</div></div>
                  <div class="detail-row"><div class="detail-label">Tambahan</div><div class="detail-value">Helm: ${dataPemesanan.helm} <br> Supir: ${dataPemesanan.supir}</div></div>
                  <div class="detail-row"><div class="detail-label">Pembayaran</div><div class="detail-value" style="text-transform: capitalize;">${dataPemesanan.metode}</div></div>
                  
                  <div class="total-row">
                    <span>Total Biaya</span>
                    <span class="total-angka">${dataPemesanan.totalBiaya}</span>
                  </div>

                  ${base64Image ? `
                  <div class="img-container">
                    <div class="img-title">Dokumen Lampiran (KTP):</div>
                    <img src="${base64Image}" alt="Lampiran KTP">
                  </div>` : ''}
                </div>
              </div>
            </body>
          </html>
        `);
        newWindow.document.close(); // Penting agar tab baru selesai loading

        // Kosongkan form dan reset total biaya di halaman form
        elements.form.reset();
        elements.total.textContent = 'Rp 0';
      };
      
      // Jika ada file gambar yang diunggah, baca dulu filenya
      if (file) {
        const reader = new FileReader();
        reader.onload = function(event) {
          simpanDanPindah(event.target.result);
        };
        reader.readAsDataURL(file);
      } else {
        // Jika tidak ada gambar
        simpanDanPindah(null);
      }
    });
  }
});