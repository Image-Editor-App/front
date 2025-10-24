import {useRef, useEffect} from "react";

export const useCanvasDrawing = (canvasRef, images, cropRect, zoom = 1) => {
    const loadedImagesRef = useRef(new Map());

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        images.forEach(imgObj => {
            if (!loadedImagesRef.current.has(imgObj.src)) {
                const img = new Image();
                img.src = imgObj.src;
                loadedImagesRef.current.set(imgObj.src, img);
            }

            const img = loadedImagesRef.current.get(imgObj.src);
            if (img.complete) {
                ctx.drawImage(
                    img,
                    imgObj.x * zoom,
                    imgObj.y * zoom,
                    imgObj.width * zoom,
                    imgObj.height * zoom
                );
            } else {
                img.onload = () => {
                    ctx.drawImage(
                        img,
                        imgObj.x * zoom,
                        imgObj.y * zoom,
                        imgObj.width * zoom,
                        imgObj.height * zoom
                    );

                    if (cropRect) drawCropRect(ctx, cropRect, zoom);
                };
            }
        });

        if (cropRect) drawCropRect(ctx, cropRect, zoom);

    }, [images, cropRect, canvasRef, zoom]);

    const drawCropRect = (ctx, cropRect, zoom = 1) => {
        ctx.strokeStyle = "red";
        ctx.lineWidth = 2;
        ctx.setLineDash([6]);
        ctx.strokeRect(
            cropRect.x * zoom,
            cropRect.y * zoom,
            cropRect.width * zoom,
            cropRect.height * zoom
        );
        ctx.setLineDash([]);
    };
};
