import { useEffect, useState } from 'react';
import packageJson from '../package.json';

interface VersionInfo {
    version: string;
    commit: string;
    branch: string;
    timestamp: string;
    buildTime: string;
}

export const useVersion = (): VersionInfo | null => {
    const [versionInfo, setVersionInfo] = useState<VersionInfo | null>(null);

    useEffect(() => {
        // Read version from package.json
        const version = packageJson.version || '0.0.0';
        setVersionInfo({
            version,
            commit: 'unknown',
            branch: 'unknown',
            timestamp: 'unknown',
            buildTime: new Date().toISOString()
        });
    }, []);

    return versionInfo;
};
