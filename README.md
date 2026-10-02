# Além da Grade — Diário de Campo por Laryliissa

Plataforma editorial e diário de campo sobre cultura de fã, neurodivergência e vida adulta, com leitor de crônicas, sistema de publicação local sem código, mural de toploaders e sons de foco.

---

## 🚀 Como publicar no GitHub Pages com Sucesso

O projeto está totalmente preparado com caminhos relativos (`base: './'`), fallback `404.html`, `.nojekyll` e workflow do GitHub Actions.

Existem **2 formas simples** de colocar seu site no ar:

---

### Método 1: Pelo GitHub Actions (Recomendado e Automático)

1. Envie todos os arquivos do projeto para a sua branch principal (`main` ou `master`) no GitHub.
2. No seu repositório no site do GitHub, acesse a aba **Settings** (Configurações no topo).
3. No menu lateral esquerdo, clique em **Pages**.
4. Em **Build and deployment** > **Source**, altere de *"Deploy from a branch"* para:
   👉 **GitHub Actions**
5. O GitHub executará automaticamente o workflow `.github/workflows/deploy.yml` e em ~1 minuto o link do seu site estará verde e pronto no topo dessa tela!

> ⚠️ **Por que às vezes dava tela branca ou 404 antes?**
> Por padrão, o GitHub Pages vem configurado para *"Deploy from a branch"*, tentando ler o `index.html` da raiz diretamente sem passar pelo Vite. Ao mudar a opção para **GitHub Actions**, o GitHub compila o React e publica a pasta `dist/` pronta!

---

### Método 2: Pelo Terminal / VS Code com 1 Comando (`npm run deploy`)

Se você preferir publicar diretamente do seu computador sem depender do GitHub Actions:
1. Abra o terminal na pasta do projeto.
2. Digite:
   ```bash
   npm run deploy
   ```
3. Esse comando compilará o projeto e enviará automaticamente a pasta `dist/` para a branch `gh-pages`.
4. Em **Settings > Pages**, basta selecionar a branch **gh-pages** e salvar!

---

## 🛠️ Comandos Locais

- **Rodar localmente**: `npm run dev` (abre em `http://localhost:3000`)
- **Compilar**: `npm run build`
- **Publicar no GitHub Pages**: `npm run deploy`
