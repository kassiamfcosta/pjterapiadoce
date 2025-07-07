// Variáveis globais
let cart = [];
let modalQt = 1;
let modalKey = 0;


// Carregar os doces na página
doceJson.map((item, index) => {
    let doceItem = document.querySelector('.models .doce-item').cloneNode(true);
    document.querySelector('.doce-area').append(doceItem);

    // Preencher os dados de cada doce
    doceItem.querySelector('.doce-item--img img').src = item.img;
    
    // Garantir que o preço seja tratado como número
    let preco = parseInt(item.price);
    if (!isNaN(preco)) {
        doceItem.querySelector('.doce-item--price').innerHTML = `R$ ${preco.toFixed(2)}`;
    } else {
        doceItem.querySelector('.doce-item--price').innerHTML = 'Preço indisponível';
    }

    doceItem.querySelector('.doce-item--name').innerHTML = item.name;
    doceItem.querySelector('.doce-item--desc').innerHTML = item.description;

    // Evento para abrir o modal
    doceItem.querySelector('a').addEventListener('click', (e) => {
        e.preventDefault();
        openModal(index);
    });
    console.log('item.price:', item.price, 'typeof:', typeof item.price);
});

document.getElementById('topBtn').addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});


// Abrir modal
function openModal(index) {
    modalQt = 1;
    modalKey = index;

    let doce = doceJson[index];

    document.querySelector('.doceBig img').src = doce.img;
    document.querySelector('.doceInfo h1').innerHTML = doce.name;
    document.querySelector('.doceInfo--desc').innerHTML = doce.description;

    // Preencher tamanhos
    const sizesContainer = document.querySelector('.doceInfo--sizes');
    sizesContainer.innerHTML = ''; // limpa os botões antigos

    // Adiciona um botão para cada tamanho disponível
    doce.sizes.forEach((label, idx) => {
        const sizeBtn = document.createElement('div');
        sizeBtn.classList.add('doceInfo--sizes');
        if (idx === 0) sizeBtn.classList.add('selected'); // seleciona o 1º por padrão
        sizeBtn.setAttribute('data-size', idx);

        const span = document.createElement('span');
        span.innerText = label;
        sizeBtn.appendChild(span);
        sizesContainer.appendChild(sizeBtn);

        sizeBtn.addEventListener('click', () => {
            document.querySelectorAll('.doceInfo--sizes').forEach(s => s.classList.remove('selected'));
            sizeBtn.classList.add('selected');
            updateModalPrice();
        });
    });


    updateModalPrice();

    document.querySelector('.doceInfo--qt').innerHTML = modalQt;
    document.querySelector('.doceWindowArea').style.display = 'flex';
    setTimeout(() => {
        document.querySelector('.doceWindowArea').style.opacity = 1;
    }, 10);
}

// Atualizar preço no modal
function updateModalPrice() {
    const selectedBtn = document.querySelector('.doceInfo--size.selected');
    if (!selectedBtn) return;

    const selectedSizeIdx = parseInt(selectedBtn.getAttribute('data-index'));
    const price = doceJson[modalKey].prices[selectedSizeIdx];

    if (price !== undefined) {
        document.querySelector('.doceInfo--actualPrice').innerHTML = `R$ ${price.toFixed(2)}`;
    } else {
        document.querySelector('.doceInfo--actualPrice').innerHTML = 'Preço não disponível';
    }
}

// Fechar modal
function closeModal() {
    document.querySelector('.doceWindowArea').style.opacity = 0;
    setTimeout(() => {
        document.querySelector('.doceWindowArea').style.display = 'none';
    }, 500);
}

// Eventos do modal
document.querySelectorAll('.doceInfo--cancelButton, .doceInfo--cancelMobileButton').forEach(item => {
    item.addEventListener('click', closeModal);
});

document.querySelector('.doceInfo--qtmenos').addEventListener('click', () => {
    if (modalQt > 1) {
        modalQt--;
        document.querySelector('.doceInfo--qt').innerHTML = modalQt;
    }
});

document.querySelector('.doceInfo--qtmais').addEventListener('click', () => {
    modalQt++;
    document.querySelector('.doceInfo--qt').innerHTML = modalQt;
});

// Selecionar tamanho
document.querySelectorAll('.doceInfo--size').forEach((size) => {
    size.addEventListener('click', () => {
        document.querySelector('.doceInfo--size.selected').classList.remove('selected');
        size.classList.add('selected');
        updateModalPrice();
    });
});

// Adicionar ao carrinho
document.querySelector('.doceInfo--addButton').addEventListener('click', () => {
    const selectedSize = document.querySelector('.doceInfo--size.selected').getAttribute('data-size');
    const doce = doceJson[modalKey];
    const identifier = `${doce.id}-${selectedSize}`;

    const key = cart.findIndex(item => item.identifier === identifier);
    if (key > -1) {
        cart[key].qt += modalQt;
    } else {
        cart.push({
            identifier,
            id: doce.id,
            size: selectedSize,
            qt: modalQt,
            name: doce.name,
            img: doce.img,
            price: doce.price[selectedSize]
        });
    }

    updateCart();
    closeModal();
});

// Atualizar carrinho
function updateCart() {
    if (cart.length > 0) {
        document.querySelector('aside').classList.add('show');
        document.querySelector('.cart').innerHTML = '';

        let subtotal = 0;

        for (let i in cart) {
            let doceItem = doceJson.find(item => item.id == cart[i].id);

            let cartItem = document.querySelector('.models .cart--item').cloneNode(true);
            cartItem.querySelector('img').src = doceItem.img;
            cartItem.querySelector('.cart--item-nome').innerHTML = `${doceItem.name} (${doceItem.sizes[Object.keys(doceItem.price).indexOf(cart[i].size)]})`;
            cartItem.querySelector('.cart--item--qt').innerHTML = cart[i].qt;

            cartItem.querySelector('.cart--item-qtmenos').addEventListener('click', () => {
                if (cart[i].qt > 1) {
                    cart[i].qt--;
                } else {
                    cart.splice(i, 1);
                }
                updateCart();
            });

            cartItem.querySelector('.cart--item-qtmais').addEventListener('click', () => {
                cart[i].qt++;
                updateCart();
            });

            document.querySelector('.cart').append(cartItem);

            subtotal += cart[i].price * cart[i].qt;
        }

        let total = subtotal - desconto;

        document.querySelector('.subtotal span:last-child').innerHTML = `R$ ${subtotal.toFixed(2)}`;
        document.querySelector('.desconto span:last-child').innerHTML = `R$ ${desconto.toFixed(2)}`;
        document.querySelector('.total span:last-child').innerHTML = `R$ ${total.toFixed(2)}`;
        document.querySelector('.menu-openner span').innerHTML = cart.length;
    } else {
        document.querySelector('aside').classList.remove('show');
        documentSelector('.menu-openner span').innerHTML = '0';
    }
}

// Abrir/fechar carrinho
document.querySelector('.menu-openner').addEventListener('click', () => {
    if (cart.length > 0) {
        document.querySelector('aside').classList.add('show');
    }
});

document.querySelector('.menu-closer').addEventListener('click', () => {
    document.querySelector('aside').classList.remove('show');
});

// Finalizar compra
document.querySelector('.cart--finalizar').addEventListener('click', () => {
    if (cart.length > 0) {
        alert('Pedido finalizado com sucesso! Obrigado pela preferência.');
        cart = [];
        updateCart();
    }
});

// Filtro por categoria
document.querySelectorAll('.category-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.category-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const categoria = btn.dataset.category;
        document.querySelectorAll('.doce-item').forEach((item, index) => {
            if (categoria === 'todos' || doceJson[index].category === categoria) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    });
});
