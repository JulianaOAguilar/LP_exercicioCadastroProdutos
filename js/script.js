// 1. Inicializa a variável 'produtos' no escopo global
// Isso garante que todas as outras funções possam acessá-la.
let produtos = [];


// Exemplo de como validar o campo código e adicionar máscara automática. 
// >>>>>>>>>>>>>   Não precisa sem implementado nada aqui <<<<<<<<<<<<<<<<<<<<<<<
document.addEventListener('DOMContentLoaded', function() {
    // 2. Carrega os produtos do Local Storage
    function carregaProdutosLocalStorage() {
        produtos = JSON.parse(localStorage.getItem('produtos')) || [];
    }

    // 3. Adiciona o evento de 'blur', ou seja, quando sai do campo ao campo de código de barras
    // Adicione a lógica da máscara e da validação aqui
    const inputCodBarras = document.getElementById('codbarras');
    inputCodBarras.addEventListener('input', function(e) {
        let valor = e.target.value;
        valor = valor.replace(/\D/g, '');
        valor = valor.replace(/^(\d{1})(\d{6})(\d{6})/, "$1.$2.$3");
        if (valor.length > 15) {
            valor = valor.slice(0, 15);
        }
        e.target.value = valor;
    });

    inputCodBarras.addEventListener('blur', function() {
        const valor = inputCodBarras.value.replace(/\D/g, '');
        if (valor === '') {
            alert('Por favor, preencha o código de barras.');
            inputCodBarras.focus() //Faz com que o foco volte ao campo Código de Barras
        } else if (valor.length !== 13) {
            alert('O código de barras deve ter 13 dígitos.');
            inputCodBarras.focus()
        }
    });

    // 4. Carrega a lista de produtos 
    carregaProdutosLocalStorage();

    // 5. Lista os produtos na tabela
    listarProdutos(); 

});


// --- Funções que devem ser implementadas por vocês ---


function salvaProdutosLocalStorage() {
    // Dica: Use JSON.stringify() para converter o array 'produtos' em uma string
    // e localStorage.setItem('produtos', ...) para salvar no Local Storage.
}

function adicionarProduto() {
    // Dica: 
    // 1. Pegue os valores dos campos do formulário: codbarras, nome, quantidade e preco.
    // 2. Crie um objeto com esses valores.
    // 3. Adicione este novo objeto ao array 'produtos' usando o método push().
    // 4. Chame salvaProdutosLocalStorage() para persistir os dados.
    // 5. Chame listarProdutos() para atualizar a tabela na tela.
    // 6. Limpe o formulário com document.getElementById('formProduto').reset().
    // 7. Implemente a validação para que os campos não fiquem vazios.
    // 8. Verifique se o produto já existe pelo código de barras e alerte o usuário.
}

function removerUltimo() {
    // Dica: Use o método pop() para remover o último item do array 'produtos'.
    // Lembre-se de chamar salvaProdutosLocalStorage() e listarProdutos() depois.
    // Verifique se a lista não está vazia antes de tentar remover.
}

function removerPrimeiro() {
    // Dica: Use o método shift() para remover o primeiro item do array 'produtos'.
    // Lembre-se de chamar salvaProdutosLocalStorage() e listarProdutos() depois.
    // Verifique se a lista não está vazia antes de tentar remover.
}

function listarProdutos() {
    // Dica: 
    // 1. Encontre o elemento <tbody> da sua tabela.
    // 2. Limpe o conteúdo existente com innerHTML = ''.
    // 3. Use o método forEach() para iterar sobre o array 'produtos'.
    // 4. Para cada produto, crie uma string de linha de tabela (<tr>...</tr>)
    //    e adicione ao innerHTML do <tbody>.
    // 5. Chame a função calcularTotal() no final para atualizar o valor total.
}

function ordenarPorNome() {
    // Dica: Use o método sort() no array 'produtos'.
    // A função de comparação deve usar localeCompare() para comparar os nomes (a.nome, b.nome).
    // Depois, chame listarProdutos() para exibir a lista ordenada.
}

function ordenarPorPreco() {
    // Dica: Use o método sort() no array 'produtos'.
    // A função de comparação deve retornar a diferença entre os preços (a.preco - b.preco).
    // Depois, chame listarProdutos() para exibir a lista ordenada.
}

function filtrarPorPreco() {
    // Dica: Use o método filter() para criar um novo array com produtos
    // cujo preço seja maior que 100.
    // Em seguida, use map() para extrair apenas os nomes dos produtos filtrados.
    // Use join(', ') para formatar os nomes em uma única string e exiba com alert().
}

function calcularTotal() {
    // Dica: Use o método reduce() no array 'produtos'.
    // A função de callback deve somar o valor total de cada produto (produto.quantidade * produto.preco).
    // Atualize o texto do elemento HTML que exibe o total com o valor formatado.
}