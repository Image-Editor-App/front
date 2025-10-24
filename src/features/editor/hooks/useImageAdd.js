import {useCallback} from "react";

export const useImageAdd = (canvasRef, setImages) => {
    return useCallback((newIMage) => {
        const image = new Image();
        image.src = newIMage.src;

        image.onload = () => {
            const canvas = canvasRef.current;

            if (!canvas) return;

            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;

            const x = (canvas.width - image.width) / 2;
            const y = (canvas.height - image.height) / 2;

            setImages([{
                src: newIMage.src,
                x,
                y,
                width: image.width,
                height: image.height

            }])
        }
    }, [canvasRef, setImages]);
}
