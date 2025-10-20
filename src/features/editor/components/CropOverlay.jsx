import { Rect } from "react-konva";

export const CropOverlay = ({ rect }) => {
    if (!rect) return null;

    return (
        <Rect
            x={rect.x}
            y={rect.y}
            width={rect.width}
            height={rect.height}
            stroke="blue"
            strokeWidth={2}
            dash={[5, 5]}
            fill="rgba(0,0,255,0.1)"
        />
    );
};
