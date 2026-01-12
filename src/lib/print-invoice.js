/**
 * Print invoice utility function
 * Opens a new window with the invoice template and triggers print dialog
 */
export const printInvoice = (invoiceData) => {
  const {
    transactionId = "INV/00000000/MPM/000000",
    buyerName = "-",
    topUpDate = new Date().toISOString(),
    packageName = "-",
    totalMuatkoin = 0,
    bonusMuatkoin = 0,
    price = 0,
    discount = 0,
    paymentMethod = "-",
  } = invoiceData || {};

  const formatPrice = (price) => {
    if (!price && price !== 0) return "-";
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const formatDate = (dateString) => {
    if (!dateString) return "-";
    const formatted = new Date(dateString).toLocaleDateString("id-ID", {
      timeZone: "Asia/Jakarta",
      day: "2-digit",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
    return `${formatted} WIB`;
  };

  const formatDownloadDate = () => {
    const formatted = new Date().toLocaleDateString("id-ID", {
      timeZone: "Asia/Jakarta",
      day: "2-digit",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
    return `${formatted} WIB`;
  };

  const totalHarga = price;
  const potonganHarga = discount;
  const totalPesanan = price - discount;
  const totalTagihan = totalPesanan;

  const muatkoinDisplay =
    bonusMuatkoin > 0
      ? `${totalMuatkoin - bonusMuatkoin} Credit + Bonus ${bonusMuatkoin} Credit`
      : `${totalMuatkoin} Credit`;

  const invoiceHTML = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>Invoice - ${transactionId}</title>
      <meta charset="UTF-8">
      <style>
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        body {
          font-family: Arial, sans-serif;
          font-size: 11px;
          color: #333;
          background: white;
          padding: 32px;
          max-width: 595px;
          margin: 0 auto;
        }
        .header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          border-bottom: 1px solid #e5e5e5;
          padding-bottom: 16px;
          margin-bottom: 8px;
        }
        .logo-container {
          display: flex;
          align-items: center;
          gap: 4px;
          margin-bottom: 4px;
        }
        .logo-circle {
          width: 24px;
          height: 24px;
          background: #FFB800;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-weight: bold;
          font-size: 12px;
        }
        .logo-text {
          font-size: 18px;
          font-weight: bold;
          color: #1B69F7;
        }
        .logo-text .u {
          color: #FFB800;
        }
        .tagline {
          font-size: 9px;
          color: #1B69F7;
        }
        .invoice-label {
          font-size: 9px;
          color: #888;
          font-weight: 500;
        }
        .invoice-number {
          font-size: 14px;
          font-weight: bold;
          color: #1B69F7;
        }
        .meta-row {
          display: flex;
          justify-content: space-between;
          padding: 8px 0;
          font-size: 10px;
          color: #666;
        }
        .section-title {
          font-size: 12px;
          font-weight: bold;
          color: #333;
          margin-bottom: 8px;
          margin-top: 16px;
        }
        .info-grid {
          display: grid;
          grid-template-columns: 140px 1fr;
          gap: 4px 8px;
          font-size: 11px;
        }
        .info-label {
          color: #888;
        }
        .info-value {
          font-weight: 500;
        }
        .table-header {
          display: flex;
          justify-content: space-between;
          border-top: 1px solid #e5e5e5;
          border-bottom: 1px solid #e5e5e5;
          padding: 8px 0;
          font-size: 10px;
          color: #888;
        }
        .product-row {
          display: flex;
          justify-content: space-between;
          border-bottom: 1px solid #e5e5e5;
          padding: 12px 0;
        }
        .product-name {
          font-weight: 600;
        }
        .product-detail {
          font-size: 10px;
          color: #888;
        }
        .product-price {
          font-weight: 500;
        }
        .totals-container {
          position: relative;
          margin-top: 16px;
        }
        .lunas-watermark {
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%) rotate(-15deg);
          border: 4px solid #4CAF50;
          border-radius: 8px;
          padding: 16px 32px;
          opacity: 0.3;
        }
        .lunas-text {
          font-size: 28px;
          font-weight: bold;
          letter-spacing: 4px;
          color: #4CAF50;
        }
        .totals-wrapper {
          margin-left: auto;
          width: 280px;
        }
        .total-row {
          display: flex;
          justify-content: space-between;
          padding: 8px 0;
          border-bottom: 1px solid #f0f0f0;
          font-size: 11px;
        }
        .total-label {
          color: #888;
        }
        .total-label-bold {
          font-weight: 600;
        }
        .total-label-blue {
          font-weight: bold;
          color: #1B69F7;
        }
        .total-value {
          font-weight: 500;
        }
        .total-value-bold {
          font-weight: bold;
        }
        .total-value-blue {
          font-weight: bold;
          color: #1B69F7;
          font-size: 14px;
        }
        .total-value-red {
          font-weight: 500;
          color: #ef4444;
        }
        .payment-row {
          display: flex;
          justify-content: space-between;
          padding: 4px 0;
          font-size: 10px;
        }
        .payment-label {
          color: #aaa;
        }
        .footer {
          margin-top: 32px;
          font-size: 10px;
          color: #888;
        }
        .footer a {
          color: #1B69F7;
          text-decoration: none;
        }
        @media print {
          body {
            padding: 0;
          }
          @page {
            margin: 1cm;
          }
        }
      </style>
    </head>
    <body>
      <!-- Header -->
      <div class="header">
        <div>
          <div class="logo-container">
            <div class="logo-circle">m</div>
            <span class="logo-text">m<span class="u">u</span>atmuat</span>
          </div>
          <div class="tagline">Ekosistem Digital Logistik Terpercaya</div>
        </div>
        <div style="text-align: right;">
          <div class="invoice-label">INVOICE</div>
          <div class="invoice-number">${transactionId}</div>
        </div>
      </div>

      <!-- Meta -->
      <div class="meta-row">
        <div>Diunduh pada <strong>${formatDownloadDate()}</strong></div>
        <div>Halaman 1 dari 1</div>
      </div>

      <!-- Ditujukan Kepada -->
      <div class="section-title">DITUJUKAN KEPADA</div>
      <div class="info-grid">
        <span class="info-label">Pembeli</span>
        <span class="info-value">${buyerName}</span>
        <span class="info-label">Tanggal Top-up Credit</span>
        <span class="info-value">${formatDate(topUpDate)}</span>
      </div>

      <!-- Diterbitkan Atas Nama -->
      <div class="section-title">DITERBITKAN ATAS NAMA</div>
      <div class="info-grid">
        <span class="info-label">Penjual</span>
        <span class="info-value">muatmuat</span>
      </div>

      <!-- Rincian Pesanan -->
      <div class="section-title">RINCIAN PESANAN</div>
      <div class="table-header">
        <span>Produk</span>
        <span>Sub Total Harga</span>
      </div>
      <div class="product-row">
        <div>
          <div class="product-name">${packageName}</div>
          <div class="product-detail">${muatkoinDisplay}</div>
        </div>
        <div class="product-price">${formatPrice(price)}</div>
      </div>

      <!-- Totals -->
      <div class="totals-container">
        <div class="lunas-watermark">
          <div class="lunas-text">LUNAS</div>
        </div>
        <div class="totals-wrapper">
          <div class="total-row">
            <span class="total-label">Total Harga</span>
            <span class="total-value">${formatPrice(totalHarga)}</span>
          </div>
          ${
            potonganHarga > 0
              ? `
          <div class="total-row">
            <span class="total-label">Potongan Harga</span>
            <span class="total-value-red">-${formatPrice(potonganHarga)}</span>
          </div>
          `
              : ""
          }
          <div class="total-row">
            <span class="total-label-bold">Total Pesanan</span>
            <span class="total-value-bold">${formatPrice(totalPesanan)}</span>
          </div>
          <div class="total-row" style="border-bottom: none;">
            <span class="total-label-blue">Total Tagihan</span>
            <span class="total-value-blue">${formatPrice(totalTagihan)}</span>
          </div>
          <div class="payment-row">
            <span class="payment-label">Metode Pembayaran</span>
            <span class="info-value">${paymentMethod}</span>
          </div>
        </div>
      </div>

      <!-- Footer -->
      <div class="footer">
        Jika kamu berbadan usaha dan membutuhkan dokumen perpajakan dapat menghubungi CS muatmuat<br/>
        <a href="tel:081138867000">(081138867000)</a>
      </div>

      <script>
        window.onload = function() {
          window.print();
        };
      </script>
    </body>
    </html>
  `;

  // Open new window and print
  const printWindow = window.open("", "_blank", "width=650,height=900");
  if (printWindow) {
    printWindow.document.write(invoiceHTML);
    printWindow.document.close();
  }
};
