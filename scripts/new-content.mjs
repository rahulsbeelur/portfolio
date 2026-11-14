import readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';
import { runBlog, runQuickRead } from './content-author.mjs';

const rl = readline.createInterface({ input, output });

try {
    const kind = (await rl.question('Create a blog post or quick read (blog/quick-read): '))
        .trim()
        .toLowerCase();
    if (kind === 'blog' || kind === 'b') {
        await runBlog(rl);
    } else if (kind === 'quick-read' || kind === 'quick' || kind === 'q') {
        await runQuickRead(rl);
    } else {
        throw new Error('Choose blog or quick-read.');
    }
} finally {
    rl.close();
}
