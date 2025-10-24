import {useState} from "react";

export const useResize = (onResize) => {
    const [showResize, setShowResize] = useState(false);
    const [width, setWidth] = useState(300);
    const [height, setHeight] = useState(300);
    const [lockAspect, setLockAspect] = useState(true);
    const [aspectRatio, setAspectRatio] = useState("1:1");
    const [customRatio, setCustomRatio] = useState("");

    const parseAspectRatio = (ratioStr) => {
        const [w, h] = ratioStr.split(":").map(Number);
        return w / h;
    };

    const getCurrentRatio = () => {
        if (aspectRatio === "custom" && customRatio.includes(":")) {
            return parseAspectRatio(customRatio);
        }
        return parseAspectRatio(aspectRatio);
    };

    const handleResizeSubmit = () => {
        onResize(width, height);
        setShowResize(false);
    };

    const handleWidthChange = (newWidth) => {
        if (lockAspect) {
            const ratio = getCurrentRatio();
            setHeight(Math.round(newWidth / ratio));
        }
        setWidth(newWidth);
    };

    const handleHeightChange = (newHeight) => {
        if (lockAspect) {
            const ratio = getCurrentRatio();
            setWidth(Math.round(newHeight * ratio));
        }
        setHeight(newHeight);
    };

    const toggleResize = () => setShowResize(prev => !prev);

    return {
        showResize,
        width,
        height,
        lockAspect,
        aspectRatio,
        customRatio,
        setWidth: handleWidthChange,
        setHeight: handleHeightChange,
        setLockAspect,
        setAspectRatio,
        setCustomRatio,
        handleResizeSubmit,
        toggleResize
    };
};
