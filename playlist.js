document.addEventListener('DOMContentLoaded', async () => {
    const genreList = document.getElementById('genre-list');
    const playlist = document.getElementById('playlist');
    const audioPlayer = document.getElementById('audio-player');

    // Fetch and display genres
    const genres = await fetch('/genres').then(res => res.json());
    genres.forEach(genre => {
        const genreItem = document.createElement('div');
        genreItem.textContent = genre.name;
        genreItem.classList.add('genre-item');
        genreItem.addEventListener('click', () => fetchPlaylist(genre.name));
        genreList.appendChild(genreItem);
    });

    // Fetch and display tracks
    async function fetchPlaylist(selectedGenre) {
        const tracks = await fetch(`/tracks?genre=${selectedGenre}`).then(res => res.json());
        playlist.innerHTML = '';  // Clear previous entries
        tracks.forEach(track => {
            const trackItem = document.createElement('div');
            trackItem.innerHTML = `
                <div class="track">
                    <img src="${track.coverImage}" alt="${track.title}">
                    <div class="track-info">
                        <h3>${track.title}</h3>
                        <p>${track.artist}</p>
                        <p>${track.duration}</p>
                    </div>
                    <button onclick="playMusic('${track.audioUrl}')">Play</button>
                </div>
            `;
            playlist.appendChild(trackItem);
        });
    }

    // Play music function
    window.playMusic = function(audioUrl) {
        audioPlayer.src = audioUrl;
        audioPlayer.play();
    };
});
