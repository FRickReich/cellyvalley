export const getRandomImage = (images) => {
    return images[(Math.random() * images.length) | 0]
}
