// Spotify Top 5 Tracks
// Retrieves user's top 5 most played tracks from Spotify API

// Authorization token that must have been created previously. See : https://developer.spotify.com/documentation/web-api/concepts/authorization
const token = 'BQABHzSnHrANsnFxsJm_x9erFpXM9oQG3DeMB3-nzJhRh0pKaxYCpW2bsr6VgBp5YWSeExUwYuMJv11a-cnRNp4dFTHnO58VUe7EciB1ju5nba56F2pD-ntahZBXDenDZzkYNyL2ZpFZDdG5pINrwt5jy7UQ6CunmoLHfqeqD22DEQFbmVNiwjCla3TEBj_OyS35ri-D3ia-hIqqfGXRVbe5pgD65WiurVyWl8wnIL4_BbB-Mm0n1zQ9IXo74ZI3yYTpeCVcasQvq5Km_E7giEX0As8rzSN-2oAKii46ThasZsNkSNtzO-OJxgQB';

async function fetchWebApi(endpoint, method, body) {
  const res = await fetch(`https://api.spotify.com/${endpoint}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    method,
    body:JSON.stringify(body)
  });
  return await res.json();
}

async function getTopTracks(){
  // Endpoint reference : https://developer.spotify.com/documentation/web-api/reference/get-users-top-artists-and-tracks
  return (await fetchWebApi(
    'v1/me/top/tracks?time_range=long_term&limit=5', 'GET'
  )).items;
}

async function displayTopTracks() {
  try {
    const topTracks = await getTopTracks();
    const tracksContainer = document.getElementById('spotify-tracks');
    
    if (topTracks && topTracks.length > 0) {
      const tracksList = topTracks.map(
        ({name, artists, duration_ms}, index) => {
          const duration = formatDuration(duration_ms);
          const artistNames = artists.map(artist => artist.name).join(', ');
          
          return `<div class="track-item">
            <span class="track-number">${index + 1}</span>
            <div class="track-info">
              <div class="track-title">${name}</div>
              <div class="track-artist">${artistNames}</div>
            </div>
            <span class="track-duration">${duration}</span>
          </div>`;
        }
      ).join('');
      
      tracksContainer.innerHTML = tracksList;
    } else {
      tracksContainer.innerHTML = `
        <div class="loading-track">
          <p style="color: rgba(255,255,255,0.7);">Unable to load tracks. Please check your Spotify authorization.</p>
        </div>
      `;
    }
  } catch (error) {
    console.error('Error fetching top tracks:', error);
    document.getElementById('spotify-tracks').innerHTML = `
      <div class="loading-track">
        <p style="color: rgba(255,255,255,0.7);">Error loading tracks. Please try again later.</p>
      </div>
    `;
  }
}

// Helper function to format duration from milliseconds to mm:ss
function formatDuration(ms) {
  if (!ms) return '0:00';
  const minutes = Math.floor(ms / 60000);
  const seconds = Math.floor((ms % 60000) / 1000);
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

// Load top tracks when the page is ready
document.addEventListener('DOMContentLoaded', displayTopTracks);