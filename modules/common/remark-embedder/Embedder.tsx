export const YoutubeTransformer = {
    name: 'Youtube',
    shouldTransform(url): boolean {
        const { host } = new URL(url);

        return ['www.youtube.com', 'youtube.com'].includes(host);
    },
    getHTML(url: string): string {
        const iframeUrl = url.replace('/watch?v=', '/embed/');
        const output = `<div className="w-full h-max pt-[50%] mobile:pt-[46.6%] mobile:h-20 desktop:min-pt-[310px] relative" ><iframe src="${iframeUrl}" className="absolute top-0 w-full h-full mx-auto rounded-xl" allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking" sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts" allowfullscreen></iframe><div>`;
        return output;
    }
};

export const VideoTransformer = {
    name: 'Video',
    shouldTransform(url): boolean {
        const { pathname } = new URL(url);
        const supportedVideoFormats = ['.mp4', '.mov', '.m4v'];
        return supportedVideoFormats.some((format) => pathname.endsWith(format));
    },
    getHTML(url: string): string {
        const src = url.split('//')[1];
        const output = `<video src="/${src}" controls autoPlay muted playsInline className="w-full" />`;
        return output;
    }
};

export const DropboxTransformer = {
    name: 'Dropbox',
    shouldTransform(url): boolean {
        const { host } = new URL(url);
        return host.includes('www.dropbox.com');
    },
    getHTML(url: string): string {
        // ?raw=1 will bypass the dropbox preview and get the video file directly
        const src = url.replace('?dl=0', '?raw=1');
        const output = `<video src="${src}" controls autoPlay muted playsInline className="w-full" />`;
        return output;
    }
};
