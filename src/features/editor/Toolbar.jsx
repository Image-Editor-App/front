import {useRef, useState} from "react";
import {ChromePicker} from "react-color";

export const Toolbar = (
    {
        isColorOnly = false,
        selectedTool,
        setSelectedTool,
        onImageAdd,
        brushColor,
        setBrushColor,
        zoom,
        onZoomIn,
        onZoomOut,
        onResetZoom,
        onUndo,
        onRedo,
    }
) => {
    const fileRef = useRef();
    const [showColorPicker, setShowColorPicker] = useState(false);

    const handleUpload = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        if (file.size > 10 * 1024 *1024) {
            alert("The image must not exceed 10 MB!");
            return;
        }

        const src = URL.createObjectURL(file);
        onImageAdd({src, x: 50, y: 50, width: 400, height: 400});
    };

    if (isColorOnly) {
        return (
            <div className="color-picker-area">
                <ChromePicker
                    color={brushColor}
                    onChange={(color) => setBrushColor(color.hex)}
                />
            </div>
        );
    }

    return (
        <div className="toolbar">
            <input
                type="file"
                ref={fileRef}
                className="file-input"
                onChange={handleUpload}
                accept="image/*"
            />
            <button onClick={() => fileRef.current.click()}>
                Upload Image
            </button>

            <button
                className={selectedTool === "select" ? "active" : ""}
                onClick={() => setSelectedTool("select")}
            >
                Select
            </button>
            <button
                className={selectedTool === "draw" ? "active" : ""}
                onClick={() => setSelectedTool("draw")}
            >
                Draw
            </button>
            <button
                className={selectedTool === "crop" ? "active" : ""}
                onClick={() => setSelectedTool("crop")}
            >
                Crop
            </button>

            <div className="zoom-controls">
                <button onClick={onZoomOut}>-</button>
                <span>{Math.round(zoom * 100)}%</span>
                <button onClick={onZoomIn}>+</button>
                <button onClick={onResetZoom}>Reset</button>
            </div>

            <div className="history-controls">
                <button onClick={onUndo}>Undo</button>
                <button onClick={onRedo}>Redo</button>
            </div>

            <div className="color-control">
                <button
                    onClick={() => setShowColorPicker(!showColorPicker)}
                    style={{backgroundColor: brushColor}}
                >
                    Color
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
        </div>
    );
};
