export const getAssetsFile = (url) => {
    return new URL(`../../static/${url}`, import.meta.url).href
}

export const getAssetsFile2 = (url) => {
    return new URL(`../assets/images/${url}`, import.meta.url).href
}