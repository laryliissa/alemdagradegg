const fs = require('fs');
const file = 'src/data/postsData.ts';
let content = fs.readFileSync(file, 'utf8');

content = content.replace(
  "type: 'p' | 'h2' | 'pull-quote' | 'hand-note' | 'list' | 'quote' | 'box';",
  "type: 'p' | 'h2' | 'pull-quote' | 'hand-note' | 'list' | 'quote' | 'box' | 'image';"
);

fs.writeFileSync(file, content);
console.log('Done');
