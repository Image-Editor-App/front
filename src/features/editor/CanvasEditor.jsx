import {useState} from "react";
import {useSelector} from "react-redux";
import {Toolbar} from "./Toolbar";
import {CanvasLayer} from "./CanvasLayer";
import {useUndoRedo} from "./hooks/useUndoRedo";
import {useDrawing} from "./hooks/useDrawing";
import {useZoom} from "./hooks/useZoom";
import "./CanvasEditor.css";

export const CanvasEditor = () => {
    const [images, setImages] = useState([]);
    const [selectedTool, setSelectedTool] = useState("select");

    const {state: editorState, setState: setEditorState, undo, redo} = useUndoRedo();
    const {draws, brushColor, brushSize, setBrushColor, setBrushSize, addDraw} = useDrawing();
    const {zoom, zoomIn, zoomOut, resetZoom} = useZoom();

    const {processedImage} = useSelector(state => state.image);

    const handleImageAdd = (newImage) => {
        const newImages = [...images, newImage];
        setImages(newImages);
        setEditorState({images: newImages, draws});
    };

    const handleDrawAdd = (newDraw) => {
        addDraw(newDraw);
        setEditorState({images, draws: [...draws, newDraw]});
    };

    const handleImagesUpdate = (newImages) => {
        setImages(newImages);
        setEditorState({images: newImages, draws});
    };

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
            <div className="canvas-area">
                <CanvasLayer
                    images={images}
                    setImages={handleImagesUpdate}
                    draws={draws}
                    selectedTool={selectedTool}
                    brushColor={brushColor}
                    brushSize={brushSize}
                    zoom={zoom}
                    onDrawAdd={handleDrawAdd}
                />
                {processedImage && (
                    <div className="processing-notice">
                        Background removed successfully!
                    </div>
                )}
            </div>
        </div>
    );
};
