import { useState } from "react";

export const useAspectRatio = (initialLock = true) => {
    const [aspectRatioLock, setAspectRatioLock] = useState(initialLock);
    const [originalAspectRatio, setOriginalAspectRatio] = useState(null);

    const calculateAspectRatio = (width, height) => width / height;

    const maintainAspectRatio = (newWidth, newHeight, originalWidth, originalHeight) => {
        if (!aspectRatioLock) return { width: newWidth, height: newHeight };

        const aspectRatio = originalAspectRatio || calculateAspectRatio(originalWidth, originalHeight);

        return {
            width: newWidth,
            height: newWidth / aspectRatio
        };
    };

    return {
        aspectRatioLock,
        setAspectRatioLock,
        maintainAspectRatio,
        setOriginalAspectRatio
    };
};
