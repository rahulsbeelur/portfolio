import readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';
import {
    runBlog,
    runBuildProject,
    runBuildUpdate,
    runEducation,
    runLanguages,
    runPortfolioProject,
    runWorkExperience
} from './content-author.mjs';

const rl = readline.createInterface({ input, output });

const choices = [
    { keys: ['1', 'blog', 'b'], label: 'Blog post', run: runBlog },
    { keys: ['2', 'build', 'build-update', 'u'], label: 'Build update', run: runBuildUpdate },
    {
        keys: ['3', 'build-project', 'bp'],
        label: 'Build-in-public project',
        run: runBuildProject
    },
    {
        keys: ['4', 'portfolio-project', 'portfolio', 'p'],
        label: 'Portfolio project',
        run: runPortfolioProject
    },
    { keys: ['5', 'experience', 'work'], label: 'Work experience', run: runWorkExperience },
    { keys: ['6', 'education', 'school'], label: 'Education', run: runEducation },
    { keys: ['7', 'languages'], label: 'Languages', run: runLanguages }
];

try {
    console.log('What would you like to add?');
    choices.forEach((choice, index) => console.log(`${index + 1}. ${choice.label}`));
    const answer = (await rl.question('Choose 1–7 or type a content name: ')).trim().toLowerCase();
    const selected = choices.find((choice) => choice.keys.includes(answer));
    if (!selected) throw new Error('Choose one of the listed content types.');
    await selected.run(rl);
} finally {
    rl.close();
}
