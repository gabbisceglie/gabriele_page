// Playlist Embed System
// Creates Discord-style embeds for Spotify playlist links

// Mock data for demonstration (in real implementation, you'd fetch from Spotify API)
const mockPlaylistData = {
  name: "My Awesome Playlist",
  description: "The best songs for coding and vibing",
  owner: "Gabriele Bisceglie",
  image: "https://i.scdn.co/image/ab67616d0000b273a048415db06a5b6fa7ec4e1a",
  tracks: 47,
  followers: 128,
  url: "https://open.spotify.com/playlist/37i9dQZF1DX0XUsuxWHRQd"
};

function extractPlaylistId(url) {
  // Extract playlist ID from various Spotify URL formats
  const patterns = [
    /open\.spotify\.com\/playlist\/([a-zA-Z0-9]+)/,
    /spotify:playlist:([a-zA-Z0-9]+)/
  ];
  
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) return match[1];
  }
  return null;
}

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

function showErrorEmbed(error) {
  return `
    <div class="discord-embed error">
      <div class="embed-color-bar error"></div>
      <div class="embed-content">
        <div class="embed-header">
          <div class="spotify-icon error">
            <i class="fas fa-exclamation-triangle"></i>
          </div>
          <div class="provider-info">
            <span class="provider-name error">Error</span>
            <span class="embed-type">Invalid Link</span>
          </div>
        </div>
        
        <div class="embed-body">
          <div class="embed-info">
            <h3 class="embed-title error">Unable to load playlist</h3>
            <p class="embed-description">${error}</p>
          </div>
        </div>
      </div>
    </div>
  `;
}

async function loadPlaylist(url) {
  const embedContainer = document.getElementById('playlist-embed');
  const playlistId = extractPlaylistId(url);
  
  if (!playlistId) {
    embedContainer.innerHTML = showErrorEmbed('Please enter a valid Spotify playlist URL');
    embedContainer.classList.remove('hidden');
    return;
  }
  
  // Show loading state
  embedContainer.innerHTML = showLoadingEmbed();
  embedContainer.classList.remove('hidden');
  
  // Simulate API call delay
  setTimeout(() => {
    try {
      // In a real implementation, you would fetch data from Spotify API here
      // For now, we'll use mock data
      const playlistData = {
        ...mockPlaylistData,
        url: url
      };
      
      embedContainer.innerHTML = createDiscordEmbed(playlistData);
    } catch (error) {
      embedContainer.innerHTML = showErrorEmbed('Failed to load playlist data');
    }
  }, 1500);
}

// Event listeners
document.addEventListener('DOMContentLoaded', () => {
  const urlInput = document.getElementById('playlist-url');
  const loadButton = document.getElementById('load-playlist');
  
  if (loadButton) {
    loadButton.addEventListener('click', () => {
      const url = urlInput.value.trim();
      if (url) {
        loadPlaylist(url);
      } else {
        const embedContainer = document.getElementById('playlist-embed');
        embedContainer.innerHTML = showErrorEmbed('Please enter a playlist URL');
        embedContainer.classList.remove('hidden');
      }
    });
  }
  
  if (urlInput) {
    urlInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        loadButton.click();
      }
    });
    
    // Auto-detect and load when a valid URL is pasted
    urlInput.addEventListener('paste', (e) => {
      setTimeout(() => {
        const url = e.target.value.trim();
        if (extractPlaylistId(url)) {
          setTimeout(() => loadPlaylist(url), 500);
        }
      }, 100);
    });
  }
});