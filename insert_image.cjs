const fs = require('fs');
const file = 'src/data/postsData.ts';
let content = fs.readFileSync(file, 'utf8');

const search = `      {
        type: 'p',
        content:
          'Então saímos daquele lugar. Descansamos, tomamos Coca-Cola e deitamos no chão, risos.',
      },`;

const replace = `      {
        type: 'p',
        content:
          'Então saímos daquele lugar. Descansamos, tomamos Coca-Cola e deitamos no chão, risos.',
      },
      {
        type: 'image',
        content: '01.png',
      },`;

content = content.replace(search, replace);
fs.writeFileSync(file, content);
console.log('Done');
