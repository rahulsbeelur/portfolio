const rows = [
    ['Any content', 'npm run new:content', 'Choose from one guided menu'],
    ['Blog post', 'npm run new:blog', '/ and /blog'],
    ['Build project', 'npm run new:build-project', '/ and /building'],
    ['Build update', 'npm run new:build', '/ and /building'],
    ['Portfolio project', 'npm run new:portfolio-project', '/projects'],
    ['Work experience', 'npm run new:experience', '/resume'],
    ['Education', 'npm run new:education', '/resume'],
    ['Languages', 'npm run set:languages', '/resume']
];

const widths = rows.reduce(
    (result, row) => result.map((width, index) => Math.max(width, row[index].length)),
    ['Content'.length, 'Command'.length, 'Appears on'.length]
);

const renderRow = (row) => row.map((value, index) => value.padEnd(widths[index])).join('  ');

console.log('Portfolio content commands\n');
console.log(renderRow(['Content', 'Command', 'Appears on']));
console.log(renderRow(widths.map((width) => '─'.repeat(width))));
rows.forEach((row) => console.log(renderRow(row)));

console.log('\nTypical workflow');
console.log('  1. npm run new:content');
console.log('  2. npm run dev');
console.log('  3. npm run format && npm run lint-check && npm run build');

console.log('\nFull guide: docs/CONTENT_GUIDE.md');
console.log('Optional branch + commit + push helper: npm run new:content:git -- <type>');
console.log(
    'Types: blog, build, build-project, portfolio-project, experience, education, languages'
);
