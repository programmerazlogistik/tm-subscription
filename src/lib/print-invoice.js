/**
 * Print invoice utility function
 * Opens a new window with the invoice template and triggers print dialog
 *
 * @param {Object} invoiceData - Invoice data object
 * @param {string} invoiceData.transactionId - Transaction/Invoice ID
 * @param {string} invoiceData.buyerName - Buyer name
 * @param {string} invoiceData.topUpDate - Date of purchase (ISO string)
 * @param {string} invoiceData.packageName - Package/product name
 * @param {number} invoiceData.totalMuatkoin - Total muatkoin/credit (for credit purchases)
 * @param {number} invoiceData.bonusMuatkoin - Bonus muatkoin/credit
 * @param {number} invoiceData.price - Price
 * @param {number} invoiceData.discount - Discount amount
 * @param {string} invoiceData.paymentMethod - Payment method
 * @param {string} invoiceData.status - Payment status: "paid" | "unpaid" | "cancelled"
 * @param {string} invoiceData.validityStart - Subscription start date (for subscription invoices)
 * @param {string} invoiceData.validityEnd - Subscription end date (for subscription invoices)
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
    status = "paid", // "paid" | "unpaid" | "cancelled"
    validityStart = null,
    validityEnd = null,
  } = invoiceData || {};

  const formatPrice = (price) => {
    if (price === null || price === undefined) return "-";
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const formatDate = (dateString) => {
    if (!dateString) return "-";
    const formatted = new Date(dateString)
      .toLocaleDateString("id-ID", {
        timeZone: "Asia/Jakarta",
        day: "2-digit",
        month: "long",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      })
      .replace(/\./g, ":");
    return `${formatted} WIB`;
  };

  const formatShortDate = (dateString) => {
    if (!dateString) return "-";
    return new Date(dateString).toLocaleDateString("id-ID", {
      timeZone: "Asia/Jakarta",
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const formatDownloadDate = () => {
    const formatted = new Date()
      .toLocaleDateString("id-ID", {
        timeZone: "Asia/Jakarta",
        day: "2-digit",
        month: "long",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
      .replace(/\./g, ":");
    return `${formatted} WIB`;
  };

  const totalHarga = price;
  const potonganHarga = discount;
  const totalPesanan = price - discount;
  const totalTagihan = totalPesanan;

  // Watermark configuration based on status
  const getWatermarkConfig = (status) => {
    switch (status) {
      case "paid":
      case "success":
        return {
          text: "LUNAS",
          color: "#4CAF50",
        };
      case "unpaid":
      case "pending":
        return {
          text: "BELUM LUNAS",
          color: "#ef4444",
        };
      case "cancelled":
        return {
          text: "DIBATALKAN",
          color: "#ef4444",
        };
      default:
        return {
          text: "LUNAS",
          color: "#4CAF50",
        };
    }
  };

  const watermark = getWatermarkConfig(status);

  // Product detail based on invoice type
  const getProductDetail = () => {
    if (status !== "paid" && validityStart && validityEnd) {
      return `Masa Berlaku : ${formatShortDate(validityStart)} - ${formatShortDate(validityEnd)}`;
    }
    // Credit invoice
    if (totalMuatkoin > 0) {
      return bonusMuatkoin > 0
        ? `${totalMuatkoin - bonusMuatkoin} Credit + Bonus ${bonusMuatkoin} Credit`
        : `${totalMuatkoin} Credit`;
    }
    return "";
  };

  const productDetail = getProductDetail();

  // Date label based on invoice type
  const dateLabel =
    status !== "paid" ? "Tanggal Pesanan" : "Tanggal Top-up Credit";

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
          margin-bottom: 8px;
        }
        .logo-img {
          height: 48px;
          object-fit: contain;
        }
        .tagline {
          font-size: 9px;
          color: #1B69F7;
          margin-top: 4px;
        }
        .invoice-label {
          font-size: 10px;
          color: #888;
          font-weight: 500;
          letter-spacing: 1px;
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
          border-bottom: 1px solid #e5e5e5;
          padding-bottom: 16px;
          margin-bottom: 16px;
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
        .status-watermark {
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%) rotate(-15deg);
          border: 4px solid ${watermark.color};
          border-radius: 12px;
          padding: 12px 24px;
          opacity: 0.2;
          z-index: 0;
          pointer-events: none;
          max-width: 90%;
        }
        .status-text {
          font-size: 32px;
          font-weight: 800;
          letter-spacing: 4px;
          color: ${watermark.color};
          text-transform: uppercase;
          white-space: nowrap;
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
          color: #333;
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
          @page {
            margin: 0;
            size: auto;
          }
          body {
            margin: 1.6cm;
          }
        }
      </style>
    </head>
    <body>
      <!-- Header -->
      <div class="header">
        <div>
          <img src="${window.location.origin}/img/logo-invoice.png" alt="muatmuat" class="logo-img" />
        </div>
        <div style="text-align: right;">
          <div class="invoice-label">INVOICE</div>
          <div class="invoice-number">${transactionId}</div>
        </div>
      </div>

      <!-- Meta -->
      <div class="meta-row">
        <div>Diunduh pada <strong style="color: #1B69F7;">${formatDownloadDate()}</strong></div>
        <div>Halaman 1 dari 1</div>
      </div>

      <!-- Ditujukan Kepada -->
      <div class="section-title">DITUJUKAN KEPADA</div>
      <div class="info-grid">
        <span class="info-label">Pembeli</span>
        <span class="info-value">${buyerName}</span>
        <span class="info-label">${dateLabel}</span>
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
          ${productDetail ? `<div class="product-detail">${productDetail}</div>` : ""}
        </div>
        <div class="product-price">${formatPrice(price)}</div>
      </div>

      <!-- Totals -->
      <div class="totals-container">
        <div class="totals-wrapper">
          <div class="status-watermark">
            <div class="status-text">${watermark.text}</div>
          </div>
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
            <span class="total-label-bold">Total Tagihan</span>
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
        // Trigger print from parent when loaded
      </script>
    </body>
    </html>
  `;

  const iframe = document.createElement("iframe");
  // Hide iframe but keep it part of DOM for rendering
  iframe.style.position = "fixed";
  iframe.style.left = "-9999px";
  iframe.style.top = "0";
  iframe.style.width = "0";
  iframe.style.height = "0";
  iframe.style.border = "none";
  document.body.appendChild(iframe);

  const iframeDoc = iframe.contentWindow.document;
  iframeDoc.open();
  iframeDoc.write(invoiceHTML);
  iframeDoc.close();

  iframe.onload = function () {
    setTimeout(() => {
      iframe.contentWindow.focus();
      iframe.contentWindow.print();

      // Remove iframe after printing (delayed)
      setTimeout(() => {
        document.body.removeChild(iframe);
      }, 2000);
    }, 500);
  };
};
