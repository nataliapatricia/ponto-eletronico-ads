// TO-DO:
// Organizar código

const diaSemana = document.getElementById("dia-semana");
const diaMesAno = document.getElementById("dia-mes-ano");
const horaMinSeg = document.getElementById("hora-min-seg");
const arrayDayWeek = ["Domingo","Segunda-feira","Terça-feira","Quarta-feira","Quinta-feira","Sexta-feira","Sabado"]

const dialogPonto = document.getElementById("dialog-ponto");


navigator.geolocation.getCurrentPosition((position) => {
    console.log(position);
    console.log(position.coords.latitude);
    console.log(position.coords.longitude);
});


let proxPonto = {
    "entrada": "intervalo",
    "intervalo": "volta-intervalo",
    "volta-intervalo": "saida",
    "saida": "entrada"
}

// TO-DO:
// apresentar para o usuário a data e hora atualizados
// atualizar a data todos os dias 00:00
// atualizar a hora todo segundo
const btnRegistrarPonto = document.getElementById("btn-registrar-ponto");
btnRegistrarPonto.addEventListener("click", () => {
    // TO-DO:
    // 1 - recuperar o select por meio de id ("select-tipos-ponto")
    let dialogSelect = document.getElementById("select-tipos-ponto");
    
    // 2 - recuperar o tipo do ultimo ponto que está salvo no localstorage
    // 2.1 - salvamos o tipo na chave "tipoUltimoPonto"
    // 2.2 - conseguimos recuperar um valor do localstorage com o getItem(chave)
    let ultimoPonto = localStorage.getItem("tipoUltimoPonto");
    
    // 3 - Fazer uma condicional e atribuir o valor do select conforme tabela
    // tipo ultimo ponto  |  valor select
    // entrada            |  intervalo
    // intervalo          |  volta-intervalo
    // volta-intervalo    |  saida
    // saida              |  entrada
    // let proximoPonto = proxPonto[/*tipo do último ponto*/];

    // 3.1 para setar o valor de um select, usamos o atributo value
    dialogSelect.value = proxPonto[ultimoPonto];
    
    dialogPonto.showModal();
});


const btnDialogFechar = document.getElementById("btn-dialog-fechar");
btnDialogFechar.addEventListener("click", () => {
    dialogPonto.close();
});


const btnDialogRegistrarPonto = document.getElementById("btn-dialog-registrar-ponto");
btnDialogRegistrarPonto.addEventListener("click", () => {
    let data = dataCompleta();
    let hora = horaCompleta();
    let tipoPonto = document.getElementById("select-tipos-ponto").value;

    let ponto = {
        "data": data,
        "hora": hora,
        "tipo": tipoPonto,
        "id": 1
    }

    // TO-DO:
    // Somente o ultimo registro está sendo salvo
    // como resolver isso, de modo que eu persista todos os pontos?
    localStorage.setItem("registro", JSON.stringify(ponto));
    localStorage.setItem("tipoUltimoPonto", tipoPonto);

    // TO-DO:
    // salvar o útimo tipo do ponto registrado pelo usuário
    // fazer o select considerar esse último ponto e selecionar, por padrão
    // o próximo possível ponto do usuário
    // Exemplo: usuário registrou "entrada", determinar que o select apresente "intervalo" como valor padrão

    console.log(ponto);
    dialogPonto.close();
});

function daySemana() {
    const date = new Date();
    return arrayDayWeek[date.getDay()];
}

function dataCompleta() {
    const date = new Date();
    return String(date.getDate()).padStart(2, '0') + "/" + String(date.getMonth() + 1).padStart(2, '0') + "/" + date.getFullYear();
}

function horaCompleta() {
    const date = new Date();
    return String(date.getHours()).padStart(2, '0') + ":" + String(date.getMinutes()).padStart(2, '0') + ":" + String(date.getSeconds()).padStart(2, '0');
}

function atualizaHora() {
    horaMinSeg.textContent = horaCompleta();
}

setInterval(atualizaHora, 1000);

diaSemana.textContent = daySemana();
diaMesAno.textContent = dataCompleta();
