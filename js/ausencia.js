// Não funciona ainda.

const btnRegistrarAusencia = document.getElementById('btn-registrar-ausencia');
const divAlerta = document.getElementById('div-alerta');

function saveToLocalStorage(date, justification, fileBase64) {
    const absenceData = {
        date,
        justification,
        file: fileBase64
    };

    localStorage.setItem('absenceData', JSON.stringify(absenceData));
    alert("Dados salvos com sucesso no localStorage.");
}

function salvarJustificativa() {
    const date = document.getElementById('absenceDate').value;
    const justification = document.getElementById('justification').value;
    const fileInput = document.getElementById('fileUpload').files[0];

    if (!date || !justification) {
      alert("Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    let fileBase64 = null;
    if (fileInput) {
      const reader = new FileReader();
      reader.onload = function (event) {
        fileBase64 = event.target.result;
        saveToLocalStorage(date, justification, fileBase64);
      };
      reader.readAsDataURL(fileInput);
    } else {
      saveToLocalStorage(date, justification, fileBase64);
    }
}

function exibirAlerta() {
    divAlerta.classList.remove('hidden');
    setTimeout(() => divAlerta.classList.add('hidden'), 2000);
}

btnRegistrarAusencia.addEventListener('click', () => {
    salvarJustificativa();
    exibirAlerta();
});
