// Generate QR code for UPI ID when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
  const qrCodeContainer = document.getElementById('qrCode');
  if (qrCodeContainer && typeof QRCode !== 'undefined') {
    const upiString = 'upi://pay?pa=keethi8015-2@okaxis&pn=Klyra%20Studio&am=0&tn=Jewellery%20Order';
    const qr = new QRCode(qrCodeContainer, {
      text: upiString,
      width: 100,
      height: 100,
      colorDark: '#121212',
      colorLight: '#ffffff',
      correctLevel: QRCode.CorrectLevel.H
    });
  }
  
  // Handle file input display name
  const receiptFile = document.getElementById('receiptFile');
  const fileName = document.getElementById('fileName');
  if (receiptFile && fileName) {
    receiptFile.addEventListener('change', function() {
      if (this.files && this.files.length > 0) {
        fileName.textContent = 'File selected: ' + this.files[0].name;
        fileName.style.color = '#0f7a4d';
        fileName.style.fontWeight = '600';
      } else {
        fileName.textContent = 'No file chosen';
        fileName.style.color = '#888';
      }
    });
  }
});
