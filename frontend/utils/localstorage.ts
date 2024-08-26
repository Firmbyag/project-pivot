export const saveInLocalStorage = (key: string, value: string) => { 
    localStorage.setItem(key, value);
}

export const pickFromLocalStorage = (key: string) => {
    const item = localStorage.getItem(key);
    return item
}

export const removeFromLocalStorage = (key: string) => {
    localStorage.removeItem(key);
}