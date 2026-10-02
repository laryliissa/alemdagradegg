const fs = require('fs');
const file = 'src/components/FestivalPhotoCard.tsx';
let content = fs.readFileSync(file, 'utf8');

const search = `  // Fallback de alta fidelidade representando a colagem de 4 fotos do Rock in Rio 2026 enviada pela Laryliissa:`;
const replace = `  return (
    <div
      className={\`w-full \${
        isDetailedView ? 'h-[420px] sm:h-[480px]' : 'h-64 sm:h-72'
      } rounded-xl border-2 border-[var(--ink)] overflow-hidden shadow-[4px_4px_0_var(--ink)] bg-neutral-200 flex items-center justify-center select-none \${className}\`}
    >
      <Camera className="w-12 h-12 text-neutral-400" />
    </div>
  );`;

const index = content.indexOf(search);
if (index !== -1) {
  content = content.substring(0, index) + replace + '\n};\n';
  fs.writeFileSync(file, content);
  console.log('Success');
} else {
  console.log('Not found');
}
