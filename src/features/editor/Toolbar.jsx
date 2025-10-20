import { useRef, useState } from "react";
import { ChromePicker } from "react-color";
import { useRemoveBackgroundMutation } from "../../app/api/imageApi.js";
import { useDispatch, useSelector } from "react-redux";
import { setProcessing, setProcessedImage, setError } from "./imageSlice.js";

export const Toolbar = ({
    selectedTool,
    setSelectedTool,
    onImageAdd,
    brushColor,
    setBrushColor,
    brushSize,
    setBrushSize,
    zoom,
    onZoomIn,
    onZoomOut,
    onResetZoom,
    onUndo,
    onRedo,
    aspectRatioLock,
    setAspectRatioLock,
    isCropping = false,
    onApplyCrop = () => {},
    onCancelCrop = () => {},
}) => {
    const fileRef = useRef();
    const [showColorPicker, setShowColorPicker] = useState(false);
    const [showBrushControls, setShowBrushControls] = useState(false);
    const [removeBackground, { isLoading: isRemovingBackground }] = useRemoveBackgroundMutation();
    const dispatch = useDispatch();
    const { processing } = useSelector((state) => state.image);

    const handleUpload = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        if (file.size > 10 * 1024 * 1024) {
            alert("The image must not exceed 10 MB!");
            return;
        }

        const src = URL.createObjectURL(file);
        onImageAdd({ src, x: 50, y: 50, width: 400, height: 400, file });
    };

    const handleRemoveBackground = async () => {
        const fileInput = fileRef.current;
        if (!fileInput || !fileInput.files[0]) {
            alert("Please upload an image first");
            return;
        }

        const file = fileInput.files[0];

        try {
            dispatch(setProcessing(true));

            const formData = new FormData();
            formData.append("image", file);

            const processedImageUrl = await removeBackground(formData).unwrap();

            dispatch(setProcessedImage(processedImageUrl));

            onImageAdd({
                src: processedImageUrl,
                x: 50,
                y: 50,
                width: 400,
                height: 400,
                isProcessed: true,
            });

        } catch (error) {
            console.error("Background removal failed:", error);
            dispatch(setError("Background removal failed. Please try again."));
            alert("Background removal failed. Please try again.");
        } finally {
            dispatch(setProcessing(false));
        }
    };

    const handleToolSelect = (tool) => {
        setSelectedTool(tool);
        if (tool === "draw") {
            setShowBrushControls(true);
        } else {
            setShowBrushControls(false);
        }
    };

    return (
        <div className="toolbar">
            <div className="toolbar-section">
                <input
                    type="file"
                    ref={fileRef}
                    className="file-input"
                    onChange={handleUpload}
                    accept="image/*"
                />
                <button
                    className="toolbar-btn"
                    onClick={() => fileRef.current.click()}
                >
                    📁 Upload Image
                </button>

                <button
                    className={`toolbar-btn ${isRemovingBackground || processing ? "processing" : ""}`}
                    onClick={handleRemoveBackground}
                    disabled={isRemovingBackground || processing}
                >
                    {isRemovingBackground || processing ? "🔄 Removing Background..." : "✂️ Remove Background"}
                </button>
            </div>

            <div className="toolbar-section">
                <button
                    className={`toolbar-btn ${selectedTool === "select" ? "active" : ""}`}
                    onClick={() => handleToolSelect("select")}
                >
                    👆 Select
                </button>
                <button
                    className={`toolbar-btn ${selectedTool === "draw" ? "active" : ""}`}
                    onClick={() => handleToolSelect("draw")}
                >
                    ✏️ Draw
                </button>
                <button
                    className={`toolbar-btn ${selectedTool === "crop" ? "active" : ""}`}
                    onClick={() => handleToolSelect("crop")}
                >
                    🔲 Crop
                </button>
            </div>

            {showBrushControls && (
                <div className="toolbar-section brush-controls">
                    <div className="color-control">
                        <button
                            className="color-btn"
                            onClick={() => setShowColorPicker(!showColorPicker)}
                            style={{ backgroundColor: brushColor }}
                            title="Brush Color"
                        >
                            🎨
                        </button>
                        {showColorPicker && (
                            <div className="color-picker-popover">
                                <ChromePicker
                                    color={brushColor}
                                    onChange={(color) => setBrushColor(color.hex)}
                                />
                            </div>
                        )}
                    </div>

                    <div className="brush-size-control">
                        <label>Brush Size:</label>
                        <input
                            type="range"
                            min="1"
                            max="50"
                            value={brushSize}
                            onChange={(e) => setBrushSize(parseInt(e.target.value))}
                            className="brush-slider"
                        />
                        <span className="brush-size-value">{brushSize}px</span>
                    </div>
                </div>
            )}

            {selectedTool === "crop" && isCropping && (
                <div className="toolbar-section crop-actions">
                    <button className="toolbar-btn success" onClick={onApplyCrop}>
                        ✅ Apply Crop
                    </button>
                    <button className="toolbar-btn danger" onClick={onCancelCrop}>
                        ❌ Cancel
                    </button>
                </div>
            )}

            <div className="toolbar-section">
                <button
                    className={`toolbar-btn ${aspectRatioLock ? "active" : ""}`}
                    onClick={() => setAspectRatioLock(!aspectRatioLock)}
                    title="Maintain aspect ratio when resizing"
                >
                    {aspectRatioLock ? "🔒 Locked" : "🔓 Unlocked"}
                </button>
            </div>

            <div className="toolbar-section zoom-controls">
                <button className="toolbar-btn" onClick={onZoomOut} title="Zoom Out">
                    🔍-
                </button>
                <span className="zoom-display">{Math.round(zoom * 100)}%</span>
                <button className="toolbar-btn" onClick={onZoomIn} title="Zoom In">
                    🔍+
                </button>
                <button className="toolbar-btn" onClick={onResetZoom} title="Reset Zoom">
                    🔄 Reset
                </button>
            </div>

            <div className="toolbar-section history-controls">
                <button className="toolbar-btn" onClick={onUndo} title="Undo">
                    ↩️ Undo
                </button>
                <button className="toolbar-btn" onClick={onRedo} title="Redo">
                    ↪️ Redo
                </button>
            </div>
        </div>
    );
};
