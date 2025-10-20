import { Stage, Layer } from "react-konva";
import { useRef, useState } from "react";
import { URLImage } from "./components/ImageRenderer";
import { DrawingRenderer } from "./components/DrawingRenderer";
import { CropOverlay } from "./components/CropOverlay";
import { useCanvasInteractions } from "./hooks/useCanvasInteractions";
import { useCrop } from "./hooks/useCrop";
import { useAspectRatio } from "./hooks/useAspectRatio";

export const CanvasLayer = ({
    images,
    setImages,
    draws,
    selectedTool,
    brushColor,
    brushSize,
    zoom,
    onDrawAdd,
    onStateChange
}) => {
    const stageRef = useRef();
    const [selectedImageId, setSelectedImageId] = useState(null);

    const { aspectRatioLock, setAspectRatioLock, maintainAspectRatio } = useAspectRatio();
    const { cropRect, isCropping, startCrop, updateCrop, completeCrop, cancelCrop } = useCrop();

    const {
        newLine,
        handleMouseDown,
        handleMouseMove,
        handleMouseUp
    } = useCanvasInteractions({
        selectedTool,
        brushColor,
        brushSize,
        onDrawAdd,
        setSelectedImageId,
        startCrop,
        updateCrop,
        isCropping
    });

    const handleMouseUpWithCrop = (e) => {
        handleMouseUp(e);

        if (selectedTool === "crop" && isCropping) {
            const cropData = completeCrop();
            if (cropData && selectedImageId) {
                applyCropToImage(cropData);
            }
        }
    };

    const applyCropToImage = (cropData) => {
        const imageIndex = parseInt(selectedImageId.split('-')[1]);
        const image = images[imageIndex];

        const newImages = [...images];
        newImages[imageIndex] = {
            ...image,
            crop: cropData,
            x: cropData.x,
            y: cropData.y,
            width: Math.abs(cropData.width),
            height: Math.abs(cropData.height)
        };

        setImages(newImages);
        onStateChange();
        cancelCrop();
    };

    const handleImageTransform = (index, newAttrs) => {
        const newImages = [...images];
        const originalImage = newImages[index];

        if (aspectRatioLock && originalImage) {
            const maintainedSize = maintainAspectRatio(
                newAttrs.width,
                newAttrs.height,
                originalImage.width,
                originalImage.height
            );
            newAttrs = { ...newAttrs, ...maintainedSize };
        }

        newImages[index] = { ...originalImage, ...newAttrs };
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
                onMouseUp={handleMouseUpWithCrop}
            >
                <Layer>
                    {images.map((img, i) => (
                        <URLImage
                            key={`image-${i}`}
                            image={img}
                            isSelected={selectedImageId === `image-${i}`}
                            onSelect={() => setSelectedImageId(`image-${i}`)}
                            onTransform={(attrs) => handleImageTransform(i, attrs)}
                            aspectRatioLock={aspectRatioLock}
                            id={`image-${i}`}
                        />
                    ))}
                    <DrawingRenderer
                        draws={draws}
                        newLine={newLine}
                    />
                    {isCropping && <CropOverlay rect={cropRect} />}
                </Layer>
            </Stage>
        </div>
    );
};
