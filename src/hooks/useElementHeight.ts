import { useLayoutEffect, useState, useRef } from 'react';

export const useElementHeight = () => {
    const elementRef = useRef<HTMLElement | null>(null);
    const [height, setHeight] = useState<number>(0);

    useLayoutEffect(() => {
        if (!elementRef.current) return;

        const element = elementRef.current;
        const resizeObserver = new ResizeObserver((entries) => {
            const newHeight = entries[0]?.contentRect.height ?? 0;
            setHeight(newHeight);
        });

        resizeObserver.observe(element);

        return () => resizeObserver.disconnect();
    }, []);

    return { elementRef, height: height + 50 };
};
