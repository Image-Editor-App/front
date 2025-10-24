import {useState, useRef, useCallback} from "react";

export const useCropHandlers = (canvasRef, images, setImages, setIsCropping) => {
    const [cropRect, setCropRect] = useState(null);
    const startPosRef = useRef(null);

    const handleMouseDown = useCallback((event) => {
        const rect = canvasRef.current.getBoundingClientRect();
        startPosRef.current = {
            x: event.clientX - rect.left,
            y: event.clientY - rect.top,
        };

        setCropRect({x: startPosRef.current.x, y: startPosRef.current.y, width: 0, height: 0});
    }, [canvasRef]);

    const handleMouseMove = useCallback((event) => {
        if (!startPosRef.current || !canvasRef.current) return;
        const rect = canvasRef.current.getBoundingClientRect();
        const currentX = event.clientX - rect.left;
        const currentY = event.clientY - rect.top;
        setCropRect({
            x: startPosRef.current.x,
            y: startPosRef.current.y,
            width: currentX - startPosRef.current.x,
            height: currentY - startPosRef.current.y,
        });
    }, [canvasRef]);

    const handleMouseUp = useCallback(() => {
        if (!cropRect || images.length === 0) return;

        const {x, y, width, height} = cropRect;
        const original = images[0];
        const canvas = canvasRef.current;

        const tempCanvas = document.createElement("canvas");
        tempCanvas.width = Math.abs(width);
        tempCanvas.height = Math.abs(height);
        const tempCtx = tempCanvas.getContext("2d");

        const img = new Image();
        img.src = original.src;
        img.onload = () => {
            tempCtx.drawImage(
                img,
                width < 0 ? x + width - original.x : x - original.x,
                height < 0 ? y + height - original.y : y - original.y,
                Math.abs(width),
                Math.abs(height),
                0,
                0,
                Math.abs(width),
                Math.abs(height)
            );

            const croppedImage = tempCanvas.toDataURL();

            const newWidth = Math.abs(width);
            const newHeight = Math.abs(height);
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight - 60;

            const newX = (canvas.width - newWidth) / 2;
            const newY = (canvas.height - newHeight) / 2;

            setImages([{src: croppedImage, x: newX, y: newY, width: newWidth, height: newHeight}]);
            setCropRect(null);
            setIsCropping(false);
            startPosRef.current = null;
        };
    }, [cropRect, images, canvasRef, setImages, setIsCropping]);

    return {
        cropRect,
        handleMouseDown,
        handleMouseMove,
        handleMouseUp
    };
};
