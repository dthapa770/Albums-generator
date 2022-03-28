var album_container = document.querySelector('.album_container')


function search (){
    document.querySelector(".search-bar__input").addEventListener("click", function () {
        search_text = document.querySelector('search-bar__input').value
        console.log(search_text)
      });
}

async function albums(artist_name){

    const response = await fetchJsonp(`https://itunes.apple.com/search?term=${artist_name}&media=music&entity=album&attribute=artistTerm&limit=500`);
    const result =  await response.json()
    albums = await result.results
    display_albums(albums)
};

const display_albums = (albums) =>{
    const html_string = albums.map((album) =>{
        return `<div class="album-card">
        <div class="album-list">
            <div class="album-${album.artistId}>
                <div class="album-info">
                    <div class="album__cover">
                        <img src=${album.artworkUrl100}>
                        </img>
                    </div>
                    <div class = "album__name">
                        <h1 class="album__title">${album.artistName}</h1>
                    </div>
                </div>
            </div>
        </div>
    </div>`
    })
    .join('')
    album_container.insertAdjacentHTML("afterbegin",html_string)

};

albums('jack');
