import { useEffect } from 'react';

const keyHandler = (e) => {
    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
        e.preventDefault();
        const { index } = document.activeElement.dataset;
        const newFocus = index ? (e.key === "ArrowDown" ? Number(index) + 1 : Number(index) - 1) : 1;
        document.querySelector(`.search-results__list .list-item__container:nth-child(${newFocus}) .list-item__wrapper`)?.focus();
    }
}

export const useKeys = () => useEffect(() => {
    window.addEventListener("keydown", keyHandler);
    return () => {
        window.removeEventListener("keydown", keyHandler);
    };
});
