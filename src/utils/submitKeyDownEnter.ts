export const submitKeyDownEnter = (
    e: React.KeyboardEvent<HTMLInputElement>,
) => {
    if (e.key === 'Enter') {
        e.preventDefault();
        const submitButton = document.querySelector(
            'button[type="submit"]',
        ) as HTMLButtonElement;
        if (submitButton && !submitButton.disabled) {
            submitButton.click();
        }
    }
};
