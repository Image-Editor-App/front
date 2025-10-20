import {Line, Rect} from "react-konva";

export const DrawingRenderer = ({draws, newLine, cropRect}) => {
    return (
        <>
            {draws.map((line, i) => (
                <Line
                    key={`draw-${i}`}
                    points={line.points}
                    stroke={line.stroke}
                    strokeWidth={line.strokeWidth}
                    tension={0.5}
                    lineCap="round"
                    lineJoin="round"
                />
            ))}
            {newLine && (
                <Line
                    points={newLine.points}
                    stroke={newLine.stroke}
                    strokeWidth={newLine.strokeWidth}
                    tension={0.5}
                    lineCap="round"
                    lineJoin="round"
                />
            )}
            {cropRect && (
                <Rect
                    x={cropRect.x}
                    y={cropRect.y}
                    width={cropRect.width}
                    height={cropRect.height}
                    stroke="blue"
                    strokeWidth={2}
                    dash={[5, 5]}
                />
            )}
        </>
    );
};
