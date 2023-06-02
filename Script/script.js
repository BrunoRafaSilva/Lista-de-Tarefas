/* Definição previa das variaveis que seram utilizadas mais de uma vez ao longo do código de forma global */
const newTask = document.getElementById('textField');
const btnInsert = document.getElementById('addButton');
const btnDeleteAll = document.getElementById('clearListButton');
const ul = document.querySelector('ul');

/* Criado array vazio, para armazenar os itens que serão adicionados  */
let itensDB = [];

/* Faz com que o pressionando da tecla `Enter` enquanto preenche o `input:text` seja igual a clicar em adicionar */
newTask.addEventListener('keypress', e => {
  if (e.key == 'Enter' && newTask.value != '') {
    setItemDB();
  }
})

/* Assimila o botão de adicionar a uma função (Função de adicionar item a lista) */
btnInsert.onclick = () => {
  if (newTask.value != '') {
    setItemDB();
  }
}

/* Cria uma lista com chave `tasksLista` no armazenamento local do navegador e adiciona os itens criados */
function updateDB() {
  localStorage.setItem('tasksLista', JSON.stringify(itensDB))
  loadItens();
}

/* Adiciona o texto preenchido na `input` para o array criado vazio anteriormente */
function setItemDB() {

  itensDB.push({ 'item': newTask.value, 'status': '' });
  updateDB();
}

/* Recupera a lista armazenada no `localStorage:tasksLista` e em seguindo ela percorre os itens presentes no banco e insere eles na tela com combinações de `chave, valor` */
function loadItens() {
  ul.innerHTML = "";
  itensDB = JSON.parse(localStorage.getItem('tasksLista')) ?? [];
  itensDB.forEach((item, i) => {
    insertItemTela(item.item, item.status, i);
  })
}

/* Adiciona o item `type text` preenchido na tela, incluindo seu status de estar com a checkbox marcada ounão */
function insertItemTela(text, status, i) {
  const li = document.createElement('li');
  
  /* Item que será adicionado na `ul`(lista desornedada*/
  li.innerHTML = `
    <div class="divLi">
      <input type="checkbox" ${status} data-i=${i} onchange="done(this, ${i});"/>
      <span data-si=${i}>${text}</span>
      <button onclick="removeItem(${i})" data-i=${i}><i class='bx bx-trash'></i></button>
    </div>
    `
  /* Adiciona o novo elemento a lista `ul` */
  ul.appendChild(li);

  /* Identificado status checked, risca o texto */
  if (status) {
    document.querySelector(`[data-si="${i}"]`).classList.add('line-through');
  } else {
    document.querySelector(`[data-si="${i}"]`).classList.remove('line-through');
  }

  newTask.value = '';
}

/* Checa se o status da checkbox está `checked`, se sim, adicionado o status checked para manipulação do texto e do css  */
function done(chk, i) {

  if (chk.checked) {
    itensDB[i].status = 'checked' ;
  } else {
    itensDB[i].status = ''; 
  }

  updateDB();
}

/* Adiciona a função de remover a lixeira presente em cada item da lista, removendo ela do localStorage pelo indice*/
function removeItem(i) {
  itensDB.splice(i, 1);
  updateDB();
}

/* Caso já haja itens no `localSorage`, carrega os mesmo assim que o script da página for carregado */
loadItens();

/* Está ação gera um `alert` na tela cujo solicita confirmação de limpar a lista e como consequência o `localStorage` */
btnDeleteAll.onclick = () => {
  let question = confirm("Essa ação irá limpar sua lista por completo, deseja prosseguir?");
  if(question==true){
    {
      itensDB = [];
      updateDB();
    }
  }
}