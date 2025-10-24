import {FaImage, FaSearchPlus, FaSearchMinus, FaPaintBrush} from "react-icons/fa";
import {ImCrop} from "react-icons/im";
import {BsFillAspectRatioFill} from "react-icons/bs";
import {RiResetRightLine} from "react-icons/ri";

import {useImageUpload} from "./hooks/useImageUpload.js";
import {useResize} from "./hooks/useResize.js";
import {Input} from "../../components/UI/input/Input.jsx";
import {Button} from "../../components/UI/button/Button.jsx";
import {IoArrowRedo, IoArrowUndo} from "react-icons/io5";

export const Toolbar = ({
    onImageAdd,
    onToggleCrop,
    onResize,
    isCropping,
    onToggleDrawing,
    isDrawingMode,
    brushSize,
    brushColor,
    setBrushSize,
    setBrushColor,
    zoom,
    onZoomIn,
    onZoomOut,
    onResetView,
    onZoomChange,
    onUndo,
    onRedo
}) => {
    const {fileRef, handleUpload, triggerFileInput} = useImageUpload(onImageAdd);
    const {
        showResize,
        width,
        height,
        lockAspect,
        aspectRatio,
        customRatio,
        setWidth,
        setHeight,
        setLockAspect,
        setAspectRatio,
        setCustomRatio,
        handleResizeSubmit,
        toggleResize
    } = useResize(onResize);

    return (
        <div className="tool-bar">
            <Input type="file" ref={fileRef} onChange={handleUpload} accept="image/*"/>
            <Button onClick={triggerFileInput} title="Upload Image" className="tool-btn">
                <FaImage size={20}/>
            </Button>

            <Button
                onClick={onToggleCrop}
                title={isCropping ? "Exit Crop Mode" : "Crop Image"}
                className={`tool-btn ${isCropping ? "active" : ""}`}
            >
                <ImCrop size={20}/>
            </Button>

            <Button
                onClick={toggleResize}
                title="Resize Image"
                className={`tool-btn ${showResize ? "active" : ""}`}
            >
                <BsFillAspectRatioFill size={20}/>
            </Button>

            <Button
                onClick={onToggleDrawing}
                title={isDrawingMode ? "Exit Drawing Mode" : "Draw on Canvas"}
                className={`tool-btn ${isDrawingMode ? "active" : ""}`}
            >
                <FaPaintBrush size={20}/>
            </Button>

            {isDrawingMode && (
                <div className="drawing-controls">
                    <label>
                        Brush Size:
                        <Input
                            type="range"
                            min="1"
                            max="50"
                            value={brushSize}
                            onChange={(e) => setBrushSize(Number(e.target.value))}
                        />
                    </label>

                    <label>
                        Color:
                        <Input
                            type="color"
                            value={brushColor}
                            onChange={(e) => setBrushColor(e.target.value)}
                        />
                    </label>
                </div>
            )}

            {showResize && (
                <div className="resize-modal">
                    <label>
                        Width:
                        <Input
                            type="number"
                            value={width}
                            onChange={(event) => setWidth(Number(event.target.value))}
                        />
                    </label>
                    <label>
                        Height:
                        <Input
                            type="number"
                            value={height}
                            onChange={(event) => setHeight(Number(event.target.value))}
                        />
                    </label>

                    <div className="aspect-controls">
                        <label>
                            <Input
                                type="checkbox"
                                checked={lockAspect}
                                onChange={() => setLockAspect(!lockAspect)}
                            />
                            Lock Aspect Ratio
                        </label>

                        <select
                            value={aspectRatio}
                            onChange={(event) => setAspectRatio(event.target.value)}
                            disabled={!lockAspect}
                        >
                            <option value="1:1">1:1 (Square)</option>
                            <option value="16:9">16:9 (Widescreen)</option>
                            <option value="4:3">4:3 (Standard)</option>
                            <option value="3:2">3:2 (Photo)</option>
                            <option value="custom">Custom</option>
                        </select>

                        {aspectRatio === "custom" && (
                            <Input
                                type="text"
                                placeholder="e.g. 5:4"
                                value={customRatio}
                                onChange={(event) => setCustomRatio(event.target.value)}
                                className="custom-input"
                            />
                        )}
                    </div>

                    <Button className="apply-btn" onClick={handleResizeSubmit}>
                        Apply
                    </Button>
                </div>
            )}

            <Button onClick={onUndo} title="Undo" className="tool-btn">
                <IoArrowUndo size={20}/>

            </Button>
            <Button onClick={onRedo} title="Redo" className="tool-btn">
                <IoArrowRedo size={20}/>
            </Button>

            <Button onClick={onZoomIn} title="Zoom In" className="tool-btn">
                <FaSearchPlus size={20}/>
            </Button>
            <Button onClick={onZoomOut} title="Zoom Out" className="tool-btn">
                <FaSearchMinus size={20}/>
            </Button>
            <Button onClick={onResetView} title="Reset View" className="tool-btn">
                <RiResetRightLine size={20}/>
            </Button>
            <label style={{color: "#fff", display: "flex", alignItems: "center", gap: "4px"}}>
                <Input
                    type="number"
                    min="0.2"
                    max="3"
                    step="0.1"
                    value={zoom}
                    onChange={(e) => onZoomChange(parseFloat(e.target.value))}
                    style={{width: "50px"}}
                />
            </label>
        </div>
    );
};
