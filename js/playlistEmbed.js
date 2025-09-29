// Playlist Embed System
// Creates Discord-style embeds for Spotify playlist links

// Default playlist data for the specific playlist
const defaultPlaylistData = {
  name: "Gabriele's Playlist",
  description: "My personal music collection",
  owner: "Gabriele Bisceglie",
  image: "https://i.scdn.co/image/ab67616d0000b273a048415db06a5b6fa7ec4e1a",
  tracks: 42,
  followers: 25,
  url: "https://open.spotify.com/playlist/5zTi5sHugwqPp9gnlVMRiJ?si=f62320ccade845bd"
};

function createDiscordEmbed(playlistData) {
  return `
    <div class="discord-embed">
      <div class="embed-color-bar"></div>
      <div class="embed-content">
        <div class="embed-header">
          <div class="spotify-icon">
            <i class="fab fa-spotify"></i>
          </div>
          <div class="provider-info">
            <span class="provider-name">Spotify</span>
            <span class="embed-type">Playlist</span>
          </div>
        </div>
        
        <div class="embed-body">
          <div class="embed-thumbnail">
            <img src="${playlistData.image}" alt="Playlist Cover" onerror="this.src='data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><rect width=%22100%22 height=%22100%22 fill=%22%23333%22/><text x=%2250%22 y=%2250%22 text-anchor=%22middle%22 dy=%22.3em%22 fill=%22%23fff%22 font-size=%2212%22>♪</text></svg>'">
          </div>
          
          <div class="embed-info">
            <h3 class="embed-title">${playlistData.name}</h3>
            <p class="embed-description">${playlistData.description || 'No description available'}</p>
            
            <div class="embed-fields">
              <div class="embed-field">
                <span class="field-name">Created by</span>
                <span class="field-value">${playlistData.owner}</span>
              </div>
              <div class="embed-field">
                <span class="field-name">Songs</span>
                <span class="field-value">${playlistData.tracks} tracks</span>
              </div>
              <div class="embed-field">
                <span class="field-name">Followers</span>
                <span class="field-value">${playlistData.followers.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
        
        <div class="embed-footer">
          <a href="${playlistData.url}" target="_blank" class="embed-link">
            <i class="fas fa-external-link-alt"></i>
            Open in Spotify
          </a>
          <div class="embed-timestamp">
            <i class="far fa-clock"></i>
            Just now
          </div>
        </div>
      </div>
    </div>
  `;
}

function showLoadingEmbed() {
  return `
    <div class="discord-embed loading">
      <div class="embed-color-bar"></div>
      <div class="embed-content">
        <div class="embed-header">
          <div class="spotify-icon">
            <i class="fab fa-spotify"></i>
          </div>
          <div class="provider-info">
            <span class="provider-name">Spotify</span>
            <span class="embed-type">Loading...</span>
          </div>
        </div>
        
        <div class="embed-body">
          <div class="embed-thumbnail">
            <div class="loading-placeholder">
              <i class="fas fa-music"></i>
            </div>
          </div>
          
          <div class="embed-info">
            <div class="loading-text">
              <div class="loading-bar"></div>
              <div class="loading-bar short"></div>
              <div class="loading-bar medium"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}

// Auto-load default playlist when page loads
document.addEventListener('DOMContentLoaded', function() {
  console.log('Loading playlist embed...');
  loadDefaultPlaylist();
});

function loadDefaultPlaylist() {
  const embedContainer = document.getElementById('playlist-embed');
  
  if (!embedContainer) {
    console.error('Embed container not found!');
    return;
  }
  
  console.log('Found embed container, loading playlist...');
  
  // Show loading state briefly for smooth transition
  embedContainer.innerHTML = showLoadingEmbed();
  
  // Load the default playlist after a short delay
  setTimeout(() => {
    embedContainer.innerHTML = createDiscordEmbed(defaultPlaylistData);
    console.log('Playlist embed loaded successfully!');
  }, 800);
}