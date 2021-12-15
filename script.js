//funcion que retorna html de la info de superHero
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
                    <li class="list-group-item">ID: ${data.id}</li>
                </ul>
            </div>
            </div>
        </div>
    </div>
    `;
};

//funcion que retorna grafico
const graficoSuperHero = (data) => {
  let chart = new CanvasJS.Chart('chartContainer', {
    animationEnabled: true,
    title: {
      text: `Estadisticas ${data.name}`,
    },
    data: [
      {
        type: 'pie',
        startAngle: 240,
        yValueFormatString: '##0',
        indexLabel: '{label} {y}',
        dataPoints: [
          { y: data.powerstats.combat, label: 'Combat' },
          { y: data.powerstats.intelligence, label: 'Intelligence' },
          { y: data.powerstats.power, label: 'Power' },
          { y: data.powerstats.speed, label: 'Speed' },
          { y: data.powerstats.strength, label: 'Strength' },
        ],
      },
    ],
  });
  return chart.render();
};

// Escucha evento submit
$('.form').on('submit', function (event) {
  event.preventDefault();
  const superHeroNumber =
    $('#superHeroNumber').val() || Math.floor(Math.random() * 781);

  $.get(
    `https://superheroapi.com/api.php/10226626249299994/${superHeroNumber}`,
    function (data) {
      //Render HTML
      $('.superHeroInfo').html(supeHeroCardHTML(data));

      //Render Grafico
      graficoSuperHero(data);

      console.log(data);
    }
  );

  //Resetea input form
  $('.form')[0].reset();
});

// Obtiene 50 superHeros Random
$('.btn-modal').on('click', function (event) {
  $('.superHeroList').html('');
  for (let cont = 1; cont < 50; cont++) {
    const id = Math.floor(Math.random() * 781);
    $.get(
      `https://superheroapi.com/api.php/10226626249299994/${id}/biography`,
      function (data) {
        $('.superHeroList').append(`
        <div class="col-md-4"><span class="fw-bold">${data.id}:</span> ${data.name}</div>
        `);
      }
    );
  }
});
