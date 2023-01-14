let numeroDeCartas;

const imagens = [];
let cartaVirada;
let animando;
let numeroCartasViradas;
let numeroJogadas;
const cartas = document.querySelector(".cards");
let reiniciar;
let idInterval;
let segundos;
const contador = document.querySelector(".timer");  

function tempo(){
  contador.innerText = segundos;
  segundos++;
}

function ehImpar(numero) {
  const divisor = 2;
  return numero % divisor !== 0;
}

function erro(mensagem){
  alert(mensagem);
  numeroDeCartas = null;
}

function faixaDeValores(valor){
  return (valor < 4 || valor > 14) ? true:false;
}

// embaralha o array imagens
function comparador() { 
	return Math.random() - 0.5; 
}

function flip(carta){
  numeroJogadas = numeroJogadas + 1;
 
  if(animando){
    return;
  }  
  carta.classList.toggle('flip');

  if(!cartaVirada){
    cartaVirada = carta;
    numeroCartasViradas = numeroCartasViradas + 1;
    return;
  }

  numeroCartasViradas = numeroCartasViradas + 1;

  if(cartaVirada.dataset.valor !== carta.dataset.valor){
    animando = true;
    setTimeout(() => {
      carta.classList.toggle('flip');
      cartaVirada.classList.toggle('flip');
      cartaVirada = null;
      animando = false;
      numeroCartasViradas = numeroCartasViradas - 2;
    },2000);   
    return;
  }

  cartaVirada.removeAttribute("onclick");
  carta.removeAttribute("onclick");
  cartaVirada = null;

  if(numeroCartasViradas === numeroDeCartas){
    clearInterval(idInterval);
    setTimeout(() => {
    alert("Você ganhou em " + numeroJogadas + " jogadas!" + " A duração do jogo foi de " + (segundos-1) + " segundos!");
   
    reiniciar = prompt("Gostaria de reiniciar a partida,\n sim ou não?");; 

    while (reiniciar !== "sim" && reiniciar !== "não"){
      reiniciar = prompt("Gostaria de reiniciar a partida,\n  digite exatamente sim ou não?");
    }

    if(reiniciar === "sim"){
      iniciarJogo();
    }
  
  },1000);

  }

}
  
function iniciarJogo(){
  segundos = 0;
  cartas.innerHTML = "";
  cartaVirada = null;
  animando = false;
  numeroCartasViradas = 0;
  numeroJogadas = 0;
  segundos = 0;

  do {
    numeroDeCartas = parseInt(prompt("informe o número de cartas"));
  
    if (isNaN(numeroDeCartas)) {
      erro("número inválido, informe um número");
      continue;
    }
  
    if (faixaDeValores(numeroDeCartas)) {
      erro("informe um número entre 4 e 14");
      continue;
    } 
  
    if (ehImpar(numeroDeCartas)) {
      erro("informe um número par");
      continue;
    } 
  
  } while (!numeroDeCartas);

  if(numeroDeCartas > 7){
    cartas.style.maxWidth = (125 * numeroDeCartas/2) +"px";
    cartas.style.height = 326 +"px";
  }
  
  for (let index = 0; index < numeroDeCartas; index++){
    imagens[index] = index - (Math.ceil(index/2) -1 );
  }
  
  imagens.sort(comparador); // Após esta linha, a minhaArray estará embaralhada
  
  
  for (let index = 0; index < numeroDeCartas; index++) { 
     cartas.innerHTML += `<div data-test ="card" class="card" onclick="flip(this)" data-valor="${imagens[index]})">
     <div class="front">
         <img  data-test="face-down-image" src="./img/back.png" alt="">
     </div>
     <div class="back">
         <img  data-test="face-up-image" src="./img/imagem${imagens[index]}.gif" alt="">
     </div>    
    </div>`;   
  }

  idInterval = setInterval(tempo,1000);
  
}

iniciarJogo();