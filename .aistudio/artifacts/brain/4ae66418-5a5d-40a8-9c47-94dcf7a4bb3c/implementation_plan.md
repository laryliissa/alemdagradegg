# Além da Grade — Plano de Implementação: Modo Autora, Estúdio de Toploaders & Trilha Lo-Fi

Plataforma editorial e de experimentação para Laryliissa, integrando Modo Autora protegido por PIN pessoal, Estúdio de Criação de Photocards & Toploaders completo (estilo Polco/Decoden com Binder de 9 bolsos e exportação em imagem), Trilha Sonora Lo-Fi ambiente (Café em Seul e chuva suave) e personalização de fotos em todas as entradas de campo.

---

## Decisões Confirmadas com a Autora

> [!IMPORTANT]
> As escolhas abaixo foram confirmadas através das respostas interativas e governam a arquitetura deste ciclo:
>
> 1. **Modo Autora Seguro com PIN Pessoal**: Visitantes comuns visualizam apenas os ensaios e relatos já publicados, sem botões de edição, exclusão ou de novo post à mostra. Um modal discreto de acesso (via cadeado ou rodapé) desbloqueia o painel de criação e rascunhos pessoais salvos no dispositivo.
> 2. **Estúdio de Criação e Decoração Expandido (Toploaders & Photocards)**:
>    - Efeito de **mangas holográficas (Holo Sleeves)** com reflexos de estrelas, corações e vidro quebrado;
>    - Aplicação de **Decoden (creme decorativo estilo chantilly)** nas bordas;
>    - Adesivos coreanos autênticos de fã (**Polco Deco**: fitas decoradas, laços, estrelas SKZOO e frases em hangul/alfabeto);
>    - **Binder Digital estilo pasta de colecionador (grade 3x3)** para folhear photocards salvos;
>    - **Download em imagem (.png)** do toploader customizado via Canvas nativo.
> 3. **Paisagem Sonora Lo-Fi de Foco**: Sintetizador de ambiente evocando uma **Cafeteria aconchegante em Seul** com chuva suave nas janelas, ruído de fita cassete/vinil e acordes relaxantes em piano Rhodes via Web Audio API (sem dependências externas que falhem).
> 4. **Personalização de Fotos em Todas as Entradas**: Upload e enquadramento de fotos em qualquer post (com washi tape customizável e legenda de campo).

---

## 1. Visão Geral e Conceito Central

- **O que faz**: Transforma o *Além da Grade* em uma casa editorial viva para a pesquisadora insider. Permite que Lary registre suas anotações de campo, analise a cultura Hallyu e a vida adulta com total privacidade de rascunhos, enquanto proporciona aos leitores uma experiência imersiva de zine com áudio ambiente e um playground interativo de toploaders.
- **Público**: Leitores interessados em Fan Studies, cultura de fãs, vida adulta e neurodivergência; e a própria autora (Lary), com ferramentas de escrita sob medida.
- **Valor Principal**: Independência total (hospedagem estática gratuita no GitHub Pages), integridade editorial e estética afetiva sem códigos ou ferramentas externas complexas.

---

## 2. Experiência de Uso e Design Visual

### Fluxos Principais

1. **Visão do Visitante (Pública)**:
   - Acesso limpo ao feed de ensaios com leitura confortável (máx. 68ch, tipografia editorial humanista);
   - Visualização da foto do festival Rock in Rio 2026 e das crônicas;
   - Acesso ao Mural de Toploaders e ao Binder de Photocards para brincar e criar suas próprias decorações;
   - Player Lo-Fi ambiente de cafeteria em Seul no canto inferior;
   - Nenhum botão administrativo exposto.

2. **Desbloqueio do Modo Autora**:
   - Um ícone discreto no rodapé ou atalho abre o diálogo de PIN (senha de 4 a 6 dígitos definida pela autora);
   - Uma vez autenticada, a barra superior exibe o distintivo dourado `Modo Autora Ativo`, revelando:
     - Botão `+ Novo Escrito`;
     - Botões de `Editar` e `Excluir` em cada card e dentro de cada artigo;
     - Aba de `Rascunhos Privados` (visíveis exclusivamente no navegador da autora);
     - Opção de publicar rascunhos para o feed público ou salvar backup JSON.

3. **Estúdio de Decoração de Photocards (Decoden & Polco)**:
   - Escolha do Photocard (upload de foto própria ou catálogo pré-definido);
   - Escolha do Sleeve Protetor: Transparente clássico, Holo Estrelas, Holo Vidro ou Holo Coração;
   - Aplicação de Decoden: Borda de chantilly nas cores lilás pastel, rosa chiclete, amarelo manteiga ou menta;
   - Cartela de Adesivos Polco: Letras, laços, estrelas brilhantes, carinhas felizes e fitas washi;
   - Ações: Salvar no Binder Virtual (9 bolsos) ou Baixar como Imagem PNG.

4. **Trilha Sonora Lo-Fi de Cafeteria**:
   - Controle de volume com faders independentes:
     - Acordes quentes de piano Rhodes Lo-Fi (harmonia suave em loop generativo);
     - Chuva suave na janela;
     - Textura de vinil e xícaras de café ao fundo.

---

## 3. Decisões de Produto & Arquitetura de Dados

```
┌────────────────────────────────────────────────────────────────────────┐
│                        ALÉM DA GRADE APP                               │
├────────────────────────────────────────────────────────────────────────┤
│                                                                        │
│   [Header: Logo + Navegação + Player Lo-Fi + Acesso Autora (PIN)]      │
│                                                                        │
│   ┌────────────────────────────────┐  ┌────────────────────────────┐   │
│   │       VISÃO PRINCIPAL          │  │     PAINÉIS AUXILIARES     │   │
│   │                                │  │                            │   │
│   │ • Feed de Crônicas & Campo     │  │ • Estúdio Polco/Decoden    │   │
│   │ • Leitor Fiel com Washi Tape   │  │ • Binder 9 Bolsos          │   │
│   │ • Rascunhos Privados (Autora)  │  │ • Manifesto "Comece Aqui"  │   │
│   │ • Editor de Posts Completo     │  │ • Lo-Fi Café Sound Engine  │   │
│   └────────────────────────────────┘  └────────────────────────────┘   │
│                                                                        │
│   ┌────────────────────────────────────────────────────────────────┐   │
│   │                    ESTADO LOCAL & PERSISTÊNCIA                 │   │
│   │  • usePostsStore (Posts Públicos + Rascunhos Privados)         │   │
│   │  • useAuthorAuth (Sessão por PIN encriptado localmente)        │   │
│   │  • useToploaderStore (Binder com photocards salvos)            │   │
│   │  • Web Audio API LoFiEngine (Sintetizador generativo em tempo  │   │
│   │    real, zero latência, sem risco de direitos autorais)        │   │
│   └────────────────────────────────────────────────────────────────┘   │
└────────────────────────────────────────────────────────────────────────┘
```

### Decisões Técnicas

- **Persistência Sem Backend**: Como o projeto foi preparado para o **GitHub Pages** (site estático), todo o controle de autenticação e rascunhos opera via armazenamento local seguro com chave derivada (`sessionStorage` e `localStorage`). Isso garante que a autora possa redigir em qualquer lugar sem que leitores vejam seus rascunhos.
- **Geração de Imagem dos Toploaders**: Implementada via Canvas 2D nativo do navegador, renderizando a foto, o sleeve holográfico, o decoden e os adesivos em escala 2x para download nítido sem requisições a servidores externos.
- **Música Lo-Fi de Cafeteria**: Motor de síntese de áudio construído diretamente com a Web Audio API nativa (osciladores com filtro passa-baixa, ruído rosa modelado para chuva, ruído impulsivo para o estalo de vinil e progressão harmônica relaxante I-vi-ii-V em teclado Rhodes sintetizado). Zero peso no bundle e sem problemas de direitos autorais ou links quebrados de streaming.

---

## 4. Plano de Implementação em Etapas

1. **Correção de Pequenos Ajustes e Resiliência**:
   - Refinamento do leitor de posts para suporte a fotos customizadas com tags washi tape e créditos de imagem;
   - Eliminação de qualquer aviso de build e garantia de integridade com o GitHub Actions.
2. **Sistema de Modo Autora & Gestão de Rascunhos**:
   - Criação de `useAuthorAuth` com modal de PIN (PIN padrão inicial configurável pela autora, com recuperação rápida);
   - Divisão de posts em `Publicados` e `Rascunhos Privados`;
   - Ocultação inteligente de botões de edição/exclusão/novo relato quando o Modo Autora estiver desativado.
3. **Novo Estúdio de Toploaders & Binder Digital de 9 Bolsos**:
   - Criação de interface com mangas holográficas (Holo glitter, shattered glass, hearts);
   - Decoden cremoso e cartelas de adesivos Polco coreanos;
   - Exportação da arte em arquivo `.png` com botão de download;
   - Galeria/Binder de 9 bolsos para colecionar criações.
4. **Soundscape Lo-Fi Café em Seul & Chuva Suave**:
   - Expansão do player no rodapé com botão de tocar Lo-Fi e mix de chuva/cafeteria/vinil;
   - Modo silencioso com memória do último estado.
5. **Verificação & Testes**:
   - Compilação limpa com `compile_applet` e validação no navegador.
