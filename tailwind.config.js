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
        extend: {
            boxShadow: {
                '3xl': '0px 6px 12px -6px rgba(24, 39, 75, 0.12), 0px 8px 24px -4px rgba(24, 39, 75, 0.08)',
                bottom: '0px 1px 0px #DDDEE5' //used in Blog cards
            }
        },
        screens: {
            desktop: { min: '1111px' },
            tablet: { max: '1110px', min: '717px' },
            mobile: { max: '716px' }
        },
        colors: {
            'linked-in-button': '#0A66C2',
            'linked-in-button-hover': '#085098',
            'linked-in-background': '#0A66C21A',
            'linked-in-background-dark': '#0A66C280',
            'twitter-button': '#1DA1F2',
            'twitter-button-hover': '#0C80C9',
            'twitter-background': '#1DA1F21A',
            'twitter-background-dark': '#1DA1F280',

            'primary-dark': '#2090A5',
            'primary-darker': '#104853',
            'primary-default': '#4CC5DC',
            'primary-light': '#88D8E8',
            'primary-lighter': '#DBF3F8',
            'primary-background-color': '#E6DACE',
            'primary-background-color-lighter': '#F4ECE6',

            'secondary-darker': '#271F39',
            'secondary-dark': '#4E3F71',
            'secondary-default': '#7661A7',
            'secondary-light': '#A496C4',
            'secondary-lighter': '#A496C4',

            'accent-darker': '#C4C4C4',
            'accent-dark': '#C4C4C4',
            'accent-default': '#F6F4F9',
            'accent-light': '#C4C4C4',
            'accent-lighter': '#C4C4C4',

            'semantic-success-darker': '#05A660',
            'semantic-success-dark': '#06C270',
            'semantic-success-default': '#39D98A',
            'semantic-success-light': '#56EBA0',
            'semantic-success-lighter': '#E3FFF1',

            'semantic-informative-darker': '#019FAA',
            'semantic-informative-dark': '#00CFDE',
            'semantic-informative-default': '#73DFEF',
            'semantic-informative-light': '#A9EFF2',
            'semantic-informative-lighter': '#E6FFFF',

            'semantic-warning-darker': '#E57A00',
            'semantic-warning-dark': '#FF8800',
            'semantic-warning-default': '#FDAC42',
            'semantic-warning-light': '#FCCC75',
            'semantic-warning-lighter': '#FFF8E5',

            'semantic-error-darker': '#E53535',
            'semantic-error-dark': '#FF3B3B',
            'semantic-error-default': '#FF5C5C',
            'semantic-error-light': '#FF8080',
            'semantic-error-lighter': '#FFE5E5',

            'custom-blue-darker': '#004FC4',
            'custom-blue-dark': '#0063F7',
            'custom-blue-default': '#5B8DEF',
            'custom-blue-light': '#9DBFF9',
            'custom-blue-lighter': '#E5F0FF',

            'custom-yellow-darker': '#E5B800',
            'custom-yellow-dark': '#FFCC00',
            'custom-yellow-default': '#FDDD48',
            'custom-yellow-light': '#FDED72',
            'custom-yellow-lighter': '#FFFEE5',

            'custom-purple-darker': '#4C0099',
            'custom-purple-dark': '#6600CC',
            'custom-purple-default': '#AC5DD9',
            'custom-purple-light': '#DDA5E9',
            'custom-purple-lighter': '#FFE5FF',

            'neutral-black-darker': '#1C1C28',
            'neutral-black-dark': '#28293D',
            'neutral-black-default': '#555770',
            'neutral-black-light': '#8E90A6',
            'neutral-black-lighter': '#C7C8D9',

            'neutral-white-darker': '#E3E4EB',
            'neutral-white-dark': '#EBEBF0',
            'neutral-white-default': '#F2F2F5',
            'neutral-white-light': '#FAFAFC',
            'neutral-white-lighter': '#FCFCFE',
            'complimentary-blue-tint': '#F3FBFD',
            //top-bottom-color is used in the work section cards to have top and bottom border lines
            'top-bottom-color': '#DDDEE5',
            // dark-xl color is used in tech stack cards in services page for hover shadow color in dark mode
            'dark-xl': 'rgba(210, 210, 210, 0.25)',
            'modal-bg': 'rgba(0,0,0,0.6)',
            'outline-light-200': '#E5E5EA',

            black: '#000000',
            white: '#FFFFFF'
        },
        fontFamily: {
            lato: ['Lato'],
            poppins: ['Poppins'],
            robotoMono: ['Roboto Mono']
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
        },
        // z-index is used in other components, which may look broken when that component is over a sidebar or appbar.
        //  Hence a z-index with value 9999 is added to make sure the sidebar and appbar always stays on top of the page.
        zIndex: {
            max: '9999'
        }
    }
};
