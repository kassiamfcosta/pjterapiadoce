// Configuração da API
const API_BASE_URL = 'http://localhost:8000/api';

// Variáveis globais
let doceData = [];
let cart = [];
let modalQt = 1;
let modalKey = 0;

// Classe principal da aplicação
const DoceApp = {
    // Inicialização da aplicação
    init: async () => {
        console.log('Iniciando Terapia Doce App...');
        await DoceApp.loadDoces();
        DoceApp.initializeElements();
        DoceApp.renderDoces();
    },

    // Carregar doces da API Django
    loadDoces: async () => {
        try {
            console.log('Carregando doces da API...');
            const response = await fetch(`${API_BASE_URL}/doces/disponiveis/`);
            
            if (!response.ok) {
                throw new Error(`Erro na API: ${response.status}`);
            }
            
            const apiDoces = await response.json();
            console.log('Doces carregados:', apiDoces);
            
            // Converter dados da API para o formato do frontend
            doceData = apiDoces.map(doce => ({
                id: doce.id,
                name: doce.nome,
                img: doce.imagem || 'imagens/default-doce.png', // Imagem padrão se não houver
                price: [parseFloat(doce.preco)], // Simplificado para um preço
                sizes: ['Unidade'], // Simplificado
                description: doce.descricao,
                category: DoceApp.getCategoryDisplay(doce.categoria),
                originalData: doce // Manter dados originais
            }));
            
        } catch (error) {
            console.error('Erro ao carregar doces:', error);
            DoceApp.showError('Erro ao carregar produtos. Verifique se a API está rodando.');
            // Fallback para dados estáticos se a API não estiver disponível
            DoceApp.loadFallbackData();
        }
    },

    // Converter categoria da API para display
    getCategoryDisplay: (categoria) => {
        const categoryMap = {
            'brigadeiro': 'brigadeiros',
            'torta_pote': 'tortas',
            'coxinha_morango': 'especiais',
            'outros': 'outros'
        };
        return categoryMap[categoria] || 'outros';
    },

    // Dados de fallback caso a API não esteja disponível
    loadFallbackData: () => {
        console.log('Carregando dados de fallback...');
        doceData = [
            {
                id: 1,
                name: 'Brigadeiro Tradicional',
                img: 'imagens/brig-trad.png',
                price: [6.00],
                sizes: ['Unidade'],
                description: 'Brigadeiro gourmet tradicional.',
                category: 'brigadeiros'
            },
            {
                id: 2,
                name: 'Beijinho',
                img: 'imagens/beijinho.png',
                price: [6.00],
                sizes: ['Unidade'],
                description: 'Brigadeiro cremoso de coco.',
                category: 'brigadeiros'
            }
        ];
    },

    // Mostrar erro para o usuário
    showError: (message) => {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #ff4444;
            color: white;
            padding: 15px;
            border-radius: 5px;
            z-index: 9999;
        `;
        errorDiv.textContent = message;
        document.body.appendChild(errorDiv);
        
        setTimeout(() => {
            document.body.removeChild(errorDiv);
        }, 5000);
    },

    // Inicializar elementos da interface
    initializeElements: () => {
        // Sua lógica original de inicialização aqui
        DoceApp.setupEventListeners();
    },

    // Configurar event listeners
    setupEventListeners: () => {
        // Event listeners para navegação entre categorias
        document.querySelectorAll('.menu-item').forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                const category = item.getAttribute('data-category');
                DoceApp.filterByCategory(category);
            });
        });
    },

    // Renderizar doces na tela
    renderDoces: (filteredDoces = null) => {
        const docesToRender = filteredDoces || doceData;
        const doceArea = document.querySelector('.doce-area');
        
        if (!doceArea) {
            console.error('Área de doces não encontrada!');
            return;
        }

        doceArea.innerHTML = '';

        docesToRender.forEach((doce, index) => {
            const doceItem = DoceApp.createDoceElement(doce, index);
            doceArea.appendChild(doceItem);
        });

        console.log(`${docesToRender.length} doces renderizados`);
    },

    // Criar elemento HTML para um doce
    createDoceElement: (doce, index) => {
        const doceDiv = document.createElement('div');
        doceDiv.className = 'doce-item';
        doceDiv.setAttribute('data-key', index);
        
        doceDiv.innerHTML = `
            <a href="#" onclick="DoceApp.openModal(${index}); return false;">
                <div class="doce-item--img">
                    <img src="${doce.img}" onerror="this.src='imagens/default-doce.png'" alt="${doce.name}" />
                </div>
                <div class="doce-item--add">+</div>
            </a>
            <div class="doce-item--price">R$ ${doce.price[0].toFixed(2)}</div>
            <div class="doce-item--name">${doce.name}</div>
            <div class="doce-item--desc">${doce.description}</div>
        `;
        
        return doceDiv;
    },

    // Filtrar doces por categoria
    filterByCategory: (category) => {
        if (category === 'all') {
            DoceApp.renderDoces();
        } else {
            const filtered = doceData.filter(doce => doce.category === category);
            DoceApp.renderDoces(filtered);
        }
    },

    // Abrir modal do doce
    openModal: (key) => {
        modalQt = 1;
        modalKey = key;
        
        const doce = doceData[key];
        document.querySelector('.doceBig img').src = doce.img;
        document.querySelector('.doceInfo h1').textContent = doce.name;
        document.querySelector('.doceInfo--desc').textContent = doce.description;
        document.querySelector('.doceInfo--actualPrice').textContent = `R$ ${doce.price[0].toFixed(2)}`;
        document.querySelector('.doceInfo--qt').textContent = modalQt;

        document.querySelector('.doceWindowArea').style.opacity = 0;
        document.querySelector('.doceWindowArea').style.display = 'flex';
        
        setTimeout(() => {
            document.querySelector('.doceWindowArea').style.opacity = 1;
        }, 200);
    },

    // Adicionar ao carrinho
    addToCart: () => {
        const doce = doceData[modalKey];
        
        const cartItem = {
            id: doce.id,
            name: doce.name,
            img: doce.img,
            price: doce.price[0],
            qt: modalQt,
            size: doce.sizes[0]
        };

        const existingItem = cart.find(item => item.id === cartItem.id);
        
        if (existingItem) {
            existingItem.qt += modalQt;
        } else {
            cart.push(cartItem);
        }

        DoceApp.updateCart();
        DoceApp.closeModal();
    },

    // Atualizar carrinho
    updateCart: () => {
        const cartDiv = document.querySelector('.cart');
        if (!cartDiv) return;

        if (cart.length > 0) {
            cartDiv.classList.add('show');
            
            let cartHtml = '';
            let total = 0;
            
            cart.forEach((item, index) => {
                const itemTotal = item.price * item.qt;
                total += itemTotal;
                
                cartHtml += `
                    <div class="cart--item" data-key="${index}">
                        <img src="${item.img}" />
                        <div class="cart--item-nome">${item.name}</div>
                        <div class="cart--item--qtarea">
                            <button class="cart--item-qtmenos" onclick="DoceApp.changeCartQt(${index}, -1)">-</button>
                            <div class="cart--item--qt">${item.qt}</div>
                            <button class="cart--item-qtmais" onclick="DoceApp.changeCartQt(${index}, 1)">+</button>
                        </div>
                        <div class="cart--item-price">R$ ${itemTotal.toFixed(2)}</div>
                    </div>
                `;
            });
            
            document.querySelector('.cart--item-area').innerHTML = cartHtml;
            document.querySelector('.cart--totalitem span:last-child').textContent = `${cart.length} ${cart.length === 1 ? 'item' : 'itens'}`;
            document.querySelector('.cart--totalvalue span:last-child').textContent = `R$ ${total.toFixed(2)}`;
        } else {
            cartDiv.classList.remove('show');
        }
    },

    // Alterar quantidade no carrinho
    changeCartQt: (key, change) => {
        if (cart[key]) {
            cart[key].qt += change;
            if (cart[key].qt <= 0) {
                cart.splice(key, 1);
            }
            DoceApp.updateCart();
        }
    },

    // Fechar modal
    closeModal: () => {
        document.querySelector('.doceWindowArea').style.opacity = 0;
        setTimeout(() => {
            document.querySelector('.doceWindowArea').style.display = 'none';
        }, 200);
    },

    // Finalizar pedido
    finishOrder: async () => {
        if (cart.length === 0) {
            alert('Carrinho vazio!');
            return;
        }

        // Aqui você pode implementar integração com WhatsApp ou sistema de pedidos
        const orderText = DoceApp.generateOrderText();
        
        // Exemplo: enviar para WhatsApp
        const phone = '5511999999999'; // Substitua pelo seu número
        const whatsappUrl = `https://wa.me/${phone}?text=${encodeURIComponent(orderText)}`;
        window.open(whatsappUrl, '_blank');
    },

    // Gerar texto do pedido
    generateOrderText: () => {
        let text = '*Pedido Terapia Doce*\n\n';
        let total = 0;
        
        cart.forEach(item => {
            const itemTotal = item.price * item.qt;
            total += itemTotal;
            text += `• ${item.name}\n`;
            text += `  Quantidade: ${item.qt}\n`;
            text += `  Preço: R$ ${itemTotal.toFixed(2)}\n\n`;
        });
        
        text += `*Total: R$ ${total.toFixed(2)}*`;
        return text;
    }
};

// Funções globais para manter compatibilidade
function openModal(key) {
    DoceApp.openModal(key);
}

function addToCart() {
    DoceApp.addToCart();
}

function closeModal() {
    DoceApp.closeModal();
}

function changeCartQt(key, change) {
    DoceApp.changeCartQt(key, change);
}

function finishOrder() {
    DoceApp.finishOrder();
}

// Inicializar quando a página carregar
document.addEventListener('DOMContentLoaded', () => {
    DoceApp.init();
});

// Exportar para uso global
window.DoceApp = DoceApp;