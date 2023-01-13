let numeroDeCartas;

const imagens = [];
let cartaVirada = null;
let animando = false;


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
cartas.style.maxWidth = (125 * numeroDeCartas/2) +"px";

for (let index = 0; index < numeroDeCartas; index++){
  imagens[index] = index < 2 
    ? 1
    : ehImpar(index) 
      ? index-1
      :index;
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
if(animando){
  return;
}  
carta.classList.toggle('flip');

if(!cartaVirada){
  cartaVirada = carta;
  return;
}

if(cartaVirada.dataset.valor !== carta.dataset.valor){
  animando = true;
  setTimeout(() => {
    carta.classList.toggle('flip');
    cartaVirada.classList.toggle('flip');
    console.log(cartaVirada);
    cartaVirada = null;
    animando = false;
  },3000);   
  return;
}

  carta.removeAttribute("onclick");
  cartaVirada = null;

}

function compararCarta(){

}
