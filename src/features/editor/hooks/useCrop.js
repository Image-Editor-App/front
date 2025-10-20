import { useState } from "react";

export const useCrop = () => {
    const [cropRect, setCropRect] = useState(null);
    const [isCropping, setIsCropping] = useState(false);

    const startCrop = (position) => {
        setIsCropping(true);
        setCropRect({ ...position, width: 0, height: 0 });
    };

    const updateCrop = (position) => {
        if (!isCropping) return;
        setCropRect(prev => ({
            ...prev,
            width: position.x - prev.x,
            height: position.y - prev.y
        }));
    };

    const completeCrop = () => {
        setIsCropping(false);
        return cropRect;
    };

    const cancelCrop = () => {
        setIsCropping(false);
        setCropRect(null);
    };

    return {
        cropRect,
        isCropping,
        startCrop,
        updateCrop,
        completeCrop,
        cancelCrop
    };
};
