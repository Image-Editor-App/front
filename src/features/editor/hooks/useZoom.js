import {useState} from "react";

export const useZoom = (initialZoom = 1) => {
    const [zoom, setZoom] = useState(initialZoom);

    const zoomIn = () => setZoom(prev => Math.min(prev * 1.2, 3));
    const zoomOut = () => setZoom(prev => Math.max(prev / 1.2, 0.1));
    const resetZoom = () => setZoom(1);

    return {
        zoom,
        zoomIn,
        zoomOut,
        resetZoom,
        setZoom
    }
}
