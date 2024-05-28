const socket = io();
  
const response = document.getElementById('response');
const messages = document.getElementById('messages');
const ranking = document.getElementById('responseRank');
const userName = document.getElementById('nomejogador');
const userNumPerguntas = document.getElementById('numperguntas');

var idUser = '';
var idPerguntaAtual = '';
var respondidas = [];

document.getElementById('jogar').onclick = function() {
    Swal.fire({
        title: "Digite seu nome",
        input: "text",
        inputAttributes: {
          autocapitalize: "off"
        },
        showCancelButton: true,
        confirmButtonText: "Começar",
        showLoaderOnConfirm: true,
        allowOutsideClick: () => !Swal.isLoading()
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            title: `Bem vindo ${result.value}`,
          });
        }
        messages.innerHTML = '';
        socket.emit('registrar', {nome: result.value});
      });
};

socket.on('registrar', (res) => {
    idUser = res.id;
    userName.textContent = res.nome
    ranking.innerHTML = '';
});

socket.on('greetings', (res) => {
    if(idUser != ''){
        ranking.innerHTML = '';
        for (let i = 0; i < res.ranking.length; i++) {
            let linha = document.createElement("tr");
            let coluna = document.createElement("td");
            coluna.textContent = res.ranking[i].name;
            let coluna2 = document.createElement("td");
            coluna2.textContent = res.ranking[i].score;
            linha.appendChild(coluna);
            linha.appendChild(coluna2);
            ranking.appendChild(linha);
        }
    }
});
  
function criarCaixadeRespostas(respostas) {
    let cardDiv = document.createElement("div");
    cardDiv.classList.add("card");
    let contDiv = document.createElement("div");
    contDiv.classList.add("card-body");
    
    for (let i = 0; i < 3; i++) {
        let rowDiv = document.createElement("div");
        rowDiv.style = "padding:1rem;";
        rowDiv.classList.add("row","m-0", "border-0");

        for (let j = 0; j < 2; j++) {
            let colDiv = document.createElement("div");
            colDiv.classList.add("col-sm-6");

            let button = document.createElement("button");
            button.classList.add("btn", "btn-primary");
            button.textContent = respostas[i+j];
            button.dataid = i+j;
            button.onclick = function() {
                socket.emit('result', {resposta: button.dataid, userId: idUser,respondidas: respondidas, perguntaId: idPerguntaAtual});
            };
        
            colDiv.appendChild(button);
            rowDiv.appendChild(colDiv);
        }
        i++;
        contDiv.appendChild(rowDiv);
    }
    
    cardDiv.appendChild(contDiv);

    return cardDiv;
}

socket.on('response', (res) => {
    userNumPerguntas.textContent = respondidas.length+1;
    response.innerHTML = '';
    const item = document.createElement('div');
    item.className = 'alert alert-info';
    item.textContent = res.pergunta;
    response.appendChild(item);
    messages.innerHTML = '';
    messages.appendChild(criarCaixadeRespostas(res.respostas));
    idPerguntaAtual = res.id
    respondidas.push(res.id);
});

socket.on('result', (res) => {
    if(res.resposta){
        Swal.fire({
            title: "Boa!",
            text: "Resposta Correta!",
            icon: "success"
        });
    }else{
        Swal.fire({
            title: "Ops!",
            text: "Resposta Errada!",
            icon: "error"
        });
    }
    window.scrollTo(0, document.body.scrollHeight);
});

socket.on('final', (res) => {
    response.innerHTML = '';
    messages.innerHTML = '';
    if(res.score == 10){
        Swal.fire({
            title: "Parabens!",
            text: "Você acertou todas as perguntas!",
            icon: "success"
        });
    }else{
        Swal.fire({
            title: "Que pena!",
            text: `Voce acertou apenas ${res.score} perguntas!`,
            icon: "error"
        });
    }
    window.scrollTo(0, document.body.scrollHeight);
});