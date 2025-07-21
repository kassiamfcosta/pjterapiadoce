# 🚀 Guia de Integração Frontend + Backend

## Como Usar Sua API Django com o Frontend

### 📋 **Passos para Usar:**

#### **1. Iniciar o Backend (API Django)**
```bash
# Navegar para o diretório do projeto
cd locallibrary

# Ativar ambiente virtual
source ../venv/bin/activate

# Iniciar servidor
python manage.py runserver 0.0.0.0:8000
```

#### **2. Abrir o Frontend Integrado**
- Abra o arquivo `Frontend/index-api.html` no navegador
- OU use um servidor local (recomendado):

**Opção A - Python:**
```bash
cd Frontend
python -m http.server 3000
# Acesse: http://localhost:3000/index-api.html
```

**Opção B - Node.js (se tiver):**
```bash
cd Frontend
npx serve -l 3000
# Acesse: http://localhost:3000/index-api.html
```

**Opção C - Live Server (VS Code):**
- Instale extensão "Live Server"
- Clique direito em `index-api.html` > "Open with Live Server"

### 🔗 **URLs Importantes:**

- **Frontend:** `http://localhost:3000/index-api.html`
- **API Backend:** `http://localhost:8000/api/doces/`
- **Admin Django:** `http://localhost:8000/admin/`

### ✨ **O que Mudou no Frontend:**

#### **Antes (dados estáticos):**
```javascript
const doceData = [
    {
        id: 1,
        name: 'Brigadeiro Tradicional',
        price: [6.00],
        // ... dados fixos
    }
];
```

#### **Agora (dados da API):**
```javascript
// Busca dados da API Django
const response = await fetch('http://localhost:8000/api/doces/disponiveis/');
const apiDoces = await response.json();
```

### 🎯 **Funcionalidades da Integração:**

#### ✅ **O que Funciona:**
- **Carregamento automático** dos doces da API
- **Fallback inteligente** - se API estiver offline, usa dados locais
- **Indicador visual** do status da conexão
- **Filtros por categoria** funcionando
- **Carrinho de compras** funcionando
- **Modal de detalhes** funcionando
- **Finalização via WhatsApp** funcionando

#### 🔄 **Fluxo de Dados:**
1. Frontend faz requisição → `GET /api/doces/disponiveis/`
2. Django retorna dados → JSON dos doces
3. Frontend renderiza → Produtos na tela
4. Usuário interage → Adiciona ao carrinho
5. Finaliza pedido → WhatsApp ou sistema de pedidos

### 📱 **Como Testar:**

#### **1. Teste Básico:**
- Abra `index-api.html`
- Verifique se os doces carregaram
- Status deve mostrar "✅ API Online"

#### **2. Teste sem API:**
- Pare o servidor Django (`Ctrl+C`)
- Recarregue a página
- Deve mostrar "⚠️ API Offline" e carregar dados locais

#### **3. Teste de Funcionalidades:**
- Clique em categorias (Brigadeiros, Tortas, etc.)
- Clique em um doce para abrir detalhes
- Adicione ao carrinho
- Finalize pedido

### 🛠 **Gerenciar Dados:**

#### **Adicionar Novos Doces:**
1. Acesse: `http://localhost:8000/admin/`
2. Faça login (crie superusuário se necessário)
3. Vá em "Doces" > "Adicionar doce"
4. Preencha os dados e salve
5. Recarregue o frontend - novos doces aparecerão!

#### **Criar Superusuário (se necessário):**
```bash
cd locallibrary
source ../venv/bin/activate
python manage.py createsuperuser
```

### 🔧 **Personalização:**

#### **Alterar URL da API:**
No arquivo `doce-api.js`, linha 2:
```javascript
const API_BASE_URL = 'http://localhost:8000/api';
// Altere para sua URL de produção quando necessário
```

#### **Alterar WhatsApp:**
No arquivo `doce-api.js`, função `finishOrder()`:
```javascript
const phone = '5511999999999'; // Seu número aqui
```

#### **Adicionar Novas Categorias:**
1. No Django: Edite `models.py` → `CATEGORIA_CHOICES`
2. No Frontend: Edite `doce-api.js` → `getCategoryDisplay()`

### 🎨 **Comparação Visual:**

| Versão Original | Versão com API |
|-----------------|----------------|
| `index.html` | `index-api.html` |
| `doce.js` | `doce-api.js` |
| Dados fixos | Dados dinâmicos |
| Sem backend | Com Django API |

### 🚀 **Próximos Passos:**

#### **Para Produção:**
1. **Deploy do Backend:**
   - Heroku, Railway, Digital Ocean, etc.
   - Configurar variáveis de ambiente
   - Configurar banco de dados PostgreSQL

2. **Deploy do Frontend:**
   - Netlify, Vercel, GitHub Pages
   - Atualizar URL da API para produção

3. **Melhorias Possíveis:**
   - Sistema de autenticação
   - Painel administrativo personalizado
   - Sistema de pedidos completo
   - Integração com pagamento
   - Push notifications
   - Otimização de imagens

### 🆘 **Solução de Problemas:**

#### **Erro CORS:**
- Verifique se `corsheaders` está instalado
- Confirme configuração em `settings.py`

#### **API não carrega:**
- Verifique se servidor Django está rodando
- Teste URL da API diretamente no navegador
- Verifique console do navegador (F12)

#### **Doces não aparecem:**
- Verifique se há doces cadastrados
- Execute `python manage.py populate_doces`
- Verifique filtro de disponibilidade

### 📞 **Para Mais Ajuda:**
- Console do navegador (F12) mostra erros
- Logs do Django no terminal
- API testável em: `http://localhost:8000/api/doces/`

---

## 🎉 **Parabéns!** 
Agora você tem um sistema completo frontend + backend funcionando!