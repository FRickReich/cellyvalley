const images = [
    "https://static.wikia.nocookie.net/disney/images/2/27/Goofy_transparent.png",
    "https://static.wikia.nocookie.net/disney/images/d/db/Donald_Duck_Iconic.png",
    "https://static.wikia.nocookie.net/disney/images/b/bf/Mickey_Mouse_Disney_1.png",
    "https://static.wikia.nocookie.net/disney/images/3/36/Minnie_Mouse_pose_.jpg",
    "https://static.wikia.nocookie.net/disney/images/0/0a/Scrooge_McDuck.jpeg",
    "https://static.wikia.nocookie.net/disney/images/6/67/Daisy_Duck_transparent.png",
    "https://static.wikia.nocookie.net/disney/images/4/43/Huey_Dewey_Louie_artwork.jpg"
];

export const getRandomImage = () => {
    return images[(Math.random() * images.length) | 0]
}
