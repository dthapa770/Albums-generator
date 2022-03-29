const dom_selectors={
    album_container: document.querySelector('.album_container'),
    search_text:document.querySelector('.search-bar__input').value,
    search_form: document.querySelector(".search-form"),
    message_text: document.getElementById('message-text')   
}
dom_selectors.search_form.addEventListener("submit", (e) =>{
    e.preventDefault()
    dom_selectors.search_text = document.querySelector('.search-bar__input').value;
    if(dom_selectors.search_text == ""){
        dom_selectors.message_text.innerHTML ="Please provide Artist name"
    }
    albums(dom_selectors.search_text)
})
  
async function albums(artist){
    const response = await fetchJsonp(`https://itunes.apple.com/search?term=${artist}&media=music&entity=album&attribute=artistTerm&limit=500`);
    const result =  await response.json()
    albums = await result.results
    length = albums.length;
    dom_selectors.message_text.innerHTML =` ${length} results found...`
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
                        <h1 class="album__title">${album.collectionName}</h1>
                    </div>
                </div>
            </div>
        </div>
    </div>`
    })
    .join('')
    dom_selectors.album_container.insertAdjacentHTML("afterbegin",html_string)
};


