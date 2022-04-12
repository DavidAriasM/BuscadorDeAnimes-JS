const url_api_base = "https://api.jikan.moe/v4/anime";
const inputBuscador = document.getElementById('anime_nombre');
let listaAnime = document.getElementById('lista_anime');
let modal = '';
let indice = 0;

function consultaApi(event) {

    event.preventDefault();
    try {
        fetch(`${url_api_base}?q=${inputBuscador.value}`)
            .then(response => response.json())
            .then(data => desplegarData(data.data))
    } catch (error) {
        console.warn(error);
    }
}

function desplegarData(data) {
    listaAnime.innerHTML = '';
    indice = 0;
    for (i = 0; i < data.length; i++) {
        indice++;
        listaAnime.innerHTML += `<div class="item_anime">
        <img class="img_caratula" src="${ data[i].images.jpg.image_url }" alt="Imagen de portada de anime"><span class="tipo_show">${ data[i].type }</span></img>
        
        <span class="title_anime">${ data[i].title }</span><br>
        <button class="ver_detalle" onclick="abrirModal(${ indice })">Ver detalle</button>
        </div>
        <dialog id="modal${ indice }">
            <div class="contenedor_data_modal">
                <div class="header_modal">
                    <h1 class="titulo_anime">${ data[i].title }</h1>
                    <button id="cerrar_modal" onclick="cerrarModal(${ indice })">X</button>
                </div>
                <div class="detalle_anime_modal">
                    <img class="img_caratula_modal" src="${ data[i].images.jpg.image_url }" alt="imagen de anime" />
                    <div>
                        <p class="sinopsis"><strong>Sinópsis:</strong> <br>${ data[i].synopsis }</p>
                        <div class="div_generos"> ${ buscarGeneros(data[i].genres) } </div>
                    </div>
                </div>
                <div class="datos">
                        <div class="item-datos">Estudio: <strong>${ validarStudio(data[i].studios[0]) }</strong></div>
                        <div class="item-datos">Puntaje: <strong>${ data[i].score }</strong></div>
                        <div class="item-datos">Episodios: <strong>${ validarEpisodios(data[i].episodes) }</strong></div>
                        <div class="item-datos">Valoraciones:<strong> ${ data[i].scored_by }</strong></div>
                </div>
                <div class="trailer_anime">
                <!--<iframe width="100%" src="http://www.youtube.com/embed/${ data[i].trailer.youtube_id }?enablejsapi=1&origin=${ data[i].trailer.url!==null }" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>-->
                </div>
            </div>
        </dialog>
        `;
    }
}

function abrirModal(indice) {
    modal = document.querySelector('#modal' + indice);
    modal.showModal();
}

function cerrarModal(indice) {
    modal = document.querySelector('#modal' + indice);
    modal.close();
}

function buscarGeneros(data) {
    let generosEncontrados = ''
    for (j = 0; j < data.length; j++) generosEncontrados += `<span class="generos">${ data[j].name }</span>`
    return generosEncontrados;
}

validarStudio = (data) => data !== undefined ? data.name : 'Sin Información'

validarEpisodios = (data) => data !== null ? data : 'sin info'