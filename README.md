# Além da Grade — Diário de Campo por Laryliissa

Plataforma editorial e diário de campo sobre cultura de fã, neurodivergência e vida adulta, com leitor de crônicas, sistema de publicação local sem código, mural de toploaders e sons de foco.

---

## 🚀 Como publicar no GitHub Pages (Passo a Passo Simples)

O projeto já está 100% configurado para o GitHub Pages com deploy automático via **GitHub Actions**!

### Passo 1: Subir o projeto para o seu repositório no GitHub
Se você usa o aplicativo **GitHub Desktop**, VS Code ou Git pelo terminal:
1. Crie um repositório no seu GitHub (exemplo: `alem-da-grade`).
2. Envie os arquivos deste projeto para a branch principal (`main` ou `master`).

### Passo 2: Ativar o GitHub Pages com 2 cliques
1. Abra o seu repositório no site do GitHub.
2. Clique na aba **Settings** (Configurações) no topo.
3. No menu lateral esquerdo, clique em **Pages**.
4. Em **Build and deployment** > **Source**, mude a opção para:
   👉 **GitHub Actions**
5. Pronto! O GitHub iniciará a compilação automaticamente.

Após cerca de 1 a 2 minutos, o link do seu site estará disponível no topo dessa mesma página (ex: `https://seu-usuario.github.io/alem-da-grade/`).

---

## 🛠️ Comandos Locais (Opcional para desenvolvedores)

- **Testar no computador**: `npm run dev` (abre em `http://localhost:3000`)
- **Gerar arquivos de produção**: `npm run build` (gera a pasta pronta `dist/`)
- **Verificar erros de código**: `npm run lint`

---

## ✨ Recursos Inclusos
- **Publicação sem código**: Botão `+ Novo Escrito` com upload direto de fotos do computador/celular.
- **Leitor Fiel com Washi Tape**: Layout idêntico ao modelo de zine/diário de campo.
- **Toploaders Virtuais**: Mural para decorar photocards com stickers.
- **Notas Sonoras**: Som de chuva, vinil e café acolhedor sintetizados via Web Audio API.
- **Backup dos Textos**: Botão na barra lateral para salvar e baixar uma cópia de todos os seus relatos em JSON.
