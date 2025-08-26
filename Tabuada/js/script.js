//seleção de elementos
const form = document.querySelector("#form");
const number = document.querySelector("#number");
const multiplicador = document.querySelector("#multiplicador");
const multiplicationTable = document.querySelector("#multiplication-operations");
const multiplicadorTitle = document.querySelector("#multiplication-title span");
//fuções
const createTable = (multiplicadorNumber, numberNumber) => {
  multiplicationTable.innerHTML = "";

  for (let i = 1; i <= multiplicadorNumber; i++) {
    const result = i * numberNumber;

    const template = `<div class="row">
    <div class="operation">${numberNumber} x ${i} = </div>
    <div class="result">${result}</div>
    </div>`;

    const parser = new DOMParser();

    const htmlTemplate = parser.parseFromString(template, "text/html");

    const row = htmlTemplate.querySelector(".row");

    multiplicationTable.appendChild(row);
  }

  // Verifica se o elemento existe antes de acessar innerHTML
  if (multiplicadorTitle) {
    multiplicadorTitle.innerHTML = numberNumber;
  } else {
    console.warn("Elemento '#multiplicador-title span' não encontrado.");
  }
}

//enventos

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const multiplicadorNumber = +multiplicador.value;

  const numberNumber = +number.value;

  if (isNaN(multiplicadorNumber) || isNaN(numberNumber)) {
    alert("Por favor, insira números válidos.");
    return;
  }
  if (multiplicadorNumber <= 0 || numberNumber <= 0) {
    alert("Por favor, insira números maiores que zero.");
    return;
  }
  if (!multiplicadorNumber || !numberNumber) {
    alert("Por favor, preencha todos os campos.");
    return;
  }

  createTable(multiplicadorNumber, numberNumber);
});
