import {useState, useRef, useEffect} from "react";

import {Toolbar} from "./Toolbar";
import {useImageAdd} from "./hooks/useImageAdd.js";
import {useCropHandlers} from "./hooks/useCropHandlers.js";
import {useCanvasDrawing} from "./hooks/useCanvasDrawing.js";
import {useDrawing} from "./hooks/useDrawing.js";

import "./CanvasEditor.css";

export const CanvasEditor = () => {
    const [images, setImages] = useState([]);
    const [isCropping, setIsCropping] = useState(false);
    const canvasRef = useRef(null);

    const [zoom, setZoom] = useState(1);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (canvas) {
            canvas.width = canvas.offsetWidth;
            canvas.height = canvas.offsetHeight;
        }
    }, []);

    const handleImageAdd = useImageAdd(canvasRef, setImages);

    const {
        cropRect,
        handleMouseDown,
        handleMouseMove,
        handleMouseUp
    } = useCropHandlers(canvasRef, images, setImages, setIsCropping);

    useCanvasDrawing(canvasRef, images, cropRect, zoom);

    const {
        isDrawingMode,
        brushSize,
        brushColor,
        setBrushSize,
        setBrushColor,
        startDrawing,
        draw,
        stopDrawing,
        toggleDrawingMode,
        redrawAll
    } = useDrawing(canvasRef);

    useEffect(() => {
        if (canvasRef.current && isDrawingMode) {
            const ctx = canvasRef.current.getContext("2d");
            redrawAll(ctx);
        }
    }, [isDrawingMode, redrawAll]);

    const toggleCrop = () => setIsCropping(prev => !prev);

    const handleResize = (newWidth, newHeight) => {
        if (images.length === 0) return;
        const img = images[0];
        const newX = (canvasRef.current.width - newWidth) / 2;
        const newY = (canvasRef.current.height - newHeight) / 2;

        setImages([{...img, width: newWidth, height: newHeight, x: newX, y: newY}]);
    };

    const handleZoomIn = () => setZoom(prev => Math.min(prev + 0.1, 3));
    const handleZoomOut = () => setZoom(prev => Math.max(prev - 0.1, 0.2));
    const handleResetView = () => setZoom(1);
    const handleZoomChange = (value) => {
        const zoomVal = Math.min(Math.max(value, 0.2), 3);
        setZoom(zoomVal);
    };

    return (
        <div className="canvas-editor">
            <Toolbar
                onImageAdd={handleImageAdd}
                onToggleCrop={toggleCrop}
                onResize={handleResize}
                isCropping={isCropping}
                onToggleDrawing={toggleDrawingMode}
                isDrawingMode={isDrawingMode}
                brushSize={brushSize}
                brushColor={brushColor}
                setBrushSize={setBrushSize}
                setBrushColor={setBrushColor}
                zoom={zoom}
                onZoomIn={handleZoomIn}
                onZoomOut={handleZoomOut}
                onResetView={handleResetView}
                onZoomChange={handleZoomChange}
            />
            <canvas
                ref={canvasRef}
                className="canvas-area"
                onMouseDown={(event) => {
                    if (isCropping) handleMouseDown(event);
                    if (isDrawingMode) startDrawing(event);
                }}
                onMouseMove={(event) => {
                    if (isCropping) handleMouseMove(event);
                    if (isDrawingMode) draw(event);
                }}
                onMouseUp={() => {
                    if (isCropping) handleMouseUp();
                    if (isDrawingMode) stopDrawing();
                }}
                onMouseLeave={() => isDrawingMode && stopDrawing()}
            />
        </div>
    );
};
