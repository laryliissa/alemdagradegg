const fs = require('fs');
const file = 'src/components/DedicatedPostView.tsx';
let content = fs.readFileSync(file, 'utf8');

const search = `              if (block.type === 'quote') {
                return (
                  <blockquote
                    key={idx}
                    className="bg-[var(--paper)] border-l-4 border-[var(--k-pink)] pl-6 py-3 my-8 italic text-xl text-neutral-800 font-medium"
                  >
                    "{block.content as string}"
                  </blockquote>
                );
              }`;

const replace = `              if (block.type === 'quote') {
                return (
                  <blockquote
                    key={idx}
                    className="bg-[var(--paper)] border-l-4 border-[var(--k-pink)] pl-6 py-3 my-8 italic text-xl text-neutral-800 font-medium"
                  >
                    "{block.content as string}"
                  </blockquote>
                );
              }
              if (block.type === 'image') {
                return (
                  <div key={idx} className="washi-tape-img my-8 max-w-sm mx-auto relative group">
                    <img
                      src={block.content as string}
                      alt={block.caption || 'Post image'}
                      className="w-full h-auto object-cover img-border shadow-[3px_3px_0_var(--ink)]"
                    />
                    {block.caption && (
                      <p className="mono-font text-xs text-center mt-3 text-neutral-500 italic">
                        {block.caption}
                      </p>
                    )}
                  </div>
                );
              }`;

content = content.replace(search, replace);
fs.writeFileSync(file, content);
console.log('Done');
