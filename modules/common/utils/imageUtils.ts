import fs from 'fs';
import { CommonPaths } from '../../../constant/paths';
import sizeOf from 'buffer-image-size';

const minHeight = 64; // min image height in pixels.
const minWidth = 64; // min image width in pixels.

export const getImagePaths = (folderPath: string): string[] => {
    const paths = fs.readdirSync(`${CommonPaths.Public}/${folderPath}`);
    const imagePaths = paths.map((item) => `/${folderPath}/${item}`);
    return imagePaths;
};

export const isValidImageResolution = (path: string): void => {
    const image = fs.readFileSync(path);
    const { width, height } = sizeOf(image);
    if (width < minWidth || height < minHeight) {
        throw new Error(`${path} image dimensions must be more than ${minWidth} X ${minHeight}`);
    }
};

export const checkImageResolutions = (path: string): void => {
    if (path.endsWith('png')) {
        isValidImageResolution(path);
    }
    if (fs.statSync(path).isDirectory() && path !== 'public/favicon') {
        const folderNames = fs.readdirSync(path);
        folderNames.forEach((folder) => {
            checkImageResolutions(`${path}/${folder}`);
        });
    }
    // if (path.endsWith('jpeg') || path.endsWith('jpg')) {
    //     throw new Error(`${path} Invalid image format, please provide the image in .png format`);
    // }
};
