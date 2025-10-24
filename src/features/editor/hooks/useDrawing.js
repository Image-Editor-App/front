import {useState, useRef, useCallback} from "react";

export const useDrawing = (canvasRef) => {
    const [isDrawing, setIsDrawing] = useState(false);
    const [brushSize, setBrushSize] = useState(5);
    const [brushColor, setBrushColor] = useState("#000000");
    const [isDrawingMode, setIsDrawingMode] = useState(false);

    const drawingDataRef = useRef([]);
    const lastPosRef = useRef({x: 0, y: 0});

    const getCanvasCoordinates = useCallback((event) => {
        const canvas = canvasRef.current;
        if (!canvas) return {x: 0, y: 0};

        const rect = canvas.getBoundingClientRect();
        const scaleX = canvas.width / rect.width;
        const scaleY = canvas.height / rect.height;

        const x = (event.clientX - rect.left) * scaleX;
        const y = (event.clientY - rect.top) * scaleY;

        return {x, y};
    }, [canvasRef]);

    const startDrawing = useCallback((event) => {
        if (!isDrawingMode) return;

        const {x, y} = getCanvasCoordinates(event);

        setIsDrawing(true);
        lastPosRef.current = {x, y};

        drawingDataRef.current.push({
            type: "path",
            points: [{x, y}],
            color: brushColor,
            size: brushSize
        });
    }, [isDrawingMode, canvasRef, brushColor, brushSize, getCanvasCoordinates]);

    const draw = useCallback((event) => {
        if (!isDrawing || !isDrawingMode) return;

        const {x, y} = getCanvasCoordinates(event);

        const currentPath = drawingDataRef.current[drawingDataRef.current.length - 1];
        currentPath.points.push({x, y});

        const ctx = canvasRef.current.getContext("2d");
        ctx.beginPath();
        ctx.moveTo(lastPosRef.current.x, lastPosRef.current.y);
        ctx.lineTo(x, y);
        ctx.strokeStyle = brushColor;
        ctx.lineWidth = brushSize;
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.stroke();

        lastPosRef.current = {x, y};
    }, [isDrawing, isDrawingMode, canvasRef, brushColor, brushSize, getCanvasCoordinates]);

    const stopDrawing = useCallback(() => {
        setIsDrawing(false);
    }, []);

    const toggleDrawingMode = useCallback(() => {
        setIsDrawingMode(prev => !prev);
    }, []);

    const clearDrawing = useCallback(() => {
        drawingDataRef.current = [];
    }, []);

    const redrawAll = useCallback((ctx) => {
        drawingDataRef.current.forEach(path => {
            if (path.points.length < 2) return;

            ctx.beginPath();
            ctx.moveTo(path.points[0].x, path.points[0].y);

            for (let i = 1; i < path.points.length; i++) {
                ctx.lineTo(path.points[i].x, path.points[i].y);
            }

            ctx.strokeStyle = path.color;
            ctx.lineWidth = path.size;
            ctx.lineCap = "round";
            ctx.lineJoin = "round";
            ctx.stroke();
        });
    }, []);

    return {
        isDrawingMode,
        brushSize,
        brushColor,
        setBrushSize,
        setBrushColor,
        startDrawing,
        draw,
        stopDrawing,
        toggleDrawingMode,
        clearDrawing,
        redrawAll,
        drawingData: drawingDataRef.current
    };
};
