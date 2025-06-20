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
    doceItem.querySelector('.doce-item--price').innerHTML = `R$ ${item.price.toFixed(2)}`;
    doceItem.querySelector('.doce-item--name').innerHTML = item.name;
    doceItem.querySelector('.doce-item--desc').innerHTML = item.description;

    // Adicionar evento de clique para abrir o modal
    doceItem.querySelector('a').addEventListener('click', (e) => {
        e.preventDefault();
        openModal(index);
    });
});

// Função para abrir o modal
function openModal(index) {
    modalQt = 1;
    modalKey = index;
    
    let doce = doceJson[index];
    
    // Preencher informações no modal
    document.querySelector('.doceBig img').src = doce.img;
    document.querySelector('.doceInfo h1').innerHTML = doce.name;
    document.querySelector('.doceInfo--desc').innerHTML = doce.description;
    document.querySelector('.doceInfo--actualPrice').innerHTML = `R$ ${doce.price.toFixed(2)}`;
    
    // Preencher tamanhos disponíveis
    document.querySelectorAll('.doceInfo--size').forEach((size, sizeIndex) => {
        size.querySelector('span').innerHTML = doce.sizes[sizeIndex];
        if(sizeIndex === 2) {
            size.classList.add('selected');
        } else {
            size.classList.remove('selected');
        }
    });
    
    document.querySelector('.doceInfo--qt').innerHTML = modalQt;
    document.querySelector('.doceWindowArea').style.display = 'flex';
    setTimeout(() => {
        document.querySelector('.doceWindowArea').style.opacity = 1;
    }, 10);
}

// Fechar modal
function closeModal() {
    document.querySelector('.doceWindowArea').style.opacity = 0;
    setTimeout(() => {
        document.querySelector('.doceWindowArea').style.display = 'none';
    }, 500);
}

// Event listeners para o modal
document.querySelectorAll('.doceInfo--cancelButton, .doceInfo--cancelMobileButton').forEach(item => {
    item.addEventListener('click', closeModal);
});

// Botões de quantidade no modal
document.querySelector('.doceInfo--qtmenos').addEventListener('click', () => {
    if(modalQt > 1) {
        modalQt--;
        document.querySelector('.doceInfo--qt').innerHTML = modalQt;
    }
});

document.querySelector('.doceInfo--qtmais').addEventListener('click', () => {
    modalQt++;
    document.querySelector('.doceInfo--qt').innerHTML = modalQt;
});

// Selecionar tamanho
document.querySelectorAll('.doceInfo--size').forEach((size, sizeIndex) => {
    size.addEventListener('click', (e) => {
        document.querySelector('.doceInfo--size.selected').classList.remove('selected');
        size.classList.add('selected');
    });
});

// Adicionar ao carrinho
document.querySelector('.doceInfo--addButton').addEventListener('click', () => {
    let size = document.querySelector('.doceInfo--size.selected').getAttribute('data-key');
    let doce = doceJson[modalKey];
    
    let identifier = doce.id + '-' + size;
    
    let key = cart.findIndex((item) => item.identifier == identifier);
    if(key > -1) {
        cart[key].qt += modalQt;
    } else {
        cart.push({
            identifier,
            id: doce.id,
            size,
            qt: modalQt,
            name: doce.name,
            img: doce.img,
            price: doce.price,
            sizes: doce.sizes
        });
    }
    
    updateCart();
    closeModal();
});

// Atualizar carrinho
function updateCart() {
    if(cart.length > 0) {
        document.querySelector('aside').classList.add('show');
        document.querySelector('.cart').innerHTML = '';
        
        let subtotal = 0;
        let desconto = 0;
        let total = 0;
        
        for(let i in cart) {
            let doceItem = doceJson.find(item => item.id == cart[i].id);
            
            let cartItem = document.querySelector('.models .cart--item').cloneNode(true);
            
            cartItem.querySelector('img').src = doceItem.img;
            cartItem.querySelector('.cart--item-nome').innerHTML = `${doceItem.name} (${doceItem.sizes[cart[i].size]})`;
            cartItem.querySelector('.cart--item--qt').innerHTML = cart[i].qt;
            
            cartItem.querySelector('.cart--item-qtmenos').addEventListener('click', () => {
                if(cart[i].qt > 1) {
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
            
            subtotal += doceItem.price * cart[i].qt;
        }
        
        desconto = subtotal * 0.1; // 10% de desconto
        total = subtotal - desconto;
        
        document.querySelector('.subtotal span:last-child').innerHTML = `R$ ${subtotal.toFixed(2)}`;
        document.querySelector('.desconto span:last-child').innerHTML = `R$ ${desconto.toFixed(2)}`;
        document.querySelector('.total span:last-child').innerHTML = `R$ ${total.toFixed(2)}`;
        document.querySelector('.menu-openner span').innerHTML = cart.length;
        
    } else {
        document.querySelector('aside').classList.remove('show');
        document.querySelector('.menu-openner span').innerHTML = '0';
    }
}

// Abrir/fechar carrinho
document.querySelector('.menu-openner').addEventListener('click', () => {
    if(cart.length > 0) {
        document.querySelector('aside').classList.add('show');
    }
});

document.querySelector('.menu-closer').addEventListener('click', () => {
    document.querySelector('aside').classList.remove('show');
});

// Finalizar compra
document.querySelector('.cart--finalizar').addEventListener('click', () => {
    if(cart.length > 0) {
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
            if(categoria === 'todos' || doceJson[index].category === categoria) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    });
});