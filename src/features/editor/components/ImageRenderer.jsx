import {Image as KonvaImage, Transformer} from "react-konva";
import useImage from "use-image";
import {useRef, useEffect} from "react";

export const URLImage = ({ image, isSelected, onSelect, onTransform, id }) => {
    const [img] = useImage(image.src);
    const imageRef = useRef();
    const transformerRef = useRef();

    useEffect(() => {
        if (isSelected && transformerRef.current && imageRef.current) {
            transformerRef.current.nodes([imageRef.current]);
            transformerRef.current.getLayer().batchDraw();
        } else if (transformerRef.current) {
            transformerRef.current.nodes([]);
        }
    }, [isSelected]);

    const x = Number(image.x) || 0;
    const y = Number(image.y) || 0;
    const width = Number(image.width) || 100;
    const height = Number(image.height) || 100;

    return (
        <>
            <KonvaImage
                id={id}
                ref={imageRef}
                image={img}
                x={x}
                y={y}
                width={width}
                height={height}
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
            {isSelected && (
                <Transformer
                    ref={transformerRef}
                    boundBoxFunc={(oldBox, newBox) => {
                        if (newBox.width < 5 || newBox.height < 5) {
                            return oldBox;
                        }
                        return newBox;
                    }}
                />
            )}
        </>
    );
};
