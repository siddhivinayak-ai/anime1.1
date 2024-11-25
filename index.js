const BASE_URL = 'https://graphql.anilist.co';

// Fetch and display data
async function fetchData(query, variables, containerId) {
  try {
    const response = await fetch(BASE_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query, variables }),
    });

    const data = await response.json();
    displayAnime(data.data.Page.media, containerId);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

// Display Anime Cards
function displayAnime(animeList, containerId) {
  const container = document.getElementById(containerId);
  container.innerHTML = ''; // Clear previous content
  animeList.forEach(anime => {
    const animeCard = document.createElement('div');
    animeCard.classList.add('anime-card');
    animeCard.innerHTML = `
      <img src="${anime.coverImage.large}" alt="${anime.title.romaji}">
      <p>${anime.title.romaji}</p>
    `;
    container.appendChild(animeCard);
  });
}

// Queries for AniList API
const topAnimeQuery = `
  query ($page: Int, $perPage: Int) {
    Page(page: $page, perPage: $perPage) {
      media(type: ANIME, sort: POPULARITY_DESC) {
        id
        title {
          romaji
        }
        coverImage {
          large
        }
      }
    }
  }
`;

const upcomingAnimeQuery = `
  query ($page: Int, $perPage: Int) {
    Page(page: $page, perPage: $perPage) {
      media(type: ANIME, season: WINTER, seasonYear: 2024) {
        id
        title {
          romaji
        }
        coverImage {
          large
        }
      }
    }
  }
`;

const movieAnimeQuery = `
  query ($page: Int, $perPage: Int) {
    Page(page: $page, perPage: $perPage) {
      media(type: ANIME, format: MOVIE) {
        id
        title {
          romaji
        }
        coverImage {
          large
        }
      }
    }
  }
`;

const trendingAnimeQuery=`
query ($page: Int, $perPage: Int) {
  Page(page: $page, perPage: $perPage) {
    media(type: ANIME, sort: TRENDING_DESC) {
      id
      title {
        romaji
      }
      coverImage {
        large
      }
    }
  }
}
`;





// Fetch Data for Top Anime
fetchData(topAnimeQuery, { page: 1, perPage: 10 }, 'top-anime');

// Fetch Data for Upcoming Anime
fetchData(upcomingAnimeQuery, { page: 1, perPage: 10 }, 'upcoming-anime');

// Fetch Data for Anime Movies
fetchData(movieAnimeQuery, { page: 1, perPage: 10 }, 'anime-movies');

fetchData(trendingAnimeQuery, { page: 1, perPage: 10 }, 'trending-anime');


















const genreQuery = `
  query ($page: Int, $perPage: Int, $genre: String) {
    Page(page: $page, perPage: $perPage) {
      media(type: ANIME, genre_in: [$genre], sort: POPULARITY_DESC) {
        id
        title {
          romaji
        }
        coverImage {
          large
        }
      }
    }
  }
`;



// Fetch Anime by Genre
async function fetchAnimeByGenre(genre) {
  const variables = {
    page: 1,
    perPage: 10,
    genre: genre,
  };

  try {
    const response = await fetch(BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: genreQuery,
        variables: variables,
      }),
    });

    const data = await response.json();
    displayAnimeByGenre(data.data.Page.media, 'popular-genre-anime');
  } catch (error) {
    console.error('Error fetching anime by genre:', error);
  }
}

// Display Anime Cards by Genre
function displayAnimeByGenre(animeList, containerId) {
  const container = document.getElementById(containerId);
  container.innerHTML = ''; // Clear previous results
  animeList.forEach((anime) => {
    const animeCard = document.createElement('div');
    animeCard.classList.add('anime-card');
    animeCard.innerHTML = `
      <img src="${anime.coverImage.large}" alt="${anime.title.romaji}">
      <p>${anime.title.romaji}</p>
    `;
    container.appendChild(animeCard);
  });
}

// Genre Selection Listener
document.getElementById('genre-select').addEventListener('change', (event) => {
  const selectedGenre = event.target.value;
  fetchAnimeByGenre(selectedGenre);
});

// Fetch Default Genre (e.g., Action) on Page Load
window.addEventListener('load', () => {
  fetchAnimeByGenre('Action');
});





















// // Local trailer videos (update these paths with your actual video file locations)
// const trailers = [
//   {
//     video: 'JUMANJI- WELCOME TO THE JUNGLE - Official Trailer (HD)_HD.mp4', // Path to the first trailer
//     title: 'Attack on Titan',
//     description: 'The war between humans and titans begins!',
//     image: 'images/banner1.jpg' // Fallback image
//   },
//   {
//     video: 'Marvel Studios’ Secret Invasion _ Official Trailer _ Disney+_HD.mp4', // Path to the second trailer
//     title: 'My Hero Academia',
//     description: 'Follow the journey of Izuku Midoriya, the greatest hero!',
//     image: 'images/banner2.jpg' // Fallback image
//   },
//   {
//     video: 'Mission- Impossible – Dead Reckoning Part One _ Official Trailer (2023 Movie) - _HD.mp4', // Path to the third trailer
//     title: 'Demon Slayer',
//     description: 'The adventure to save Nezuko and fight demons continues.',
//     image: 'images/banner3.jpg'
//   }
// ];






// let currentTrailerIndex = 0;

// // Function to display a trailer in the banner
// function displayBanner() {
//   const banner = document.getElementById('banner');
//   const video = document.getElementById('banner-video');
//   const trailerSource = document.getElementById('banner-trailer');

//   // Get the current trailer
//   const currentTrailer = trailers[currentTrailerIndex];

//   // Set video and fallback image
//   if (currentTrailer.video) {
//     video.style.display = 'block';
//     trailerSource.src = currentTrailer.video;
//     video.load();
//     video.play();
//   } else {
//     video.style.display = 'none';
//     banner.style.backgroundImage = `url(${currentTrailer.image})`;
//   }

//   // Set text content
//   document.getElementById('banner-title').textContent = currentTrailer.title;
//   document.getElementById('banner-description').textContent = currentTrailer.description;

//   // Update the index for the next trailer
//   currentTrailerIndex = (currentTrailerIndex + 1) % trailers.length;
// }

// // Automatically switch banners every 10 seconds
// setInterval(displayBanner, 20000);

// // Initial banner setup
// document.addEventListener('DOMContentLoaded', () => {
//   displayBanner();
// });












// Trailer data with fallback images
const trailers = [
  {
    image: 'https://img.freepik.com/free-photo/full-shot-ninja-wearing-equipment_23-2150960967.jpg?ga=GA1.1.598515694.1706235890&semt=ais_hybrid', // Add image URL here
    title: 'Naruto',
    description: 'The journey of Naruto Uzumaki, a young ninja with a dream of becoming the strongest Hokage.'
  },
  {
    image: 'https://img.freepik.com/free-photo/medium-shot-anime-style-man-portrait_23-2151067482.jpg?ga=GA1.1.598515694.1706235890&semt=ais_hybrid', // Add image URL here
    title: 'One Piece',
    description: 'Follow Monkey D. Luffy and his crew as they search for the ultimate treasure, the One Piece, in a world of pirates and adventure.'
  },
  {
    image: 'https://img.freepik.com/free-vector/realistic-samurai-illustrated-background_52683-69457.jpg?ga=GA1.1.598515694.1706235890&semt=ais_hybrid', // Add image URL here
    title: 'Dragon Ball Z',
    description: 'Goku and his allies fight powerful foes to protect Earth, from the Saiyan Saga to the epic battle against Majin Buu.'
  },
  {
    image: 'https://img.freepik.com/free-vector/conceptual-art-representing-quiet-mind-chaos-vector-illustration_1196-897.jpg?ga=GA1.1.598515694.1706235890&semt=ais_hybrid', // Add image URL here
    title: 'Fullmetal Alchemist: Brotherhood',
    description: 'Two brothers use alchemy to search for the Philosopher’s Stone in order to restore their bodies, encountering dark secrets along the way.'
  },
  {
    image: 'https://img.freepik.com/free-photo/medium-shot-ninja-wearing-equipment_23-2150960876.jpg?ga=GA1.1.598515694.1706235890&semt=ais_hybrid', // Add image URL here
    title: 'Attack on Titan',
    description: 'Humanity fights for survival as giant humanoid creatures known as Titans threaten to consume all of mankind.'
  },
  {
    image: 'https://img.freepik.com/free-photo/anime-style-group-boys-spending-time-together-enjoying-their-friendship_23-2151479345.jpg?ga=GA1.1.598515694.1706235890&semt=ais_hybrid', // Add image URL here
    title: 'My Hero Academia',
    description: 'In a world where almost everyone has a superpower, a young boy with no powers strives to become the greatest hero.'
  },
  {
    image: 'https://img.freepik.com/free-photo/black-white-illustration-man-with-short-hair-black-white-face_188544-12868.jpg?ga=GA1.1.598515694.1706235890&semt=ais_hybrid', // Add image URL here
    title: 'Death Note',
    description: 'A high school student discovers a mysterious notebook that grants him the power to kill anyone whose name he writes in it.'
  },
  {
    image: 'https://img.freepik.com/free-vector/flat-design-samurai-background_52683-70550.jpg?ga=GA1.1.598515694.1706235890&semt=ais_hybrid', // Add image URL here
    title: 'Demon Slayer',
    description: 'Tanjiro Kamado becomes a demon slayer to avenge his family and save his sister from a demonic curse.'
  },
  {
    image: 'https://img.freepik.com/free-photo/halloween-scene-illustration-anime-style_23-2151794286.jpg?ga=GA1.1.598515694.1706235890&semt=ais_hybrid', // Add image URL here
    title: 'Tokyo Ghoul',
    description: 'A young man is transformed into a half-ghoul after a deadly encounter, struggling to maintain his humanity while navigating the world of flesh-eating ghouls.'
  },
  {
    image: 'https://img.freepik.com/free-vector/flat-samurai-background-illustrated_23-2149070191.jpg?ga=GA1.1.598515694.1706235890&semt=ais_hybrid', // Add image URL here
    title: 'Sword Art Online',
    description: 'Players of a virtual reality MMORPG must fight to escape after being trapped in the game by its creator.'
  },
  {
    image: 'https://img.freepik.com/premium-photo/cyberpunk-woman-dress-silhouetted-against-city-night-ultraviolet-neon-skyscrapers-background_710696-251.jpg?ga=GA1.1.598515694.1706235890&semt=ais_hybrid', // Add image URL here
    title: 'Neon Genesis Evangelion',
    description: 'A group of teenagers must pilot giant mechas to protect Earth from mysterious beings known as Angels in a post-apocalyptic world.'
  },
  {
    image: 'https://img.freepik.com/free-photo/portrait-cartoon-sports-team_23-2151756248.jpg?ga=GA1.1.598515694.1706235890&semt=ais_hybrid', // Add image URL here
    title: 'One Punch Man',
    description: 'Saitama, a hero who can defeat any opponent with a single punch, searches for a worthy adversary while dealing with the monotony of his overwhelming strength.'
  },
  {
    image: 'https://img.freepik.com/premium-photo/animestyle-illustration-handsome-muscular-blonde-man-with-wide-cheekbones-european-face-standing-alone-vast-desert-landscape_894218-38119.jpg?ga=GA1.1.598515694.1706235890&semt=ais_hybrid', // Add image URL here
    title: 'Cowboy Bebop',
    description: 'A group of intergalactic bounty hunters navigate a dystopian future in this stylish and philosophical anime.'
  },
  {
    image: 'https://img.freepik.com/free-photo/cute-anime-fairy-girl_23-2151567480.jpg?ga=GA1.1.598515694.1706235890&semt=ais_hybrid', // Add image URL here
    title: 'Fairy Tail',
    description: 'The story of the Fairy Tail guild and its members as they embark on magical adventures and face dangerous foes.'
  },

]


let currentTrailerIndex = 0;

// Function to display a trailer image in the banner
function displayBanner() {
  const banner = document.getElementById('banner');

  // Get the current trailer
  const currentTrailer = trailers[currentTrailerIndex];

  // Set banner background image
  banner.style.backgroundImage = `url(${currentTrailer.image})`;

  // Set text content
  document.getElementById('banner-title').textContent = currentTrailer.title;
  document.getElementById('banner-description').textContent = currentTrailer.description;

  // Update the index for the next trailer
  currentTrailerIndex = (currentTrailerIndex + 1) % trailers.length;
}

// Automatically switch banners every 20 seconds
setInterval(displayBanner, 7000);

// Initial banner setup
document.addEventListener('DOMContentLoaded', () => {
  displayBanner();
});










