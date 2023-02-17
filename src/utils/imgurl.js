export const getAssetsFile = (url) => {
    return new URL(`../../static/${url}`, import.meta.url).href
}