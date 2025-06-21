let doceJson = [
    {
        id: 1,
        name: 'Tradicional Chocolate 50% cacau',
        img: 'imagens\brig-trad.png',
        price: 6.00,
        sizes: ['Tamanho festa','Tamanho gourmet'],
        description: 'Brigadeiro gourmet de chocolate 50% cacau.',
        category: 'docinhos'
    },
    {
        id: 2,
        name: 'Beijinho',
        img: 'fotosCasaNova/beijinho.png',
        price: 6.00,
        sizes: ['Tamanho festa','Tamanho gourmet'],
        description: 'Brigadeiro cremoso de coco.',
        category: 'docinhos'
    },
    {
        id: 3,
        name: 'Casadinho',
        img: 'fotosCasaNova/casadinho.png',
        price: 6.00,
        sizes: ['Tamanho festa','Tamanho gourmet'],
        description: 'A combinação perfeita do brigadeiro tradicional com o beijinho.',
        category: 'docinhos'
    },
    {
        id: 4,
        name: 'Nesquik',
        img: 'fotosCasaNova/nesquik.png',
        price: 6.00,
        sizes: ['Tamanho festa','Tamanho gourmet'],
        description: 'Brigadeiro com sabor delicioso de Nesquik (morango).',
        category: 'docinhos'
    },
    {
        id: 5,
        name: 'Napolitano',
        img: 'fotosCasaNova/napolitano.png',
        price: 6.00,
        sizes: ['Tamanho festa','Tamanho gourmet'],
        description: 'Brigadeiro com três sabores clássicos em um só: chocolate, morango e creme.',
        category: 'docinhos'
    },
    {
        id: 6,
        name: 'Ninho',
        img: 'fotosCasaNova/ninho.png',
        price: 6.00,
        sizes: ['Tamanho festa','Tamanho gourmet'],
        description: 'Brigadeiro cremoso de Leite Ninho.',
        category: 'docinhos'
    },
    {
        id: 7,
        name: 'Ferrero',
        img: 'fotosCasaNova/ferrero.png',
        price: 6.00,
        sizes: ['Tamanho festa','Tamanho gourmet'],
        description: 'Brigadeiro com o sabor irresistível do chocolate Ferrero.',
        category: 'docinhos'
    },
    {
        id: 8,
        name: 'Kit festa - 50un Tradicional e 50un Ninho',
        img: 'fotosCasaNova/trad-ninho.png',
        price: 250.00, // Preço de 100 unidades (50+50) conforme o pricing de 100un
        sizes: ['Kit 100 unidades'],
        description: 'Kit festa com 50 unidades de brigadeiro Tradicional e 50 unidades de brigadeiro Ninho.',
        category: 'kits'
    },
    {
        id: 9,
        name: 'Kit festa - 50un Tradicional e 50un Nesquik',
        img: 'fotosCasaNova/trad-nesquik.png',
        price: 250.00, // Preço de 100 unidades (50+50) conforme o pricing de 100un
        sizes: ['Kit 100 unidades'],
        description: 'Kit festa com 50 unidades de brigadeiro Tradicional e 50 unidades de brigadeiro Nesquik.',
        category: 'kits'
    },
    {
        id: 10,
        name: 'Kit festa - 50un Tradicional e 50un Beijinho',
        img: 'fotosCasaNova/trad-beijinho.png',
        price: 250.00, // Preço de 100 unidades (50+50) conforme o pricing de 100un
        sizes: ['Kit 100 unidades'],
        description: 'Kit festa com 50 unidades de brigadeiro Tradicional e 50 unidades de brigadeiro Beijinho.',
        category: 'kits'
    },
    {
        id: 11,
        name: 'Kit festa - 50un Ferrero e 50un Ninho',
        img: 'fotosCasaNova/ferrero-ninho.png',
        price: 250.00, // Preço de 100 unidades (50+50) conforme o pricing de 100un
        sizes: ['Kit 100 unidades'],
        description: 'Kit festa com 50 unidades de brigadeiro Ferrero e 50 unidades de brigadeiro Ninho.',
        category: 'kits'
    },
    // --- Coxinhas de Morango (Sasonais) ---
    {
        id: 12,
        name: 'Coxinha de Morango Tradicional',
        img: 'fotosCasaNova/coxinha-trad.png', // Ajustado para ser uma imagem genérica de coxinha, já que não há uma específica "tradicional" de morango na sua listagem de imagens, mas você menciona "Tradicional Chocolate 50% cacau" que é brigadeiro, e "coxinha-trad.png" que é uma imagem de coxinha. Assumi que esta é a imagem da coxinha de morango "tradicional".
        price: 8.00, // Preço da unidade, conforme Pricing Coxinha
        sizes: ['1 unidade', 'Caixinha c/ 2 (2 sabores)', 'Caixinha c/ 4', 'Kit Festa 100un (2 sabores)'],
        description: 'Coxinha de morango gourmet. Confira a disponibilidade!',
        category: 'coxinhas' // Nova categoria
    },
    {
        id: 13,
        name: 'Coxinha de Morango Ninho',
        img: 'fotosCasaNova/coxinha-ninho.png', // Assumindo que esta é a imagem para coxinha de morango com ninho
        price: 8.00, // Preço da unidade, conforme Pricing Coxinha
        sizes: ['1 unidade', 'Caixinha c/ 2 (2 sabores)', 'Caixinha c/ 4', 'Kit Festa 100un (2 sabores)'],
        description: 'Coxinha de morango com recheio de Leite Ninho. Confira a disponibilidade!',
        category: 'coxinhas'
    },
    {
        id: 14,
        name: 'Kit festa - Coxinha 50un Tradicional + 50un Ninho',
        img: 'fotosCasaNova/coxinha-trad-ninho.png',
        price: 280.00, // Preço do kit festa 100un, conforme Pricing Coxinha
        sizes: ['Kit 100 unidades'],
        description: 'Kit festa com 50 unidades de coxinha de morango Tradicional e 50 unidades de coxinha de morango Ninho. Confira a disponibilidade!',
        category: 'kits'
    },
    // --- Tortas no Pote ---
    {
        id: 15,
        name: 'Torta no Pote Oreo (120g)',
        img: 'fotosCasaNova/torta-oreo.png',
        price: 16.00, // Preço presumido para torta no pote, ajustar se tiver valor exato
        sizes: ['120g'],
        description: 'Deliciosa torta no pote sabor Oreo.',
        category: 'tortas' // Categoria de tortas, mesmo que no pote
    },
    {
        id: 16.00,
        name: 'Torta no Pote Prestígio (120g)',
        img: 'fotosCasaNova/torta-prestigio.png',
        price: 16.00, // Preço presumido
        sizes: ['120g'],
        description: 'Torta no pote com o clássico sabor Prestígio: chocolate e coco.',
        category: 'tortas'
    },
    {
        id: 17,
        name: 'Torta no Pote Limão (120g)',
        img: 'fotosCasaNova/torta-limão.png',
        price: 16.00, // Preço presumido
        sizes: ['120g'],
        description: 'Torta no pote refrescante de limão com o toque de merengue.',
        category: 'tortas'
    },
    {
        id: 18,
        name: 'Torta no Pote Morango (120g)',
        img: 'fotosCasaNova/torta-morango.png',
        price: 16.00, // Preço presumido
        sizes: ['120g'],
        description: 'Torta no pote com camadas de morango fresco e creme.',
        category: 'tortas'
    },
    {
        id: 19,
        name: 'Torta no Pote Maracujá (120g)',
        img: 'fotosCasaNova/torta-maracuja.png',
        price: 16.00, // Preço presumido
        sizes: ['120g'],
        description: 'Torta no pote tropical de maracujá.',
        category: 'tortas'
    },
    // --- Kits de Tortas no Pote ---
    {
        id: 20,
        name: 'Kit festa - 50un Chocolate + 50un Maracujá (Tortas no Pote 120g)',
        img: 'fotosCasaNova/torta-choc-marac.png',
        price: 250.00,
        sizes: ['Kit 100 unidades (50+50)'],
        description: 'Kit festa com 50 unidades de Torta no Pote de Chocolate e 50 unidades de Torta no Pote de Maracujá.',
        category: 'kits'
    },
    {
        id: 21,
        name: 'Kit festa - 50un Chocolate + 50un Morango (Tortas no Pote 120g)',
        img: 'fotosCasaNova/torta-choc-morang.png',
        price: 250.00,
        sizes: ['Kit 100 unidades (50+50)'],
        description: 'Kit festa com 50 unidades de Torta no Pote de Chocolate e 50 unidades de Torta no Pote de Morango.',
        category: 'kits'
    },
    {
        id: 22,
        name: 'Kit festa - 50un Limão + 50un Maracujá (Tortas no Pote 120g)',
        img: 'fotosCasaNova/torta-lim-marac.png',
        price: 250.00,
        sizes: ['Kit 100 unidades (50+50)'],
        description: 'Kit festa com 50 unidades de Torta no Pote de Limão e 50 unidades de Torta no Pote de Maracujá.',
        category: 'kits'
    },
    {
    id: 23,
    name: 'Kit Festa - 100 Brigadeiros + 20 Tortas no Pote',
    img: 'fotosCasaNova/kit-festa-brigadeiro-torta.png', // Sugestão: usar imagem específica do kit
    price: 300.00,
    sizes: ['Kit Completo'],
    description: 'Kit completo para festas contendo: 100 unidades de brigadeiros de chocolate 50% cacau e 20 unidades de tortas no pote de maracujá (120g cada). Perfeito para eventos e comemorações.',
    category: 'kits',
    details: {
            brigadeiro: {
                quantity: 100,
                type: 'Chocolate 50% cacau',
                unitWeight: '15g'
            },
            torta: {
                quantity: 20,
                flavor: 'Maracujá',
                potSize: '120g'
            }
        }
    }
];