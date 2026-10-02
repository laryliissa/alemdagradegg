# Além da Grade — Diário de Campo & Plataforma Editorial Interativa

Plataforma editorial e diário de campo que une cultura de fã, neurodivergência e vida adulta, com sistema completo de gerenciamento e publicação local de ensaios pensado especialmente para usuárias leigas em programação (sem tocar em código), upload direto de fotos, páginas de leitura imersiva com washi tape, mural de toploaders e ambientação sonora.

---

## Decisões Confirmadas & Revisão do Usuário

> [!IMPORTANT]
> **Nova prioridade essencial adicionada**: Interface de publicação e fotos 100% amigável para quem não lida com códigos.

- **Publicação 100% Visual e Sem Código**:
  - Botão destacado no topo: **"+ Escrever Novo Post"** ou **"Novo Relato"**.
  - Formulário guiado com campos claros:
    - *Título do Post* (ex: "O que você gosta de fazer?").
    - *Território / Categoria* (escolha com 1 clique: *Espaços & Corpos*, *Mesa de Criação*, *Filtros & Limites*, *Aprendizagens*).
    - *Formato* (ex: *Diário de Campo*, *Ensaio*, *Reflexão Curta*).
    - *Upload de Fotos Simples*:
      - Botão **"Carregar Foto do Computador/Celular"** (converte automaticamente a foto do seu dispositivo sem precisar hospedar na internet ou colar links).
      - Opção de escolher entre fotos temáticas prontas (shows, papelaria, diários, festivais).
      - Pré-visualização instantânea na tela com a fita adesiva (*washi tape*) para ver exatamente como vai ficar antes de publicar.
    - *Corpo do Texto Descomplicado*:
      - Campo de texto natural: basta digitar e dar 'Enter' para separar os parágrafos.
      - Botões com 1 clique para enriquecer o texto: **[+ Inserir Frase de Destaque]**, **[+ Inserir Bilhete à Mão]**, **[+ Inserir Lista de Tópicos]**.
    - *Nota de Campo Final*: Campo específico para a pergunta reflexiva de encerramento.
  - Edição e Exclusão Direta: Cada post terá um botão discreto de **"Editar"** ou **"Excluir"** visível na interface para correções imediatas.
  - Backup dos Textos com 1 Clique: Botão para baixar uma cópia de segurança de todos os seus escritos no computador.
- **Estrutura Visual do Post (`.post-container`)**:
  - Cartão editorial com sombra sólida (`8px 8px 0px var(--ink)`), bordas de 2px e estilo scrapbook.
  - Imagem de capa com efeito de fita adesiva (*Washi Tape*) verde ácido.
  - Pull quotes, caligrafia *Caveat*, marcadores ✦ e bloco de encerramento *Nota de Campo*.
- **Recursos Interativos Confirmados**:
  1. *Filtro Ativo por Territórios e Busca Instantânea*.
  2. *Player / Notas Sonoras de Ambientação* (Chuva suave, Vinil Lo-Fi, Café Coreano).
  3. *Mural Interativo de Toploaders & Photocards*.
  4. *Manifesto Completo Deslizante* ("Comece por aqui ✦").

---

## 1. Visão Geral & Conceito

- **O que faz**: Oferece uma plataforma acolhedora e completa para Laryliissa publicar seus relatos de campo e reflexões sem depender de conhecimentos técnicos ou edição manual de arquivos HTML/código. Os leitores desfrutam de uma experiência de leitura editorial de revista zine com música de foco e toploaders.
- **Público-alvo**: A própria autora (gerenciamento simplificado e autônomo) e leitores interessados em cultura pop asiática, neurodivergência na vida adulta e práticas de autocuidado.
- **Proposta de Valor**: Autonomia editorial total com design profissional de alto impacto visual.

---

## 2. Experiência do Usuário & Fluxo de Escrita Sem Código

### Fluxo de Criação de Post pela Autora (Zero Código)
1. A autora clica no botão visível **"+ Novo Escrito"** no topo da tela.
2. Abre-se um painel visual limpo e acolhedor (sem termos técnicos):
   - Digita o Título e o tempo estimado de leitura (ou cálculo automático).
   - Clica no botão **"Carregar Imagem"** e seleciona qualquer foto do seu computador ou celular (formato JPG, PNG, WebP). O app processa a imagem localmente e já a mostra com a moldura de diário.
   - Digita o texto normalmente na caixa de escrita.
   - Se quiser destacar uma frase marcante (pull quote) ou uma fala divertida em caligrafia, clica nos botões dedicados.
   - Clica em **"Publicar no Diário"**.
3. O post aparece imediatamente no feed inicial e já ganha sua página de leitura dedicada completa.

---

## 3. Decisões de Produto & Arquitetura

1. **Upload Local de Imagens via `FileReader` / Data URL**:
   - As imagens selecionadas pelo explorador de arquivos do usuário são lidas instantaneamente como Data URLs (Base64) e salvas no banco de dados local do navegador (`localStorage`), garantindo que fotos pessoais funcionem sem a necessidade de contas de hospedagem de imagens externas.
2. **Editor Visual com Blocos Prontos**:
   - Criação de interface baseada em blocos fáceis de preencher (Parágrafo, Frase Destacada, Anotação à mão, Pergunta de Fechamento), dispensando a necessidade de tags HTML ou Markdown.
3. **Persistência Segura**:
   - Dados salvos automaticamente no navegador, com botão de exportar/importar cópia de segurança em arquivo JSON legível para que nunca haja perda de textos.
4. **Reserva de Dados Originais**:
   - Os 4 posts originais (incluindo o texto integral de *"O Gramado, o Salompas e o Stray Kids"*) já vêm pré-carregados e formatados com perfeição.

---

## 4. Diagrama de Arquitetura do Sistema de Gestão Visual

```
┌────────────────────────────────────────────────────────────────────────┐
│                        Barra de Ações do Autor                         │
│   [+ Novo Escrito]     [✦ Decorar Toploader]     [♫ Modo Silencioso]   │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │ (Clique em Novo Escrito)
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│                      Modal: Estúdio de Escrita Visual                  │
│                                                                        │
│ 1. TÍTULO: [ Digite o título do seu relato...                        ] │
│ 2. TERRITÓRIO: (•) Espaços & Corpos  ( ) Mesa de Criação               │
│                ( ) Filtros & Limites ( ) Aprendizagens                 │
│ 3. FOTO DE CAPA:                                                       │
│    [ 📁 Escolher Foto do Computador ] ou [ Selecionar Foto Temática ]  │
│    ┌────────────────────────────────────────┐                          │
│    │  [Preview com Washi Tape Verde Ácido]  │                          │
│    └────────────────────────────────────────┘                          │
│ 4. TEXTO PRINCIPAL:                                                    │
│    [ Digite seus parágrafos aqui como no Word ou Bloco de Notas...   ] │
│ 5. BOTÕES DE DESTAQUE:                                                 │
│    [+ Frase Grande em Lilás]   [+ Citação em Rosa]  [+ Frase à Mão]    │
│ 6. NOTA DE CAMPO (Pergunta final):                                     │
│    [ Digite a provocação ou reflexão que encerra o texto...          ] │
│                                                                        │
│         [ Cancelar ]                     [ ✦ Publicar no Diário ]      │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│                         Feed e Página do Post                          │
│   - Post salvo instantaneamente no diário                              │
│   - Botões de [Editar] e [Excluir] disponíveis para a autora           │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 5. Próximos Passos de Execução
Após a sua aprovação deste plano revisado:
1. Configurar fontes e estilização em `index.html` e `src/index.css`.
2. Estruturar os dados pré-carregados em `src/data/postsData.ts` com o ensaio completo do Stray Kids e os posts do diário.
3. Criar a camada de gerenciamento local `usePostsStore.ts` com suporte a upload de fotos do dispositivo e salvamento automático.
4. Implementar o painel visual simplificado de escrita `PostEditorModal.tsx` com upload de arquivos e formatação com 1 clique.
5. Construir a página dedicada de leitura `DedicatedPostView.tsx` com o design fiel, washi tape, pull quotes e navegação.
6. Construir o decorador interativo de toploaders `ToploaderBoardModal.tsx`.
7. Construir o player de áudio ambiente `AmbientSoundPlayer.tsx`.
8. Integrar tudo na tela inicial `App.tsx` com busca instantânea e manifesto deslizante.
9. Compilar e validar a aplicação completa.
