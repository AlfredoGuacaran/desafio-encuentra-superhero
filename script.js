//10226626249299994

const supeHeroCardHTML = (data) => {
  return `
    <div class="card mb-3 p-1" style="max-width: 100%;">
        <h3 class="h3 text-center">SuperHero Encontrado</h3>
    
        <div class="row g-0">
            <div class="col-md-6">
            <img src="${
              data.image.url
            }" class="img-fluid rounded-start" alt="SuperHero">
            </div>
            <div class="col-md-6">
            <div class="card-body">
                <h4 class="card-title">${data.name}</h4>
            
                 <h6 class="card-title">Conexiones</h6>
                <p class="card-text">Grupo de superHeros: ${
                  data.connections['group-affiliation']
                }</p>
                <p class="card-text">Familiares: ${
                  data.connections.relatives
                }</p>
                <ul class="list-group list-group-flush">
                    <li class="list-group-item">Publicado por: ${
                      data.biography.publisher
                    }</li>
                    <li class="list-group-item">Ocupación: ${
                      data.work.occupation
                    }</li>
                    <li class="list-group-item">Altura: ${
                      data.appearance.height[1]
                    } - ${data.appearance.height[0]}"</li>
                    <li class="list-group-item">Peso: ${
                      data.appearance.weight[1]
                    } - ${data.appearance.weight[0]}</li>
                    <li class="list-group-item">Alianzas: ${data.biography.aliases.join(
                      ', '
                    )}</li>
                </ul>
            </div>
            </div>
        </div>
    </div>
    `;
};

$('.form').on('submit', function (event) {
  event.preventDefault();
  const superHeroNumber = $('#superHeroNumber').val();

  $.get(
    `https://superheroapi.com/api.php/10226626249299994/${superHeroNumber}`,
    function (data) {
      console.log(data);

      $('.superHeroInfo').html(supeHeroCardHTML(data));
    }
  );
});
