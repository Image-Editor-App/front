import {useState} from "react";
import {Toolbar} from "./Toolbar";
import {Sidebar} from "./Sidebar";
import {CanvasLayer} from "./CanvasLayer";
import "./CanvasEditor.css";

export const CanvasEditor = () => {
    const [images, setImages] = useState([]);
    const [draws, setDraws] = useState([]);
    const [selectedTool, setSelectedTool] = useState("select");
    const [brushColor, setBrushColor] = useState("#ff0000");
    const [brushSize, setBrushSize] = useState(3);
    const [zoom, setZoom] = useState(1);
    const [undoStack, setUndoStack] = useState([]);
    const [redoStack, setRedoStack] = useState([]);

    const saveState = () => {
        setUndoStack(prev => [...prev, {images: [...images], draws: [...draws]}]);
        setRedoStack([]);
    };

    const undo = () => {
        if (undoStack.length === 0) return;
        const previousState = undoStack[undoStack.length - 1];
        setRedoStack(prev => [...prev, {images: [...images], draws: [...draws]}]);
        setUndoStack(prev => prev.slice(0, -1));
        setImages(previousState.images);
        setDraws(previousState.draws);
    };

    const redo = () => {
        if (redoStack.length === 0) return;
        const nextState = redoStack[redoStack.length - 1];
        setUndoStack(prev => [...prev, {images: [...images], draws: [...draws]}]);
        setRedoStack(prev => prev.slice(0, -1));
        setImages(nextState.images);
        setDraws(nextState.draws);
    };

    const handleImageAdd = (newImage) => {
        saveState();
        setImages(prev => [...prev, newImage]);
    };

    const handleDrawAdd = (newDraw) => {
        setDraws(prev => [...prev, newDraw]);
    };

    const zoomIn = () => setZoom(prev => Math.min(prev * 1.2, 3));
    const zoomOut = () => setZoom(prev => Math.max(prev / 1.2, 0.1));
    const resetZoom = () => setZoom(1);

    return (
        <div className="editor-layout">
            <div className="topbar">
                <Toolbar
                    selectedTool={selectedTool}
                    setSelectedTool={setSelectedTool}
                    onImageAdd={handleImageAdd}
                    brushColor={brushColor}
                    setBrushColor={setBrushColor}
                    zoom={zoom}
                    onZoomIn={zoomIn}
                    onZoomOut={zoomOut}
                    onResetZoom={resetZoom}
                    onUndo={undo}
                    onRedo={redo}
                />
            </div>
            <div className="bottom-bar">
                <div className="left-sidebar">
                    <Sidebar
                        currentTool={selectedTool}
                        setTool={setSelectedTool}
                        brushColor={brushColor}
                        setBrushColor={setBrushColor}
                        brushSize={brushSize}
                        setBrushSize={setBrushSize}
                        onUndo={undo}
                        onRedo={redo}
                        onResetView={resetZoom}
                    />
                </div>
                <div className="canvas-area">
                    <CanvasLayer
                        images={images}
                        setImages={setImages}
                        draws={draws}
                        setDraws={setDraws}
                        selectedTool={selectedTool}
                        brushColor={brushColor}
                        brushSize={brushSize}
                        zoom={zoom}
                        onDrawAdd={handleDrawAdd}
                        onStateChange={saveState}
                    />
                </div>
            </div>
        </div>
    );
};
