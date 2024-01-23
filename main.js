const html = document.querySelector('html');
const focoBotao = document.querySelector('.app__card-button--foco');
const curtoBotao = document.querySelector('.app__card-button--curto');
const longoBotao = document.querySelector('.app__card-button--longo');
const imagemDeFundo = document.querySelector('.app__image');
const textoPrincipal = document.querySelector('.app__title');
const musicaInput = document.getElementById('alternar-musica');
const BotaoPausePlay = document.querySelector('#start-pause span');
const startEndStopButton = document.querySelector('#start-pause');
const iconPausePlayButton = document.querySelector('.app__card-primary-butto-icon');
const tempoTela = document.querySelector('#timer');
const audioFoco = new Audio('./sons/luna-rise-part-one.mp3');
const audioPlay = new Audio('./sons/play.wav');
const audioPause = new Audio('./sons/pause.mp3');
const audioBeep = new Audio('./sons/beep.mp3');

let tempoDecorridoEmSegundos = 1500;
let intervalId = null;

audioFoco.loop = true;
audioFoco.volume = 0.5;


musicaInput.addEventListener('change', ()=> {
    if(audioFoco.paused){
        audioFoco.play();
    }else{
        audioFoco.pause();
    }
})

focoBotao.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 1500;
    eventPage('foco');
    focoBotao.classList.add('active');
    curtoBotao.classList.remove('active');
    longoBotao.classList.remove('active');
});

curtoBotao.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 300;
    eventPage('descanso-curto');
    focoBotao.classList.remove('active');
    curtoBotao.classList.add('active');
    longoBotao.classList.remove('active');
});

longoBotao.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 900;
    eventPage('descanso-longo');
    focoBotao.classList.remove('active');
    curtoBotao.classList.remove('active');
    longoBotao.classList.add('active');
});


function eventPage(contexto) {
    exibirTempo(contexto);
    html.setAttribute('data-contexto', contexto);
    imagemDeFundo.setAttribute('src', `/imagens/${contexto}.png`);

    switch (contexto) {
        case 'foco':
            textoPrincipal.innerHTML = `<h1 class="app__title">
            Otimize sua produtividade,<br>
            <strong class="app__title-strong">mergulhe no que importa.</strong>
            </h1>`;
            break;
        case 'descanso-curto':
            textoPrincipal.innerHTML = `<h1 class="app__title">
            Que tal dar uma respirada?<br>
            <strong class="app__title-strong">Faça uma pausa curta!</strong>
            </h1>`;
            break;
        case 'descanso-longo':
            textoPrincipal.innerHTML = `<h1 class="app__title">
            Hora de voltar à superfície.<br>
            <strong class="app__title-strong">Faça uma pausa longa.</strong>
            </h1>`;
            break;
    }
}

const contagemRegressiva = () => {
    if(tempoDecorridoEmSegundos <= 0){        
        //audioBeep.play();
        alert('Tempo finalizado');
        zerar();
        return
    }

    tempoDecorridoEmSegundos -= 1;
    exibirTempo();
}

startEndStopButton.addEventListener('click', iniciarPausar);

function iniciarPausar() {
    if(intervalId){
        zerar();
        audioPause.play();
        return;
    }
    intervalId = setInterval(contagemRegressiva, 1000);
    audioPlay.play();
    BotaoPausePlay.textContent = 'Pausar';
    iconPausePlayButton.setAttribute('src', '/imagens/pause.png');
}

function zerar() {
    clearInterval(intervalId);
    intervalId = null;
    BotaoPausePlay.textContent = 'Começar'; 
    iconPausePlayButton.setAttribute('src', '/imagens/play_arrow.png');   
}

function exibirTempo() {
    const tempo = new Date(tempoDecorridoEmSegundos * 1000);
    const tempoFormatado = tempo.toLocaleTimeString('pt-br', {minute: '2-digit', second:'2-digit'});
    tempoTela.textContent = `${tempoFormatado}`;
}

exibirTempo();

