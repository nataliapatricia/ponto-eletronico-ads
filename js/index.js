// Referências dos elementos HTML
const diaSemanaEl = document.getElementById('dia-semana');
const diaMesAnoEl = document.getElementById('dia-mes-ano');
const horaMinSegEl = document.getElementById('hora-min-seg');
const dialogPonto = document.getElementById('dialog-ponto');
const btnRegistrarPonto = document.getElementById('btn-registrar-ponto');
const btnDialogRegistrarPonto = document.getElementById('btn-dialog-registrar-ponto');
const btnDialogFechar = document.getElementById('btn-dialog-fechar');
const selectTiposPonto = document.getElementById('select-tipos-ponto');
const observacaoEl = document.getElementById('observacao'); // Referência para o campo de observação
const divAlerta = document.getElementById('div-alerta');
const listaRegistrosEl = document.getElementById('lista-registros');

const diasDaSemana = ["Domingo", "Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sábado"];

let registrosPonto = JSON.parse(localStorage.getItem('registrosPonto')) || [];

function getUserLocation() {
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition((position) => {
            let userLocation = {
                "latitude": position.coords.latitude,
                "longitude": position.coords.longitude
            }
            resolve(userLocation);
        },
        (error) => {
            reject(error);
        })
    })
}

// Função para salvar no localStorage
function salvarRegistros() {
    localStorage.setItem('registrosPonto', JSON.stringify(registrosPonto));
}

// Função para atualizar data e hora em tempo real
function atualizarDataHora() {
    const agora = new Date();

    diaSemanaEl.textContent = diasDaSemana[agora.getDay()];
    diaMesAnoEl.textContent = agora.toLocaleDateString('pt-BR');
    horaMinSegEl.textContent = agora.toLocaleTimeString('pt-BR');
}

setInterval(atualizarDataHora, 1000); // Atualiza a cada segundo

// Abrir o diálogo para registrar ponto
btnRegistrarPonto.addEventListener('click', () => {
    const agora = new Date();
    document.getElementById('dialog-data').textContent = agora.toLocaleDateString('pt-BR');
    document.getElementById('dialog-hora').textContent = agora.toLocaleTimeString('pt-BR');
    dialogPonto.showModal();
});

// Fechar o diálogo de ponto
btnDialogFechar.addEventListener('click', () => {
    dialogPonto.close();
});

// Função para exibir um alerta temporário
function exibirAlerta() {
    divAlerta.classList.remove('hidden');
    setTimeout(() => divAlerta.classList.add('hidden'), 2000);
}

// Registrar ponto e salvar no localStorage
btnDialogRegistrarPonto.addEventListener('click', () => {
    const agora = new Date();

    //let location;
    //
    // getUserLocation()
    //     .then((userLocation) => {
    //         location = {
    //             latitude: userLocation.latitude,
    //             longitude: userLocation.longitude
    //         };
    //     })
    //     .catch((error) => {
    //         console.error("Error getting location:", error);
    //         location = { latitude: 0, longitude: 0 };
    //     });

    const registro = {
        //latitude: location.latitude,
        //longitude: location.longitude,
        data: agora.toLocaleDateString('pt-BR'),
        hora: agora.toLocaleTimeString('pt-BR'),
        dia: diasDaSemana[agora.getDay()],
        tipo: selectTiposPonto.options[selectTiposPonto.selectedIndex].text,
        editado: false,
        observacao: observacaoEl.value.trim() || ""
    };

    registrosPonto.push(registro); // Adiciona o registro ao array
    salvarRegistros(); // Salva no localStorage
    exibirAlerta(); // Exibe o alerta de sucesso
    dialogPonto.close(); // Fecha o diálogo
    observacaoEl.value = ''; // Limpa o campo de observação para o próximo uso
});
