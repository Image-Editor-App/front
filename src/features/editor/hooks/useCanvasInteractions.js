import {useState} from "react";

export const useCanvasInteractions = ({
    selectedTool,
    brushColor,
    brushSize,
    onDrawAdd,
    setSelectedImageId
}) => {
    const [newLine, setNewLine] = useState(null);
    const [cropRect, setCropRect] = useState(null);

    const handleMouseDown = (e) => {
        const pos = e.target.getStage().getPointerPosition();

        if (selectedTool === "draw") {
            setNewLine({
                points: [pos.x, pos.y],
                stroke: brushColor,
                strokeWidth: brushSize,
            });
        } else if (selectedTool === "crop") {
            setCropRect({x: pos.x, y: pos.y, width: 0, height: 0});
        } else if (selectedTool === "select") {
            const clickedOn = e.target.findAncestor("Image");
            setSelectedImageId(clickedOn ? clickedOn.id() : null);
        }
    };

    const handleMouseMove = (e) => {
        const pos = e.target.getStage().getPointerPosition();

        if (selectedTool === "draw" && newLine) {
            setNewLine({
                ...newLine,
                points: [...newLine.points, pos.x, pos.y],
            });
        } else if (selectedTool === "crop" && cropRect) {
            setCropRect({
                ...cropRect,
                width: pos.x - cropRect.x,
                height: pos.y - cropRect.y,
            });
        }
    };

    const handleMouseUp = () => {
        if (selectedTool === "draw" && newLine) {
            onDrawAdd(newLine);
            setNewLine(null);
        } else if (selectedTool === "crop" && cropRect) {
            console.log("Crop area:", cropRect);
            setCropRect(null);
        }
    };

    return {
        newLine,
        cropRect,
        handleMouseDown,
        handleMouseMove,
        handleMouseUp
    };
};
