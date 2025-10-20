import { useState } from "react";

export const useUndoRedo = (initialState = { images: [], draws: [] }) => {
    const [state, setState] = useState(initialState);
    const [undoStack, setUndoStack] = useState([]);
    const [redoStack, setRedoStack] = useState([]);

    const saveState = (newState) => {
        setUndoStack(prev => [...prev, state]);
        setRedoStack([]);
        setState(newState);
    };

    const undo = () => {
        if (undoStack.length === 0) return state;
        const previousState = undoStack[undoStack.length - 1];
        setRedoStack(prev => [...prev, state]);
        setUndoStack(prev => prev.slice(0, -1));
        setState(previousState);
        return previousState;
    };

    const redo = () => {
        if (redoStack.length === 0) return state;
        const nextState = redoStack[redoStack.length - 1];
        setUndoStack(prev => [...prev, state]);
        setRedoStack(prev => prev.slice(0, -1));
        setState(nextState);
        return nextState;
    };

    return {
        state,
        setState: saveState,
        undo,
        redo,
        canUndo: undoStack.length > 0,
        canRedo: redoStack.length > 0
    };
};
