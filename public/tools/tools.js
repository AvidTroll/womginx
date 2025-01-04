// List of games with their titles, folder names, and image paths
const games = [
    ["Windows Virtual Machine", "w10/index.html", "../images/tools/w10.webp"],
    ["Report a Issue", "suggest/problem.html", "../images/tools/report.png"],
    ["Suggest a Feature", "suggest/index.html", "../images/tools/suggest.png"],
];


// Get the container where game tiles should be added
const gamesGrid = document.getElementById("games-grid");

// Function to create game tiles dynamically
function generateGameTiles() {
    games.forEach(([title, folder, imgSrc]) => {
        // Create the game tile div
        const gameTile = document.createElement("div");
        gameTile.classList.add("game-tile");

        // Create the image element
        const img = document.createElement("img");
        img.src = imgSrc;
        img.alt = title;
        img.classList.add("game-image");

        // Create the title element
        const gameTitle = document.createElement("h2");
        gameTitle.classList.add("game-title");
        gameTitle.textContent = title;

        // Create the play button
        const playButton = document.createElement("button");
        playButton.classList.add("play-button");
        playButton.textContent = "Use Tool";
        playButton.onclick = () => {
            window.location.href = `../${folder}`;
        };

        // Append elements to the game tile
        gameTile.appendChild(img);
        gameTile.appendChild(gameTitle);
        gameTile.appendChild(playButton);

        // Append the game tile to the grid
        gamesGrid.appendChild(gameTile);
    });
}

// Call the function to generate tiles on page load
generateGameTiles();
