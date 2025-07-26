// Variáveis globais
let cart = [];
let modalQt = 1;
let modalKey = 0;

// Extrair categorias únicas dos produtos
const categorias = [...new Set(doceJson.map(doce => doce.category).filter(cat => cat))];

// Criar botões de filtro dinamicamente
function criarBotoesFiltro() {
    const containerFiltros = document.querySelector('.categories');
    containerFiltros.innerHTML = ''; // Limpa botões existentes
    
    // Adiciona botão "Todos"
    const botaoTodos = document.createElement("button");
    botaoTodos.className = "category-btn active";
    botaoTodos.textContent = "Todos";
    botaoTodos.setAttribute('data-category', 'todos');
    botaoTodos.addEventListener("click", () => {
        filtrarPorCategoria('todos');
        atualizarBotaoAtivo(botaoTodos);
    });
    containerFiltros.appendChild(botaoTodos);
    
    // Adiciona botão para cada categoria
    categorias.forEach(categoria => {
        const botao = document.createElement("button");
        botao.className = "category-btn";
        botao.textContent = formatarNomeCategoria(categoria);
        botao.setAttribute('data-category', categoria);
        botao.addEventListener("click", () => {
            filtrarPorCategoria(categoria);
            atualizarBotaoAtivo(botao);
        });
        containerFiltros.appendChild(botao);
    });
}

// Formatar nome da categoria para exibição
function formatarNomeCategoria(categoria) {
    const nomes = {
        'brigadeiros': 'Brigadeiros',
        'coxinhas': 'Coxinhas de Morango',
        'tortas': 'Tortas no Pote',
        'kits': 'Kits Festa'
    };
    return nomes[categoria] || categoria;
}

// Filtrar produtos por categoria
function filtrarPorCategoria(categoria) {
    const itensDoces = document.querySelectorAll('.doce-area .doce-item:not(.models .doce-item)');
    
    itensDoces.forEach((item, index) => {
        // Pula o primeiro item que é o modelo
        const doceIndex = index;
        const doce = doceJson[doceIndex];
        
        if (categoria === 'todos' || (doce && doce.category === categoria)) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });
}

// Atualizar botão ativo
function atualizarBotaoAtivo(botaoSelecionado) {
    document.querySelectorAll('.category-btn').forEach(btn => btn.classList.remove('active'));
    botaoSelecionado.classList.add('active');
}

// Carregar os doces na página
function carregarDoces() {
    doceJson.map((item, index) => {
        let doceItem = document.querySelector('.models .doce-item').cloneNode(true);
        document.querySelector('.doce-area').append(doceItem);
        
        // Preencher os dados de cada doce
        doceItem.querySelector('.doce-item--img img').src = item.img;
        
        // Tratar preços - padronizar para usar 'prices' sempre
        let preco = item.prices ? item.prices[0] : (item.price ? (Array.isArray(item.price) ? item.price[0] : item.price) : 0);
        
        if (!isNaN(preco) && preco > 0) {
            doceItem.querySelector('.doce-item--price').innerHTML = `R$ ${preco.toFixed(2)}`;
        } else {
            doceItem.querySelector('.doce-item--price').innerHTML = 'Consulte preço';
        }

        doceItem.querySelector('.doce-item--name').innerHTML = item.name;
        doceItem.querySelector('.doce-item--desc').innerHTML = item.description;

        // Evento para abrir o modal
        doceItem.querySelector('a').addEventListener('click', (e) => {
            e.preventDefault();
            openModal(index);
        });
    });
}

// Inicializar página
function inicializar() {
    carregarDoces();
    criarBotoesFiltro();
}

// Botão voltar ao topo
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
    sizesContainer.innerHTML = '';

    // Verificar se tem tamanhos disponíveis
    if (doce.sizes && doce.sizes.length > 0) {
        doce.sizes.forEach((label, idx) => {
            const sizeBtn = document.createElement('div');
            sizeBtn.classList.add('doceInfo--size');
            if (idx === 0) sizeBtn.classList.add('selected');
            sizeBtn.setAttribute('data-size', idx);

            const span = document.createElement('span');
            span.innerText = label;
            sizeBtn.appendChild(span);
            sizesContainer.appendChild(sizeBtn);

            sizeBtn.addEventListener('click', () => {
                document.querySelectorAll('.doceInfo--size').forEach(s => s.classList.remove('selected'));
                sizeBtn.classList.add('selected');
                updateModalPrice();
            });
        });
    }

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
    const doce = doceJson[modalKey];
    
    if (!selectedBtn) {
        // Se não há tamanho selecionado, usar primeiro preço disponível
        let preco = doce.prices ? doce.prices[0] : (doce.price ? (Array.isArray(doce.price) ? doce.price[0] : doce.price) : 0);
        if (!isNaN(preco) && preco > 0) {
            document.querySelector('.doceInfo--actualPrice').innerHTML = `R$ ${preco.toFixed(2)}`;
        } else {
            document.querySelector('.doceInfo--actualPrice').innerHTML = 'Consulte preço';
        }
        return;
    }

    const selectedSizeIdx = parseInt(selectedBtn.getAttribute('data-size'));
    let price = 0;
    
    // Padronizar acesso aos preços
    if (doce.prices && doce.prices[selectedSizeIdx] !== undefined) {
        price = doce.prices[selectedSizeIdx];
    } else if (doce.price) {
        if (Array.isArray(doce.price)) {
            price = doce.price[selectedSizeIdx] || doce.price[0];
        } else {
            price = doce.price;
        }
    }

    if (!isNaN(price) && price > 0) {
        document.querySelector('.doceInfo--actualPrice').innerHTML = `R$ ${price.toFixed(2)}`;
    } else {
        document.querySelector('.doceInfo--actualPrice').innerHTML = 'Consulte preço';
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

// Adicionar ao carrinho
document.querySelector('.doceInfo--addButton').addEventListener('click', () => {
    const selectedSizeBtn = document.querySelector('.doceInfo--size.selected');
    const selectedSize = selectedSizeBtn ? selectedSizeBtn.getAttribute('data-size') : 0;
    const doce = doceJson[modalKey];
    const identifier = `${doce.id}-${selectedSize}`;

    // Calcular preço do item
    let itemPrice = 0;
    if (doce.prices && doce.prices[selectedSize] !== undefined) {
        itemPrice = doce.prices[selectedSize];
    } else if (doce.price) {
        itemPrice = Array.isArray(doce.price) ? doce.price[selectedSize] || doce.price[0] : doce.price;
    }

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
            sizeName: doce.sizes ? doce.sizes[selectedSize] : 'Padrão',
            price: itemPrice
        });
    }

    updateCart();
    closeModal();
});

// Atualizar carrinho
function updateCart() {
    document.querySelector('.menu-openner span').innerHTML = cart.length;
    
    if (cart.length > 0) {
        document.querySelector('aside').classList.add('show');
        document.querySelector('.cart').innerHTML = '';

        let subtotal = 0;

        cart.forEach((item, index) => {
            let doceItem = doceJson.find(doce => doce.id == item.id);
            
            let cartItem = document.querySelector('.models .cart--item').cloneNode(true);
            cartItem.querySelector('img').src = doceItem.img;
            cartItem.querySelector('.cart--item-nome').innerHTML = `${item.name} (${item.sizeName})`;
            cartItem.querySelector('.cart--item--qt').innerHTML = item.qt;

            cartItem.querySelector('.cart--item-qtmenos').addEventListener('click', () => {
                if (cart[index].qt > 1) {
                    cart[index].qt--;
                } else {
                    cart.splice(index, 1);
                }
                updateCart();
            });

            cartItem.querySelector('.cart--item-qtmais').addEventListener('click', () => {
                cart[index].qt++;
                updateCart();
            });

            document.querySelector('.cart').append(cartItem);
            subtotal += item.price * item.qt;
        });

        // Atualizar totais
        document.querySelector('.subtotal span:last-child').innerHTML = `R$ ${subtotal.toFixed(2)}`;
        document.querySelector('.total span:last-child').innerHTML = `R$ ${subtotal.toFixed(2)}`;
        
    } else {
        document.querySelector('aside').classList.remove('show');
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

// Inicializar quando a página carregar
document.addEventListener('DOMContentLoaded', inicializar);