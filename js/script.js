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
    // Adiciona a lógica da máscara e da validação aqui
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
    const jsonProduct = JSON.stringify(produtos)
    localStorage.setItem('produtos', jsonProduct)
}

function adicionarProduto() {
    const codBarras = document.getElementById('codbarras').value
    const nomeProduto = document.getElementById('nome').value
    const quantProduto = document.getElementById('quantidade').value
    const precoProduto = document.getElementById('preco').value

    if (nomeProduto == '' || quantProduto == '' || precoProduto == ''  || codBarras == '' )
    {
        alert('impossivel adicionar produto, algum campo está incompleto/inválido!')
        return
    }

    if (preco < 1 ) {
        alert('Impossivel adicionar produto, preço deve ser maior que 0!')
        return
    }

    if (quantidade < 1) {
        alert('Impossivel adicionar produto, quantidade deve ser maior que 0!')
    }

    if (produtos.some(produto => produto.cod === codBarras)) {
        alert("Impossível adicionar produto, código de barras já existente!");
        return;
    }

    let produto = {
        cod: codBarras, nome: nomeProduto, quantidade: quantProduto, preco: precoProduto
    }

    produtos.push(produto)
    salvaProdutosLocalStorage()
    listarProdutos(produtos)
    document.getElementById('formProduto').reset()
    console.log(produtos)
}

function removerUltimo() {
    if (produtos.length == 0)
    {
        alert('Impossivel remover, nenhum produto cadastrado!')
        return
    }
    produtos.pop()
    salvaProdutosLocalStorage()
    listarProdutos()
}

function removerPrimeiro() {
    if (produtos.length == 0)
    {
        alert('Impossivel remover, nenhum produto cadastrado!')
        return
    }
    produtos.shift()
    salvaProdutosLocalStorage()
    listarProdutos()
}

function listarProdutos() {
    let corpo = document.getElementById('corpo')
    corpo.innerHTML = '' // esvazia a tabela
    let linhas = ''
    produtos.forEach(product => { // para cada produto, adiciona esses itens
        linhas += `
        <tr>
            <td>${product.cod}</td>
            <td>${product.nome}</td>
            <td>${product.quantidade}</td>
            <td>R$ ${parseFloat(product.preco).toFixed(2)}</td>
        </tr>
    `;
    });

    corpo.innerHTML = linhas // recria a tabela com os itens atualizados
    calcularTotal()
}

function ordenarPorNome() {
    produtos.sort((a, b) => a.nome.localeCompare(b.nome));
    listarProdutos();
}

function ordenarPorPreco() {
    produtos.sort((a, b) => a.preco - b.preco);
    listarProdutos();
}

function filtrarPorPreco() {
    const produtosFiltrados = produtos.filter(prod => parseFloat(prod.preco) > 100)
    .map(prod => prod.nome)
    .join(', ')

    if (produtosFiltrados == '')
    {
        alert('Nenhum produto com preco maior que 100 cadastrado')
    } else {
    alert(`Produtos com preço maior que 100: ${produtosFiltrados}`)
    }
}

function calcularTotal() {
    const total = produtos.reduce((soma, produto) => {
        return soma + (parseFloat(produto.preco) * parseInt(produto.quantidade));
    }, 0);
    document.getElementById('totalPreco').textContent = `Total: R$ ${total.toFixed(2)}`;
}

