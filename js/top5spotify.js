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
        ({name, artists}, index) =>
          `<div class="track-item">
            <span class="track-number">${index + 1}.</span>
            <span class="track-info">${name} by ${artists.map(artist => artist.name).join(', ')}</span>
          </div>`
      ).join('');
      
      tracksContainer.innerHTML = tracksList;
    } else {
      tracksContainer.innerHTML = '<p>Unable to load tracks. Please check your Spotify authorization.</p>';
    }
  } catch (error) {
    console.error('Error fetching top tracks:', error);
    document.getElementById('spotify-tracks').innerHTML = '<p>Error loading tracks. Please try again later.</p>';
  }
}

// Load top tracks when the page is ready
document.addEventListener('DOMContentLoaded', displayTopTracks);