import React, { useState, useRef } from 'react';
import {
  X,
  Upload,
  Image as ImageIcon,
  Sparkles,
  Quote,
  PenTool,
  CheckCircle,
  HelpCircle,
  Clock,
  List,
} from 'lucide-react';
import { PostItem, Territory, PostFormat, PostBlock } from '../data/postsData.ts';

interface PostEditorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (postData: Omit<PostItem, 'id' | 'createdAt' | 'slug'> & { id?: string }) => void;
  postToEdit?: PostItem | null;
}

const PRESET_IMAGES = [
  {
    name: 'Festival & Show',
    url: 'https://images.unsplash.com/photo-1540039155732-d674140ca1d4?auto=format&fit=crop&q=80&w=800',
  },
  {
    name: 'Papelaria & Binder',
    url: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=800',
  },
  {
    name: 'Música & Fones',
    url: 'https://images.unsplash.com/photo-1628155930542-3c7a64e2c833?auto=format&fit=crop&q=80&w=800',
  },
  {
    name: 'Conversa & Encontro',
    url: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=800',
  },
];

const TERRITORIES: Array<{ name: Territory; color: string; desc: string }> = [
  {
    name: 'Espaços & Corpos',
    color: 'bg-[var(--k-cyan)]',
    desc: 'Festivais, limites físicos, postura e presença',
  },
  {
    name: 'Mesa de Criação',
    color: 'bg-[var(--k-lilac)] text-white',
    desc: 'Toploaders, papelaria, organização e processo',
  },
  {
    name: 'Filtros & Limites',
    color: 'bg-[var(--k-acid)]',
    desc: 'Saúde mental, redes sociais e dizer não',
  },
  {
    name: 'Aprendizagens',
    color: 'bg-[var(--k-pink)] text-white',
    desc: 'Pesquisa, neurodivergência e autoconhecimento',
  },
];

export const PostEditorModal: React.FC<PostEditorModalProps> = ({
  isOpen,
  onClose,
  onSave,
  postToEdit,
}) => {
  const [title, setTitle] = useState(postToEdit?.title || '');
  const [subtitle, setSubtitle] = useState(postToEdit?.subtitle || '');
  const [territory, setTerritory] = useState<Territory>(postToEdit?.territory || 'Espaços & Corpos');
  const [format, setFormat] = useState<PostFormat>(postToEdit?.format || 'Campo');
  const [readTime, setReadTime] = useState(postToEdit?.readTime || '5 min de leitura');
  const [coverImage, setCoverImage] = useState(
    postToEdit?.coverImage ||
      'https://images.unsplash.com/photo-1540039155732-d674140ca1d4?auto=format&fit=crop&q=80&w=800'
  );
  const [fieldNoteQuestion, setFieldNoteQuestion] = useState(
    postToEdit?.fieldNoteQuestion || ''
  );
  const [isDraft, setIsDraft] = useState<boolean>(postToEdit?.isDraft || false);
  const [customCaption, setCustomCaption] = useState<string>(postToEdit?.customCaption || '');

  // Converte blocks para texto simples editável se houver post anterior
  const [rawText, setRawText] = useState(() => {
    if (!postToEdit) return '';
    return postToEdit.blocks
      .map((b) => {
        if (b.type === 'h2') return `## ${b.content}`;
        if (b.type === 'pull-quote') return `> DESTAQUE: ${b.content}`;
        if (b.type === 'hand-note') return `~ NOTA: ${b.content}`;
        if (b.type === 'list' && Array.isArray(b.content)) {
          return b.content.map((item) => `- ${item}`).join('\n');
        }
        return b.content;
      })
      .join('\n\n');
  });

  const [isUploading, setIsUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  // Processa o upload de fotos do computador/celular sem precisar de servidor
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const reader = new FileReader();

    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        // Redimensiona para manter leve no localStorage (máx 1200px)
        const canvas = document.createElement('canvas');
        const maxDim = 1200;
        let width = img.width;
        let height = img.height;

        if (width > maxDim || height > maxDim) {
          if (width > height) {
            height = Math.round((height * maxDim) / width);
            width = maxDim;
          } else {
            width = Math.round((width * maxDim) / height);
            height = maxDim;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height);
          const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.85);
          setCoverImage(compressedDataUrl);
          setIsUploading(false);
          setUploadSuccess(true);
          setTimeout(() => setUploadSuccess(false), 3000);
        }
      };
      img.src = event.target?.result as string;
    };

    reader.readAsDataURL(file);
  };

  // Botões auxiliares para adicionar formatação sem saber código
  const insertTextHelper = (prefix: string, placeholder: string) => {
    setRawText((prev) => {
      const trimmed = prev.trim();
      const addition = `\n\n${prefix} ${placeholder}\n\n`;
      return trimmed ? trimmed + addition : addition.trim();
    });
  };

  const handleSavePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      alert('Por favor, digite um título para o seu relato!');
      return;
    }

    // Converte o texto em blocos estruturados
    const rawParagraphs = rawText.split(/\n\s*\n/);
    const blocks: PostBlock[] = [];

    rawParagraphs.forEach((para) => {
      const text = para.trim();
      if (!text) return;

      if (text.startsWith('## ')) {
        blocks.push({
          type: 'h2',
          content: text.replace(/^##\s*/, ''),
        });
      } else if (text.startsWith('> DESTAQUE:') || text.startsWith('> ')) {
        blocks.push({
          type: 'pull-quote',
          content: text.replace(/^>\s*(DESTAQUE:\s*)?/, ''),
          colorScheme: 'lilac',
        });
      } else if (text.startsWith('~ NOTA:') || text.startsWith('~ ')) {
        blocks.push({
          type: 'hand-note',
          content: text.replace(/^~\s*(NOTA:\s*)?/, ''),
          colorScheme: 'pink',
        });
      } else if (text.includes('\n- ') || text.startsWith('- ')) {
        const listItems = text
          .split('\n')
          .filter((line) => line.trim().startsWith('- '))
          .map((line) => line.trim().replace(/^-\s*/, ''));
        if (listItems.length > 0) {
          blocks.push({
            type: 'list',
            content: listItems,
          });
        } else {
          blocks.push({ type: 'p', content: text });
        }
      } else {
        blocks.push({
          type: 'p',
          content: text,
        });
      }
    });

    if (blocks.length === 0) {
      blocks.push({
        type: 'p',
        content: 'Um novo relato de campo adicionado ao diário Além da Grade.',
      });
    }

    const today = new Date();
    const formattedDate = `${today.getDate()} ${
      [
        'Jan',
        'Fev',
        'Mar',
        'Abr',
        'Mai',
        'Jun',
        'Jul',
        'Ago',
        'Set',
        'Out',
        'Nov',
        'Dez',
      ][today.getMonth()]
    } ${today.getFullYear()}`;

    onSave({
      id: postToEdit?.id,
      title: title.trim(),
      subtitle: subtitle.trim() || title.trim(),
      italicPrompt:
        fieldNoteQuestion.trim() ||
        'O que esta experiência despertou na sua forma de olhar o mundo?',
      territory,
      format,
      date: postToEdit?.date || formattedDate,
      readTime: readTime.trim() || '4 min de leitura',
      author: 'Laryliissa',
      coverImage,
      customCaption: customCaption.trim(),
      fieldNoteQuestion: fieldNoteQuestion.trim(),
      blocks,
      isFeatured: postToEdit?.isFeatured || false,
      isDraft,
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-[var(--ink)]/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="bg-white border-2 border-[var(--ink)] rounded-2xl shadow-[8px_8px_0_var(--ink)] max-w-3xl w-full max-h-[92vh] flex flex-col my-auto overflow-hidden">
        {/* Cabeçalho do Modal */}
        <div className="p-4 sm:p-5 border-b-2 border-[var(--ink)] bg-[var(--bg-dots)] flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <span className="p-1.5 bg-[var(--k-acid)] border-2 border-[var(--ink)] rounded-lg">
              <Sparkles className="w-5 h-5 text-[var(--ink)]" />
            </span>
            <div>
              <h3 className="display-font text-lg sm:text-xl font-bold text-[var(--ink)]">
                {postToEdit ? 'Editar Relato de Campo' : 'Novo Escrito no Diário'}
              </h3>
              <p className="text-xs text-neutral-600 font-medium">
                Escreva livremente, adicione suas fotos e publique com 1 clique
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg border-2 border-transparent hover:border-[var(--ink)] hover:bg-[var(--k-pink)] hover:text-white transition-all"
            title="Fechar formulário"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Formulário com Scroll */}
        <form onSubmit={handleSavePost} className="p-5 sm:p-7 overflow-y-auto custom-scrollbar flex-grow space-y-6">
          {/* Status de Publicação: Público vs Rascunho Pessoal */}
          <div className="bg-[var(--bg-dots)] p-3.5 rounded-xl border-2 border-[var(--ink)] flex flex-col sm:flex-row items-center justify-between gap-3">
            <div>
              <span className="mono-font text-xs font-bold uppercase text-[var(--ink)] block">
                Visibilidade do Relato
              </span>
              <span className="text-[11px] text-neutral-600">
                {isDraft
                  ? '🔒 Rascunho Pessoal: visível somente para você no Modo Autora.'
                  : '🟢 Publicado: visível para todos os visitantes do site.'}
              </span>
            </div>
            <div className="flex bg-white border-2 border-[var(--ink)] rounded-xl p-0.5 shadow-[2px_2px_0_var(--ink)] shrink-0">
              <button
                type="button"
                onClick={() => setIsDraft(false)}
                className={`py-1.5 px-3 rounded-lg text-xs font-bold transition-colors ${
                  !isDraft
                    ? 'bg-emerald-500 text-white'
                    : 'text-neutral-700 hover:bg-neutral-100'
                }`}
              >
                Publicar no Blog
              </button>
              <button
                type="button"
                onClick={() => setIsDraft(true)}
                className={`py-1.5 px-3 rounded-lg text-xs font-bold transition-colors ${
                  isDraft
                    ? 'bg-[var(--k-pink)] text-white'
                    : 'text-neutral-700 hover:bg-neutral-100'
                }`}
              >
                Salvar Rascunho Privado
              </button>
            </div>
          </div>

          {/* 1. Título e Subtítulo */}
          <div>
            <label className="mono-font text-xs font-bold uppercase text-[var(--ink)] block mb-1.5">
              1. Título do Relato *
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Ex: O show visto da lateral: limites, escolhas e acolhimento"
              className="w-full px-4 py-2.5 rounded-xl border-2 border-[var(--ink)] text-base font-semibold focus:outline-none focus:ring-2 focus:ring-[var(--k-lilac)]"
            />
          </div>

          <div>
            <label className="mono-font text-xs font-bold uppercase text-[var(--ink)] block mb-1.5">
              Subtítulo / Resumo Rápido
            </label>
            <input
              type="text"
              value={subtitle}
              onChange={(e) => setSubtitle(e.target.value)}
              placeholder="Uma frase curta que resume o post no feed"
              className="w-full px-4 py-2 rounded-xl border-2 border-[var(--ink)] text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[var(--k-cyan)]"
            />
          </div>

          {/* 2. Território / Categoria */}
          <div>
            <label className="mono-font text-xs font-bold uppercase text-[var(--ink)] block mb-2">
              2. Escolha o Território (Categoria)
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {TERRITORIES.map((t) => {
                const isSelected = territory === t.name;
                return (
                  <button
                    type="button"
                    key={t.name}
                    onClick={() => setTerritory(t.name)}
                    className={`p-3 rounded-xl border-2 text-left transition-all flex items-start gap-2.5 ${
                      isSelected
                        ? 'border-[var(--ink)] bg-[var(--paper)] shadow-[3px_3px_0_var(--ink)] -translate-y-0.5'
                        : 'border-neutral-200 hover:border-[var(--ink)] bg-white opacity-85'
                    }`}
                  >
                    <span className={`w-3.5 h-3.5 rounded-full mt-0.5 shrink-0 border border-[var(--ink)] ${t.color}`} />
                    <div>
                      <div className="display-font text-xs font-bold text-[var(--ink)]">{t.name}</div>
                      <div className="text-[11px] text-neutral-500">{t.desc}</div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 3. Upload de Foto Descomplicado */}
          <div className="bg-[var(--bg-dots)] p-4 sm:p-5 rounded-xl border-2 border-[var(--ink)]">
            <div className="flex items-center justify-between mb-2">
              <label className="mono-font text-xs font-bold uppercase text-[var(--ink)] flex items-center gap-1.5">
                <ImageIcon className="w-4 h-4 text-[var(--k-pink)]" /> 3. Foto de Capa do Post
              </label>
              {uploadSuccess && (
                <span className="mono-font text-[10px] text-emerald-700 font-bold flex items-center gap-1">
                  <CheckCircle className="w-3.5 h-3.5" /> Foto pronta!
                </span>
              )}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 items-center">
              {/* Botão de Upload Local */}
              <div className="w-full sm:w-auto">
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileUpload}
                  accept="image/*"
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full sm:w-auto mono-font text-xs font-bold uppercase bg-[var(--k-acid)] text-[var(--ink)] px-4 py-2.5 rounded-xl border-2 border-[var(--ink)] hover:bg-[var(--k-cyan)] transition-all shadow-[2px_2px_0_var(--ink)] flex items-center justify-center gap-2"
                >
                  <Upload className="w-4 h-4" /> {isUploading ? 'Processando foto...' : 'Carregar Foto do Aparelho'}
                </button>
                <p className="text-[10px] text-neutral-500 mt-1">Fotos do seu celular ou computador (JPG/PNG)</p>
              </div>

              {/* Ou escolha rápida */}
              <div className="w-full sm:flex-grow">
                <div className="text-[10px] mono-font uppercase font-bold text-neutral-500 mb-1.5">
                  Ou escolha uma imagem temática:
                </div>
                <div className="flex gap-2 overflow-x-auto pb-1">
                  {PRESET_IMAGES.map((img) => (
                    <button
                      type="button"
                      key={img.name}
                      onClick={() => setCoverImage(img.url)}
                      className={`text-[10px] mono-font font-bold px-2.5 py-1 rounded-lg border-2 shrink-0 transition-all ${
                        coverImage === img.url
                          ? 'border-[var(--ink)] bg-[var(--k-lilac)] text-white shadow-[1px_1px_0_var(--ink)]'
                          : 'border-neutral-300 bg-white text-neutral-700 hover:border-[var(--ink)]'
                      }`}
                    >
                      {img.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Pré-visualização com Washi Tape */}
            {coverImage && (
              <div className="mt-4 pt-4 border-t border-dashed border-neutral-300">
                <div className="text-[10px] mono-font uppercase font-bold text-neutral-500 mb-1">
                  Pré-visualização com fita washi:
                </div>
                <div className="washi-tape-img max-w-sm mx-auto">
                  <img
                    src={coverImage}
                    alt="Preview"
                    className="w-full h-36 object-cover img-border shadow-[3px_3px_0_var(--ink)]"
                  />
                </div>
                <div className="max-w-sm mx-auto mt-2">
                  <label className="mono-font text-[10px] uppercase font-bold text-neutral-600 block mb-1">
                    Legenda / Nota da Foto (Opcional):
                  </label>
                  <input
                    type="text"
                    value={customCaption}
                    onChange={(e) => setCustomCaption(e.target.value)}
                    placeholder="Ex: Registro no gramado do festival com o lightstick"
                    className="w-full px-3 py-1.5 rounded-lg border-2 border-[var(--ink)] text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[var(--k-pink)] bg-white"
                  />
                </div>
              </div>
            )}
          </div>

          {/* 4. Corpo do Texto */}
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
              <label className="mono-font text-xs font-bold uppercase text-[var(--ink)]">
                4. Escreva o seu Relato
              </label>
              {/* Botões Mágicos para Adicionar Estilo com 1 Clique */}
              <div className="flex flex-wrap gap-1.5">
                <button
                  type="button"
                  onClick={() => insertTextHelper('> DESTAQUE:', 'Digite aqui uma frase marcante em lilás')}
                  className="mono-font text-[10px] font-bold px-2 py-1 bg-white border border-[var(--ink)] rounded-md hover:bg-[var(--k-lilac)] hover:text-white transition-colors flex items-center gap-1 shadow-[1px_1px_0_var(--ink)]"
                  title="Inserir frase grande em destaque (Pull Quote)"
                >
                  <Quote className="w-3 h-3" /> + Frase Destaque
                </button>
                <button
                  type="button"
                  onClick={() => insertTextHelper('~ NOTA:', '“Uma fala engraçada ou pensamento caligráfico”')}
                  className="mono-font text-[10px] font-bold px-2 py-1 bg-white border border-[var(--ink)] rounded-md hover:bg-[var(--k-pink)] hover:text-white transition-colors flex items-center gap-1 shadow-[1px_1px_0_var(--ink)]"
                  title="Inserir fala em caligrafia"
                >
                  <PenTool className="w-3 h-3" /> + Caligrafia
                </button>
                <button
                  type="button"
                  onClick={() => insertTextHelper('##', 'Título desta parte')}
                  className="mono-font text-[10px] font-bold px-2 py-1 bg-white border border-[var(--ink)] rounded-md hover:bg-[var(--k-acid)] transition-colors flex items-center gap-1 shadow-[1px_1px_0_var(--ink)]"
                  title="Inserir subtítulo de capítulo"
                >
                  Subtítulo
                </button>
                <button
                  type="button"
                  onClick={() => insertTextHelper('- Primeiro item\n- Segundo item\n- Terceiro item', '')}
                  className="mono-font text-[10px] font-bold px-2 py-1 bg-white border border-[var(--ink)] rounded-md hover:bg-[var(--k-cyan)] transition-colors flex items-center gap-1 shadow-[1px_1px_0_var(--ink)]"
                  title="Inserir lista com estrelas ✦"
                >
                  <List className="w-3 h-3" /> Lista
                </button>
              </div>
            </div>

            <textarea
              required
              rows={8}
              value={rawText}
              onChange={(e) => setRawText(e.target.value)}
              placeholder="Escreva livremente aqui... Dê Enter duas vezes para criar um novo parágrafo. Não precisa se preocupar com código!"
              className="w-full p-4 rounded-xl border-2 border-[var(--ink)] text-sm sm:text-base leading-relaxed focus:outline-none focus:ring-2 focus:ring-[var(--k-pink)] font-medium"
            />
            <p className="text-[11px] text-neutral-500 mt-1">
              Dica: Separe seus parágrafos com a tecla Enter. Use os botões acima se quiser destacar alguma frase especial!
            </p>
          </div>

          {/* 5. Nota de Campo Final */}
          <div>
            <label className="mono-font text-xs font-bold uppercase text-[var(--ink)] flex items-center gap-1.5 mb-1.5">
              <HelpCircle className="w-4 h-4 text-[var(--k-pink)]" /> 5. Pergunta de Encerramento (Nota de Campo)
            </label>
            <input
              type="text"
              value={fieldNoteQuestion}
              onChange={(e) => setFieldNoteQuestion(e.target.value)}
              placeholder="Ex: Até que ponto o sacrifício físico ainda é usado como régua para medir o amor de um fã?"
              className="w-full px-4 py-2.5 rounded-xl border-2 border-[var(--ink)] text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[var(--k-acid)]"
            />
            <p className="text-[11px] text-neutral-500 mt-1">
              Esta pergunta aparecerá na caixa especial no fim do texto convidando o leitor a refletir.
            </p>
          </div>
        </form>

        {/* Rodapé de Ações */}
        <div className="p-4 sm:p-5 border-t-2 border-[var(--ink)] bg-[var(--paper)] flex items-center justify-between gap-3 shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="mono-font text-xs font-bold uppercase px-4 py-2.5 rounded-xl border-2 border-[var(--ink)] bg-white hover:bg-neutral-100 transition-colors shadow-[2px_2px_0_var(--ink)]"
          >
            Cancelar
          </button>

          <button
            type="button"
            onClick={handleSavePost}
            className="mono-font text-xs font-bold uppercase px-6 py-2.5 rounded-xl border-2 border-[var(--ink)] bg-[var(--k-pink)] text-white hover:bg-[var(--k-lilac)] transition-all shadow-[4px_4px_0_var(--ink)] hover:-translate-y-0.5 flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4" /> {postToEdit ? 'Salvar Alterações' : '✦ Publicar no Diário'}
          </button>
        </div>
      </div>
    </div>
  );
};
