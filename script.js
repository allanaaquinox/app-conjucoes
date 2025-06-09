function verificar() {
  const conjuncao = document.getElementById("conjuncao").innerText.trim();
  const resposta = document.getElementById("resposta").value.trim();

  if (!resposta) {
    mostrarResultado("Por favor, digite uma resposta.", "orange");
    return;
  }

  fetch(`http://localhost:8000/verificar?conjuncao=${encodeURIComponent(conjuncao)}&resposta=${encodeURIComponent(resposta)}`)
    .then(res => {
      if (!res.ok) throw new Error("Erro na requisição");
      return res.text();
    })
    .then(data => {
      mostrarResultado(data, data.startsWith("Correto") ? "green" : "red");
      sortearConjuncao(); // nova conjunção após verificação
    })
    .catch(error => {
      mostrarResultado("Erro ao verificar: " + error.message, "red");
    });
}

function sortearConjuncao() {
  fetch("http://localhost:8000/sortear")
    .then(res => {
      if (!res.ok) throw new Error("Erro ao sortear conjunção");
      return res.text();
    })
    .then(conjuncao => {
      document.getElementById("conjuncao").textContent = conjuncao;
      document.getElementById("resposta").value = "";
      document.getElementById("resultado").textContent = "";
    })
    .catch(error => {
      mostrarResultado("Erro ao carregar conjunção: " + error.message, "red");
    });
}

function mostrarResultado(texto, cor) {
  const resultado = document.getElementById("resultado");
  resultado.textContent = texto;
  resultado.style.color = cor;
}

window.onload = sortearConjuncao;
