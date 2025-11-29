document.addEventListener("DOMContentLoaded", () => {

    const btnAdd = document.querySelector("#add-to-cart");
    const btnBuy = document.querySelector("#buy-now");

    const produto = {
        id: parseInt(document.querySelector("body").dataset.id),
        nome: document.querySelector("#produto-nome").innerText,
        preco: parseFloat(document.querySelector("#produto-preco").innerText.replace("R$", "").replace(",", ".")),
        imagem: document.querySelector("#produto-img").src
    };

    if (btnAdd) {
        btnAdd.addEventListener("click", () => adicionarAoCarrinho(produto));
    }

    if (btnBuy) {
        btnBuy.addEventListener("click", () => {
            adicionarAoCarrinho(produto);
            window.location.href = "../cart.html";
        });
    }
});
