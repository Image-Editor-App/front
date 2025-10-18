export const Sidebar = (
    {
        currentTool,
        setTool,
        brushColor,
        setBrushColor,
        brushSize,
        setBrushSize,
        onUndo,
        onRedo,
        onResetView,
    }
) => {
    return (
        <div className="sidebar">
            <h3>Tools</h3>
            <button
                className={currentTool === "select" ? "active" : ""}
                onClick={() => setTool("select")}
            >
                Select/Crop
            </button>
            <button
                className={currentTool === "resize" ? "active" : ""}
                onClick={() => setTool("resize")}
            >
                Resize
            </button>
            <button
                className={currentTool === "draw" ? "active" : ""}
                onClick={() => setTool("draw")}
            >
                Draw
            </button>
            {currentTool === "draw" && (
                <div className="draw-settings">
                    <label>
                        Brush Color:
                        <input
                            type="color"
                            value={brushColor}
                            onChange={(e) => setBrushColor(e.target.value)}
                        />
                    </label>
                    <label>
                        Brush Size:
                        <input
                            type="range"
                            min="1"
                            max="50"
                            value={brushSize}
                            onChange={(e) => setBrushSize(parseInt(e.target.value))}
                        />
                    </label>
                </div>
            )}
            <h3>History</h3>
            <button onClick={onUndo}>Undo</button>
            <button onClick={onRedo}>Redo</button>
            <h3>View</h3>
            <button onClick={onResetView}>Reset View</button>
        </div>
    );
};
