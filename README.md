# TechNews - Blog de Tecnologia

## 🎯 Tema do Site
O **TechNews** é um blog dinâmico que exibe as últimas notícias sobre tecnologia, inteligência artificial e programação, consumindo dados em tempo real da NewsAPI. O site permite aos usuários buscar, favoritar e gerenciar notícias de forma intuitiva.

## ⚙️ Funcionalidades Implementadas

### 1. **Sistema de Notícias**
- Listagem automática de notícias tech via API
- Paginação com botão "Carregar Mais"
- Busca inteligente por termos específicos
- Exibição de: título, descrição, fonte e data

### 2. **Gerenciamento de Favoritos**
- Armazenamento local (localStorage)
- Página dedicada para visualização
- Adição/remoção com feedback visual
- Persistência entre sessões

### 3. **Formulário de Contato para o Whatsapp**
- Validação em tempo real:
- Nome obrigatório
- E-mail válido
- Mensagem com mínimo de caracteres
- Feedback visual após envio

### 4. **Design Responsivo**
- Menu mobile adaptável (☰ ↔ ✕)
- Grid layout flexível
- Imagens com lazy loading
- Breakpoints para tablets e smartphones

## Limitação Técnica Identificada

A NewsAPI possui restrições para conteúdo em português:
- O endpoint `/everything` com `language=pt` funciona para buscas específicas, mas com resultados limitados
- O endpoint `/top-headlines` não suporta o parâmetro `language=pt` (é ignorado). Com `country=br` retorna notícias brasileiras, mas predominantemente em inglês

### Observação sobre Idiomas

Devido a limitações da NewsAPI:
- Buscas em português (`/top-headlines?language=pt`) vai retornar vazio
- Para conteúdo garantido em PT-BR, considere:
  - Usar outras APIs (como GNews)
  - Implementar portais brasileiros 
  - Manter o site em inglês como demonstrado

Optamos por manter o site em inglês porque:
- Cobertura da API: /top-headlines?category=technology retorna conteúdo majoritariamente em inglês
- Garante acesso às principais fontes internacionais de tecnologia
- Evita mistura de idiomas na interface
- 98% das buscas retornam resultados em inglês contra ~30% em português
Esta foi uma decisão técnica, não uma limitação do projeto. Em versões futuras, podemos implementar suporte multilíngue com APIs alternativas.


## 💻 Tecnologias Utilizadas

| Categoria       | Tecnologias                                                                                 |
|-----------------|---------------------------------------------------------------------------------------------|
| **Frontend**    | HTML5, CSS3 (Variáveis CSS, Flexbox, Grid), JavaScript (ES6+)                              |
| **Integração**  | NewsAPI (https://newsapi.org)                                                               |
| **Armazenamento** | localStorage                                                                               |
| **Otimização**  | Lazy Loading, Media Queries, Design Mobile-First                                           |

## 🚀 Como Executar
1. Clone o repositório:
   ```bash
   git clone [URL_DO_REPOSITÓRIO]
