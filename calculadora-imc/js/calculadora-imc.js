document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("imc-form");
  const pesoInput = document.getElementById("peso");
  const alturaInput = document.getElementById("altura");
  const resultadoDiv = document.getElementById("resultado-imc");
  const mensagemErro = document.getElementById("mensagem-erro");

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    mensagemErro.textContent = "";
    resultadoDiv.textContent = "";

    const peso = parseFloat(pesoInput.value);
    const altura = parseFloat(alturaInput.value);

    if (isNaN(peso) || isNaN(altura)) {
      mensagemErro.textContent = "Preencha todos os campos corretamente.";
      return;
    }
    if (peso <= 0 || altura <= 0) {
      mensagemErro.textContent = "Peso e altura devem ser maiores que zero.";
      return;
    }
    if (altura < 0.5 || altura > 2.5) {
      mensagemErro.textContent = "Altura deve estar entre 0.5m e 2.5m.";
      return;
    }
    if (peso < 10 || peso > 300) {
      mensagemErro.textContent = "Peso deve estar entre 10kg e 300kg.";
      return;
    }

    const imc = peso / (altura * altura);
    let classificacao = "";

    if (imc < 18.5) classificacao = "Abaixo do peso";
    else if (imc < 25) classificacao = "Peso normal";
    else if (imc < 30) classificacao = "Sobrepeso";
    else if (imc < 35) classificacao = "Obesidade grau I";
    else if (imc < 40) classificacao = "Obesidade grau II";
    else classificacao = "Obesidade grau III";

    resultadoDiv.innerHTML = `
      <strong>Seu IMC:</strong> ${imc.toFixed(2)}<br>
      <span class="classificacao">${classificacao}</span>
    `;
  });
});
