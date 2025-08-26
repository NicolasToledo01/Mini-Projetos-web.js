const container = document.querySelector(".container");
const qrCodeBtn = document.querySelector("#qrForm button[type='submit']");

// eventos

function GeneratorQRCode() {
  const qrInput = document.querySelector("#qrInput");
  const qrCodeImg = document.querySelector("#qrCode img");
  const qrText = qrInput.value;

  qrCodeBtn.innerHTML = "Gerando QR Code...";
  if (qrText) {
    qrCodeImg.src = `https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(
      qrText
    )}&size=150x150`;

    qrCodeImg.addEventListener("load", function () {
      container.classList.add("active");
      qrCodeBtn.innerHTML = "Gerar QR Code";
    });
  }
  else if (!qrText) {
    const p = document.createElement("p");
    p.textContent = "Por favor, insira um texto válido.";
    p.style.color = "red";
    p.style.textAlign = "center";
    qrForm.appendChild(p);
  }
}

qrCodeBtn.addEventListener("click", function (event) {
  event.preventDefault();

  GeneratorQRCode();
});


//funcões