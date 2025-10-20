import {useState} from "react";

export const useDrawing = () => {
    const [draws, setDraws] = useState([]);
    const [brushColor, setBrushColor] = useState("#ff0000");
    const [brushSize, setBrushSize] = useState(3);

    const addDraw = (newDraw) => setDraws(prev => [...prev, newDraw]);
    const clearDraws = () => setDraws([]);

    return {
        draws,
        setDraws,
        brushColor,
        setBrushColor,
        brushSize,
        setBrushSize,
        addDraw,
        clearDraws
    }
}
