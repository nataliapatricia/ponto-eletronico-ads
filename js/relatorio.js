const apagarRegistrosEl = document.getElementById('apaga-registros');
const filterSelect = document.getElementById("filter-select");
const diasDaSemana = ["Domingo", "Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sábado"];

function criarRelatorio(filtro) {
    const hoje = new Date();
    const containerRegistros = document.getElementById("container-registros");
    containerRegistros.innerHTML = "";

    let registrosOriginais = JSON.parse(localStorage.getItem("registrosPonto")) || [];
    
    const registrosIndexados = registrosOriginais.map((registro, index) => {
        return {
            ...registro,
            index: index
        };
    });

    const registrosFiltrados = registrosIndexados.filter(registro => {
        const dataRegistro = new Date(registro.data.split('/').reverse().join('-'));

        if (filtro === "last-week") {
            const umaSemanaAtras = new Date(hoje);
            umaSemanaAtras.setDate(hoje.getDate() - 7);
            return dataRegistro >= umaSemanaAtras && dataRegistro <= hoje;
        } else if (filtro === "last-month") {
            const umMesAtras = new Date(hoje);
            umMesAtras.setMonth(hoje.getMonth() - 1);
            return dataRegistro >= umMesAtras && dataRegistro <= hoje;
        } else {
            return true;
        }
    });

    const registrosOrdenados = registrosFiltrados.sort((a, b) => {
        const dataHoraA = new Date(a.data.split('/').reverse().join('-') + ' ' + a.hora);
        const dataHoraB = new Date(b.data.split('/').reverse().join('-') + ' ' + b.hora);
        return dataHoraA - dataHoraB;
    });

    registrosOrdenados.forEach(registro => {
        console.log(registro);
        
        const color = registro.editado ? "#FFCCCC" : "white";
        const divRegistro = document.createElement("div");
        divRegistro.classList.add("abcd");

        const inputData = document.createElement("input");
        inputData.type = "text";
        inputData.value = registro.data;
        inputData.readOnly = true;
        inputData.style.border = "none";
        inputData.style.width = "10%";
        inputData.style.marginRight = "10px";

        const inputTipo = document.createElement("input");
        inputTipo.type = "text";
        inputTipo.value = registro.tipo;
        inputTipo.readOnly = true;
        inputTipo.style.border = "none";
        inputTipo.style.backgroundColor = "transparent";
        inputTipo.style.width = "12%";
        inputTipo.style.marginRight = "10px";

        const inputHora = document.createElement("input");
        inputHora.type = "text";
        inputHora.value = registro.hora;
        inputHora.disabled = true;
        inputHora.style.backgroundColor = color;
        inputHora.style.width = "8%";
        inputHora.style.marginRight = "10px";

        const inputObservacao = document.createElement("input");
        inputObservacao.type = "text";
        inputObservacao.value = registro.observacao;
        inputObservacao.disabled = true;
        inputObservacao.style.backgroundColor = color;
        inputObservacao.style.width = "30%";
        
        const buttonEditar = document.createElement("button");
        buttonEditar.textContent = "Editar";
        buttonEditar.style.marginRight = "10px";

        const buttonSalvar = document.createElement("button");
        buttonSalvar.textContent = "Salvar";
        buttonSalvar.style.marginRight = "10px";
        buttonSalvar.style.display = "none";

        buttonEditar.addEventListener("click", () => {
            inputHora.disabled = false;
            inputObservacao.disabled = false;
            buttonEditar.style.display = "none";
            buttonSalvar.style.display = "inline";
        });

        buttonSalvar.addEventListener("click", () => {
            registrosOriginais[registro.index].hora = inputHora.value;
            registrosOriginais[registro.index].observacao = inputObservacao.value;
            registrosOriginais[registro.index].editado = true;

            localStorage.setItem("registrosPonto", JSON.stringify(registrosOriginais));

            inputHora.disabled = true;
            inputObservacao.disabled = true;
            buttonEditar.style.display = "inline";
            buttonSalvar.style.display = "none";
            criarRelatorio(filtro);
        });

        divRegistro.appendChild(inputData);
        divRegistro.appendChild(inputTipo);
        divRegistro.appendChild(inputHora);
        
        divRegistro.appendChild(buttonEditar);
        divRegistro.appendChild(buttonSalvar);

        divRegistro.appendChild(inputObservacao);

        containerRegistros.appendChild(divRegistro);
    });

}

function baixarJSON() {
    const blob = new Blob([JSON.stringify(registrosPonto, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'ponto.json';
    a.click();
    URL.revokeObjectURL(url);
}

apagarRegistrosEl.addEventListener('click', () => {
    localStorage.setItem('registrosPonto', JSON.stringify([]));
    criarRelatorio();
})

filterSelect.addEventListener("change", () => {
    criarRelatorio(filterSelect.value);
});

criarRelatorio("");
