let numeroDeCartas;

const imagens = [];
let cartaVirada = null;
let animando = false;
let numeroCartasViradas = 0;
let numeroJogadas = 0;


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

const cartas = document.querySelector(".cards");

if(numeroDeCartas > 7){
  cartas.style.maxWidth = (125 * numeroDeCartas/2) +"px";
}

for (let index = 0; index < numeroDeCartas; index++){
  imagens[index] = index - (Math.ceil(index/2) -1 );
}

imagens.sort(comparador); // Após esta linha, a minhaArray estará embaralhada
// embaralha o array imagens
function comparador() { 
	return Math.random() - 0.5; 
}

for (let index = 0; index < numeroDeCartas; index++) { 
   cartas.innerHTML += `<div class="card" onclick="flip(this)" data-valor="${imagens[index]})">
   <div class="front">
       <img src="./img/back.png" alt="">
   </div>
   <div class="back">
       <img src="./img/imagem${imagens[index]}.gif" alt="">
   </div>    
  </div>`;   
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
    },3000);   
    return;
  }

  carta.removeAttribute("onclick");
  cartaVirada = null;

  if(numeroCartasViradas === numeroDeCartas){
    setTimeout(() => {
    alert("Você ganhou em " + numeroJogadas + " jogadas!");
    },100);
  }

  }

  

