let input = document.getElementById('inputTarefa');
let btnAdd = document.getElementById('btn-add');
let main = document.getElementById('areaLista');
let contador=0;

function addTarefa() {
    // pega o valor digitado
    let valorInput = input.value;
    // validaçao
    if ((valorInput !== "") && (valorInput !== null) && (valorInput !== undefined)) {

          ++contador;

        let novoItem = `<div id="${contador}" class="item">
            <div onclick= "marcarTarefa(${contador})" class="item-icone">
               <i id="icone_${contador}" class="check"></i>
            </div>
            <div onclick= "marcarTarefa(${contador})" class="item-nome">
              ${valorInput}
            </div>
            <div class="item-botao">
              <button onclick = "deletar(${contador})" class="btn-2">Deletar</button>
              
            </div>
            
        </div>`;// coloquei aquele ${valorInput} pra ele receber o valor digitado , tem que ser nessa nomenclatura pq usei as crases `` 
        main.innerHTML += novoItem;// adiciona novo item

        //zerar o campo
        input.value = "";
        input.focus();// foco no campo do input


    }
}


function marcarTarefa(id){
 var item = document.getElementById(id);
 var classe = item.getAttribute('class');
 if(classe=="item"){
    item.classList.add('clicado');

    var icone = document.getElementById('icone_'+id);
    icone.classList.add(':after');
    item.parentNode.appendChild(item);
 }
else{
  item.classList.remove('clicado');

    var icone = document.getElementById('icone_'+id);
    icone.classList.remove(':after');
}



}
function deletar (id){
  var tarefa = document.getElementById(id);
  tarefa.remove();
}

input.addEventListener("keyup", function (event) {
    if (event.keyCode === 13) {//tecla do enter é 13
        event.preventDefault();
        btnAdd.click();

    }
})