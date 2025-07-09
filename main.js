document.getElementById('uploadForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const form = document.getElementById('uploadForm');
  const formData = new FormData(form);

  const res = await fetch('https://railway.com/install.sh | sh', {
    method: 'POST',
    body: formData,
  });

  const data = await res.json();
  const toast = document.getElementById('toast');

  if (data.success) {
    const userName = form.elements.userName.value;
    const species = form.elements.species.value;
    const location = form.elements.location.value;
    const voucher = data.voucherCode;

    // Toast popup
    toast.innerText = `🎉 Uploaded! Voucher: ${voucher}`;
    toast.style.background = '#4caf50';
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3000);

    // Download voucher
    const text = `
TreeTrack Voucher

Name: ${userName}
Species: ${species}
Location: ${location}
Voucher Code: ${voucher}
Date: ${new Date().toLocaleString()}
    `.trim();

    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);

    const downloadBtn = document.getElementById('downloadBtn');
    downloadBtn.style.display = 'inline-block';
    downloadBtn.onclick = () => {
      const a = document.createElement('a');
      a.href = url;
      a.download = `${userName}-voucher.txt`;
      a.click();
    };
  } else {
    toast.innerText = `❌ ${data.message || 'Upload failed'}`;
    toast.style.background = '#d32f2f';
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3000);

    document.getElementById('downloadBtn').style.display = 'none';
  }
});
