import * as React from 'react';

export const Mail = (
    props: React.SVGProps<SVGSVGElement>
): React.ReactElement<React.SVGProps<SVGSVGElement>> => {
    return (
        <svg {...props} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M18,21h2c1.65,0,3-1.35,3-3V9.92l-6,4.68V20C17,20.552,17.448,21,18,21z M19.5,3c-0.79,0-1.54,0.26-2.16,0.74L17,4.01v8.06	l6-4.69V6.5C23,4.57,21.43,3,19.5,3z M9,5.57v8.06l2.385,1.86c0.362,0.282,0.869,0.282,1.23,0L15,13.63V5.57l-3,2.34L9,5.57z M1,18	c0,1.65,1.35,3,3,3h2c0.552,0,1-0.448,1-1v-5.4L1,9.92V18z M4.5,3C2.57,3,1,4.57,1,6.5v0.88l6,4.69V4.01L6.66,3.74	C6.04,3.26,5.29,3,4.5,3z" />
        </svg>
    );
};
