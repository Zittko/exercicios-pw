## 📂 **Estrutura de pastas**
```
/meu-site
│── 📄 index.html       # Página principal
│── 📄 about.html       # Exemplo de página extra
│── 📂 assets/          # Recursos como imagens, fontes, ícones
│   │── 📂 images/      # Imagens do site
│   │── 📂 fonts/       # Fontes personalizadas
│   │── 📂 icons/       # Ícones SVG ou PNG
│
│── 📂 css/             # Arquivos de estilos
│   │── 📄 styles.css   # Estilos principais do site
│   │── 📄 variables.css # Variáveis (cores, tipografia, espaçamentos)
│   │── 📄 reset.css    # Reset ou normalize.css
│
│── 📂 js/              # Scripts do site
│   │── 📄 main.js      # Código JS principal
│   │── 📄 utils.js     # Funções reutilizáveis
│
│── 📂 pages/           # Páginas internas
│   │── 📄 contato.html
│   │── 📄 servicos.html
│
│── 📂 components/      # Componentes reutilizáveis (opcional)
│   │── 📄 navbar.html  # Cabeçalho
│   │── 📄 footer.html  # Rodapé
```

---

## 🎨 **Organizando o CSS**
Separar as variáveis e configurações de estilos melhora a **manutenção**.  

### 📌 **1. Arquivo `variables.css`** (para definir variáveis globais)
```css
:root {
    /* 🎨 Cores */
    --primary-color: #3498db;
    --secondary-color: #2ecc71;
    --background-color: #f5f5f5;
    --text-color: #333;

    /* 🔤 Tipografia */
    --font-primary: 'Poppins', sans-serif;
    --font-size-base: 16px;
    --font-size-title: 2rem;

    /* 📏 Espaçamentos */
    --spacing-small: 8px;
    --spacing-medium: 16px;
    --spacing-large: 32px;
}
```

---

### 📌 **2. Arquivo `styles.css`** (importa `variables.css` e aplica os estilos)
```css
@import url('variables.css');

body {
    background-color: var(--background-color);
    color: var(--text-color);
    font-family: var(--font-primary);
    font-size: var(--font-size-base);
    margin: 0;
    padding: 0;
}

h1 {
    font-size: var(--font-size-title);
    color: var(--primary-color);
}

.button {
    background: var(--primary-color);
    padding: var(--spacing-medium);
    border-radius: 5px;
    color: white;
}
```

---

## 🚀 **Vantagens dessa estrutura**
✅ **Organização modular** → Cada tipo de arquivo fica em sua pasta.  
✅ **Facilidade de manutenção** → Pode alterar estilos e variáveis sem mexer no código principal.  
✅ **Código reutilizável** → Componentes como navbar e footer podem ser reutilizados.  
✅ **CSS otimizado** → Variáveis centralizadas permitem ajustes rápidos no tema.  


## 📌 **📏 Diferença entre `px`, `em`, `rem`, `%` e `vh/vw`**
Cada unidade de medida no CSS tem um propósito específico. Escolher a certa impacta **responsividade, acessibilidade e escalabilidade** do site.  

### 🔹 **1. `px` (Pixel)**
📌 **O que é?** Medida fixa, baseada nos pixels da tela.  
📌 **Quando usar?** Quando quiser algo com tamanho exato, sem depender do contexto.  

✅ **Exemplo:**  
```css
h1 {
    font-size: 32px; /* Sempre será 32px, independentemente do elemento pai */
}
```
⚠ **Problema**: Se o usuário aumentar o tamanho da fonte no navegador, **o `px` não escala**.  

---

### 🔹 **2. `em` (Multiplica pelo tamanho do elemento pai)**
📌 **O que é?** Medida relativa ao **tamanho da fonte do elemento pai**.  
📌 **Quando usar?** Para elementos que precisam escalar de acordo com o **contexto**.  

✅ **Exemplo:**  
```css
body {
    font-size: 16px;
}

p {
    font-size: 1.5em; /* 1.5 × 16px = 24px */
}
```
✅ **Vantagem:** Elementos dentro de um `div` maior podem **herdar** tamanhos proporcionais.  

⚠ **Cuidado**: Como `em` multiplica o valor do **pai**, pode causar **efeito cascata** inesperado.  

---

### 🔹 **3. `rem` (Multiplica pelo tamanho da fonte raiz `<html>`)**
📌 **O que é?** Medida relativa ao **tamanho da fonte do `<html>`** (padrão: `16px`).  
📌 **Quando usar?** Para tamanhos de fonte e espaçamentos mais previsíveis e escaláveis.  

✅ **Exemplo:**  
```css
html {
    font-size: 16px;
}

h1 {
    font-size: 2rem; /* 2 × 16px = 32px */
}
```
✅ **Vantagem**: Diferente de `em`, **não é afetado pelo elemento pai**, evitando problemas de escalabilidade.  

---

### 🔹 **4. `%` (Percentual do tamanho do elemento pai)**
📌 **O que é?** Mede em **relação ao tamanho do elemento pai**.  
📌 **Quando usar?** Para **largura, altura e margens** responsivas.  

✅ **Exemplo:**  
```css
div {
    width: 50%; /* Metade do tamanho do pai */
    height: 100%;
}
```
✅ **Vantagem**: Excelente para layouts flexíveis.  
⚠ **Cuidado**: O comportamento pode mudar dependendo do pai.  

---

### 🔹 **5. `vh` e `vw` (Viewport Height e Width)**
📌 **O que é?** Mede em relação à **tela inteira do dispositivo**.  
📌 **Quando usar?** Quando precisar ocupar um **espaço exato na tela**, sem depender do conteúdo.  

✅ **Exemplo:**  
```css
.fullscreen {
    width: 100vw; /* Ocupa toda a largura da tela */
    height: 100vh; /* Ocupa toda a altura da tela */
}
```
✅ **Ótimo para** layouts fullscreen, cabeçalhos fixos e seções responsivas.  

⚠ **Cuidado**: No **mobile**, barras do navegador podem alterar a altura real.  

---

## 🏆 **Resumo: Qual usar?**
| Unidade  | Baseia-se em? | Melhor uso |
|----------|--------------|------------|
| `px`  | Pixels fixos | Tamanhos que não precisam escalar (ex: bordas finas, ícones) |
| `em`  | Fonte do **pai** | Elementos que precisam escalar no contexto (ex: botões, cards) |
| `rem` | Fonte do **html** | Fontes e espaçamentos consistentes |
| `%`   | Tamanho do **pai** | Larguras e alturas flexíveis |
| `vh`/`vw` | Tela (viewport) | Layouts fullscreen, banners, seções fixas |

---

## 🎯 **Conclusão**
Se quiser um **site responsivo e escalável**, use **`rem` para fontes**, **`%` para larguras**, **`vh/vw` para seções fullscreen**, e evite `px` quando possível. 🚀  



