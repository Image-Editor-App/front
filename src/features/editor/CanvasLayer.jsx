import {Stage, Layer, Image as KonvaImage, Line, Rect, Transformer} from "react-konva";
import useImage from "use-image";
import {useState, useRef, useEffect} from "react";

export const CanvasLayer = (
    {
        images,
        setImages,
        draws,
        setDraws,
        selectedTool,
        brushColor,
        brushSize,
        zoom,
        onDrawAdd,
        onStateChange
    }
) => {
    const stageRef = useRef(null);
    const transformerRef = useRef(null);
    const [newLine, setNewLine] = useState(null);
    const [cropRect, setCropRect] = useState(null);
    const [selectedImageId, setSelectedImageId] = useState(null);

    useEffect(() => {
        if (selectedTool === "select" && transformerRef.current && selectedImageId !== null) {
            const selectedNode = stageRef.current.findOne(`#${selectedImageId}`);
            if (selectedNode) {
                transformerRef.current.nodes([selectedNode]);
                transformerRef.current.getLayer().batchDraw();
            }
        } else if (transformerRef.current) {
            transformerRef.current.nodes([]);
        }
    }, [selectedImageId, selectedTool]);

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
            if (clickedOn) {
                setSelectedImageId(clickedOn.id());
            } else {
                setSelectedImageId(null);
            }
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

    const handleImageTransform = (index, newAttrs) => {
        const newImages = [...images];
        newImages[index] = {...newImages[index], ...newAttrs};
        setImages(newImages);
    };

    return (
        <div className="canvas-container">
            <Stage
                className="main-canvas"
                ref={stageRef}
                width={window.innerWidth * 0.7}
                height={window.innerHeight - 60}
                scaleX={zoom}
                scaleY={zoom}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
            >
                <Layer>
                    {images.map((img, i) => (
                        <URLImage
                            key={i}
                            image={img}
                            isSelected={selectedImageId === `image-${i}`}
                            onSelect={() => setSelectedImageId(`image-${i}`)}
                            onTransform={(attrs) => handleImageTransform(i, attrs)}
                            id={`image-${i}`}
                        />
                    ))}
                    {draws.map((line, i) => (
                        <Line
                            key={i}
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
                    {selectedTool === "select" && (
                        <Transformer ref={transformerRef}/>
                    )}
                </Layer>
            </Stage>
        </div>
    );
};

const URLImage = ({image, isSelected, onSelect, onTransform, id}) => {
    const [img] = useImage(image.src);
    const imageRef = useRef();

    useEffect(() => {
        if (isSelected && imageRef.current) {
            onTransform({
                x: imageRef.current.x(),
                y: imageRef.current.y(),
                width: imageRef.current.width(),
                height: imageRef.current.height(),
            });
        }
    }, [isSelected, onTransform]);

    return (
        <KonvaImage
            id={id}
            ref={imageRef}
            image={img}
            x={image.x}
            y={image.y}
            width={image.width}
            height={image.height}
            draggable
            onClick={onSelect}
            onTap={onSelect}
            onDragEnd={(e) => {
                onTransform({
                    x: e.target.x(),
                    y: e.target.y(),
                });
            }}
            onTransformEnd={(e) => {
                const node = imageRef.current;
                onTransform({
                    x: node.x(),
                    y: node.y(),
                    width: node.width() * node.scaleX(),
                    height: node.height() * node.scaleY(),
                });
                node.scaleX(1);
                node.scaleY(1);
            }}
        />
    );
};
