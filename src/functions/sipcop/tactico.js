function calcularDistancia(lat1, lon1, lat2, lon2) {
    return new Promise((resolve) => {
      const R = 6371; // Radio de la Tierra en kilómetros
      const dLat = (lat2 - lat1) * (Math.PI / 180);
      const dLon = (lon2 - lon1) * (Math.PI / 180);
      const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * (Math.PI / 180)) *
          Math.cos(lat2 * (Math.PI / 180)) *
          Math.sin(dLon / 2) *
          Math.sin(dLon / 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      const distancia = R * c;
      resolve(distancia);
    });
}


function encontrarPuntoMasCercano(listaPuntos, {Latitud, Longitud}) {
    return new Promise((resolve) => {
      let puntoMasCercano = null;
      let distanciaMinima = Infinity;
  
      const promesasDistancias = listaPuntos.map((punto) =>
        calcularDistancia(Latitud, Longitud, punto.Latitud, punto.Longitud)
          .then((distancia) => {
            if (distancia < distanciaMinima) {
              distanciaMinima = distancia;
              puntoMasCercano = punto;
            }
          })
      );
      Promise.all(promesasDistancias).then(() => {
        resolve(puntoMasCercano);
      });
    });
}
export {encontrarPuntoMasCercano};