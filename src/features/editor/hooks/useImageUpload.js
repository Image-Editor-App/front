import {useRef} from "react";

export const useImageUpload = (onImageAdd) => {
    const fileRef = useRef();

    const handleUpload = (event) => {
        const file = event.target.files[0];
        if (!file) return;

        const reader = new FileReader();

        reader.onload = (event) => {
            const src = event.target.result;
            onImageAdd({src});
        };
        reader.readAsDataURL(file);
    };

    const triggerFileInput = () => {
        fileRef.current?.click();
    };

    return {
        fileRef,
        handleUpload,
        triggerFileInput
    };
};
