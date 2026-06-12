/** @type {import('tailwindcss').Config} */

module.exports = {
    content: [
        './pages/**/*.{js,ts,jsx,tsx}',
        './components/**/*.{js,ts,jsx,tsx}',
        './app/**/*.{js,ts,jsx,tsx}',
        './modules/**/*.{js,ts,jsx,tsx}'
    ],
    darkMode: 'class',
    theme: {
        screens: {
            desktop: {
                min: process.env.NEXT_PUBLIC_BLOG_PAGE_PRESENT === 'on' ? '1111px' : '1078px'
            },
            tablet: {
                max: process.env.NEXT_PUBLIC_BLOG_PAGE_PRESENT === 'on' ? '1111px' : '1078px',
                min: process.env.NEXT_PUBLIC_BLOG_PAGE_PRESENT === 'on' ? '717px' : '700px'
            },
            mobile: { max: process.env.NEXT_PUBLIC_BLOG_PAGE_PRESENT === 'on' ? '717px' : '700px' }
        },
        colors: {
            /* Light mode tokens (user) mapped here */
            'primary-default': '#334155',
            'primary-dark': '#1f2a36',
            'primary-light': '#90a1b8',
            'primary-lighter': '#e6eef5',
            'primary-background-color': '#FAFAF9',
            'primary-background-color-lighter': '#FFFFFF',
            'primary-background-color-darker': '#f0f2f5',

            /* Accent */
            'accent-default': '#4F46E5',
            'accent-light': '#818CF8',
            'accent-darker': '#3f37c4',

            /* Semantic */
            'semantic-success-default': '#10B981',
            'semantic-warning-default': '#F59E0B',
            'semantic-error-default': '#EF4444',

            /* Dark mode readable neutrals */
            'neutral-black-default': '#0F172A',
            'neutral-black-dark': '#0B1220',
            'neutral-black-light': '#475569',

            'neutral-white-default': '#FFFFFF',
            'neutral-white-dark': '#F8FAFC',

            black: '#000000',
            white: '#FFFFFF'
        },
        fontFamily: {
            inter: ['Inter', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'Helvetica', 'Arial', 'sans-serif'],
            poppins: ['Poppins', 'Inter', 'system-ui', 'sans-serif'],
            robotoMono: ['Roboto Mono', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'monospace']
        },
        fontWeight: {
            basic: 325
        },
        letterSpacing: {
            '-0.5px': '-0.5px',
            '-1.5px': '-1.5px',
            '0.1px': '0.1px',
            '0.25px': '0.25px',
            '0.3px': '0.3px',
            '0.5px': '0.5px',
            '1.5px': '1.5px'
        }
    }
};
