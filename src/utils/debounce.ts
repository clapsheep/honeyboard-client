const debounce = <T>(callback: (arg: T) => void, duration: number) => {
    let timer: NodeJS.Timeout | undefined;
    return (arg: T) => {
        if (timer) {
            clearTimeout(timer);
        }
        timer = setTimeout(() => {
            callback(arg);
        }, duration);
    };
};

export default debounce;
