// ---------------------------------------------
// CARRINHO LOCALSTORAGE
// ---------------------------------------------
function getCarrinho() {
    return JSON.parse(localStorage.getItem("carrinho")) || [];
}

function salvarCarrinho(carrinho) {
    localStorage.setItem("carrinho", JSON.stringify(carrinho));
}

function adicionarAoCarrinho(produto) {
    let carrinho = getCarrinho();

    const existente = carrinho.find(item => item.id === produto.id);

    if (existente) {
        existente.quantidade += 1;
    } else {
        carrinho.push({ ...produto, quantidade: 1 });
    }

    salvarCarrinho(carrinho);
    atualizarNumeroCarrinho();
    alert("Produto adicionado!");
}

function atualizarNumeroCarrinho() {
    const carrinho = getCarrinho();
    const total = carrinho.reduce((acc, item) => acc + item.quantidade, 0);

    const badge = document.querySelector(".cart-count");

    if (badge) badge.innerText = total;
}

document.addEventListener("DOMContentLoaded", atualizarNumeroCarrinho);
