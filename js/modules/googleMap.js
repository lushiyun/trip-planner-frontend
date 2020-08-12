import { elements } from './elements.js';

const KEY = 'AIzaSyCXSwfxutGMziO5ZgPvglcdV8FlI0oKqgY';
let map;
let service;
let places = {};

export const placeTypes = {
  site: 'tourist_attraction',
  restaurant: 'restaurant',
  cafe: 'cafe',
  bar: 'bar',
  lodging: 'lodging',
  shopping: 'shopping_mall'
}

export const searchBox = new google.maps.places.SearchBox(elements.cityInput);

export function initMap(center) {
  map = new google.maps.Map(elements.map, {
    center: center,
    zoom: 13,
    styles: mapStyles
  });
};

export function getPlaces(location, radius, type) {
  return new Promise((resolve, reject) => {
    const request = {
      location: location,
      radius: radius,
      type: placeTypes[type]
    }
    service = new google.maps.places.PlacesService(map);
    service.nearbySearch(request, (results, status) => {
      if(status == google.maps.places.PlacesServiceStatus.OK) {      
        resolve(results.forEach(place => savePlace(place, type)))
      } else {
        reject(status);
      }
    });
  })
}

// {
//   type: [place, place, ...],
//   type: [place, place, ...]
// }
function savePlace(place, type) {
  const placesArr = Object.values(places).flat();
  if(placesArr.find(record => record.place_id === place.place_id)) return
  places[type] ? (places[type].push(place)) : (places[type] = [place]);
}

export function createMarker(type) {
  places[type].forEach(place => {
    const marker = new google.maps.Marker({
      map,
      position: place.geometry.location,
      animation: google.maps.Animation.DROP,
      icon: icons[type]
    });
    const contentString = `<h4>${place.name}</h4>`;
    const infoWindow = new google.maps.InfoWindow({ content: contentString });
    marker.addListener('click', () => infoWindow.open(map, marker));
  })
}

export function createCard(type) {
  places[type].forEach(place => {
    const placeCard = document.createElement('div');
    const imgSrc = place.photos[0].getUrl({maxHeight: 150, maxWidth: 150})
    placeCard.innerHTML = `
      <img src="${imgSrc}" alt="${place.name}">
    `;
    elements.placeList.appendChild(placeCard);
  })
}

const mapStyles = [
  {
    "featureType": "administrative",
    "elementType": "geometry",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "administrative.land_parcel",
    "elementType": "labels",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "poi",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "labels.text",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "labels.icon",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "road.local",
    "elementType": "labels",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "transit",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  }
]

const icons = {
  site: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAMAAAAM7l6QAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAABL1BMVEUAAABKlepMkeRLkeNKkONLkONNmeZLkuNKkONNk+RLkeJMkuRKlOJKkeJLlvBKkONLkONVnONLkONKkeRLkONLkeNKkONKkeJKkeMAAABKkeJKj+FKkeEAAABIh9dLkeMAAAAAAABLj+AAAAA7drdLkeMAAAAAAAAAAABFhNBKkeMAAAAAAAAAAAAAAABFhM0AAAAAAABFhNBEhc8AAAAAAAA/fMBKj+FKkOBBesEAAAAAAAAAAAAiRWdEg89Kj+BKj+AAAAAAAAAjQGNJjt1JjN4kOl8AAAArVYZLkOIsUYNFgctDgcxJjt5Kjd1KkOJNkuKFtOve6vnr8vuTve1LkOKItuzg7Pr////o8fuQu+1MkeKLuOzi7fqGtevm8PuOuexhnuXl7/rk7voAAACVe5PHAAAAT3RSTlMAGGi02PIUk/tC7l4++hHpiBL2XarT7fjjAbp5eAIg/AMEqwcn9QUIDGj+BgkNEHYRFIF/ExZh6+piCw4VJYTp6AoPJMjGIxIq7CldX6CjkhEdfwAAAAFiS0dEAIgFHUgAAAAHdElNRQfiCgESOBaZvRFZAAABm0lEQVQoz43Q6VLCMBAAYBWUQ1RABKtGEyql0gJBwaP1oh54BxUVxQv7/u/gpgmC2B/uDDPsfrub6Y6M/DdGxwLB8fFgYGzUBydCYSYjHJoY1kiUDUQ08lsne6NNuWByUGNTonp7d98SDVOxvk7P8MrD41Mb4vmlw7OZ6R+OQ9p5fQNqvUPLxydviPc0kWSs+wXllybfAW1ul7FkQvIsH3Zdb4Y/8uq6/O+s5BQvdjvtNmPi1+nySkrynJjqs8jnJKf9OS05488ZyfP+PC9UWfDnBcVTZVHgYPDKksJdQcsrfryyjDgjTLLMJ7IEIxjGRF3N/dXcqkqwAqzl9bXCsBbW9LzmsWEWS+VhLpeKpsGZANPK+m/dqFBg4k3ndVqtbW71cXunVqV63hBvq5ZNq7t7+wcCD/f3dqvUtlT+NnyYYdZth1ZqR8dcT05rFerYdXgaeWchhmpaRYc2zs4ZO79oUKdomapBkLgaIho01HXbuWTsyrH1OqBGEJJHRxgTTYMO6/rGAtM0gjHyTu45bIDbwg4ImMOQKp5+A4OCr0LCHLxdAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDE4LTEwLTAxVDE1OjU2OjIyKzAzOjAwM1PkwgAAACV0RVh0ZGF0ZTptb2RpZnkAMjAxOC0xMC0wMVQxNTo1NjoyMiswMzowMEIOXH4AAAAASUVORK5CYII=',
  lodging: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAMAAAAM7l6QAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAABAlBMVEUAAADqiqrkhKTjhaTjhKTjhaPmjKbjhqPjhKTkh6bihaTkhaXiiKXihaPwh6XjhKPjhaPjjqrjhaTkhqXjhKTjhaPjhKTihaPjhaQAAADihaPhhaLhhKQAAADXgJ/jhaQAAAAAAADgg6MAAAC3b4PjhKMAAAAAAAAAAADQe5bjhaQAAAAAAAAAAAAAAADNeZUAAAAAAADQe5bPepcAAAAAAADAcYvhg6LghKLBcI0AAAAAAAAAAABnPkzPepXgg6LghKMAAAAAAABjOUfdgZ/egaBfOkIAAACGT2HihKODS13LdpTMdpTegZ/dgqDihKPqp7378fT////wwdHporoAAAAy4t4bAAAAT3RSTlMAGGi02PIUk/tC7l4++hHpiBL2XarT7fjjAbp5eAIg/AMEqwcn9QUIDGj+BgkNEHYRFIF/ExZh6+piCw4VJYTp6AoPJMjGIxIq7CldX6CjkhEdfwAAAAFiS0dEAIgFHUgAAAAHdElNRQfiCgESOA6K0YkPAAABeklEQVQoz43Q6VLCMBAAYA455JBLgaKRhEIptEBQ8GgBpR6IV6Dw/s/iNg2Hkh/uTDNJvuzudAOB/0YwFD6KRI7CoaAEo7E4ExGPRf/qcYLtReL4tyZ56mLpussFL5Dc11SaJ4GC8206tdOTjF/Tdf3Pi8zJlrPskFl2o7n8prEffvt8TnBh11g4vygIPt1WZvu7U8Fncj4TXJRzUXBJziXBZTmXfVUqcq4oXJVzOV8onivosirj6iXyGGFSk42lRjCCZEzUeuNwqI26SrACrDX1Vtt7v3JXYmGs3dKbGmfD7HR73tV6tRYLY71uxzQ8JsC0f8V+xXWfAhOe3dTpYHhzu8O7++GA6k3D761aNh2MxpMHHx8n49GA2pbq9YYfM8yp7dD+8OnZ05fXYZ869hRaIz4WYqim1XHo7G3O2Px9Rp2OZaoGQf7UENHgwVS3nQ/GPh1bnwJqBCExdIQx0TR4YX19W2CaRjBGfOTcoQLMFmpAQB6Go8L1B0Wkq8Yk3CK8AAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDE4LTEwLTAxVDE1OjU2OjE0KzAzOjAw3gzWGwAAACV0RVh0ZGF0ZTptb2RpZnkAMjAxOC0xMC0wMVQxNTo1NjoxNCswMzowMK9RbqcAAAAASUVORK5CYII=',
  restaurant: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAMAAAAM7l6QAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAABO1BMVEUAAAD/amr/YmL/Y2P/Y2P/Y2P/Zmb/Y2P/Y2P/ZGT/Y2P/ZGT/Y2P/Y2P/aWn/YmL/Y2P/Y2P/YmL/Y2P/Y2P/Y2P/Y2P/Y2P/Y2MAAAD/Y2P9Y2P9YmIAAADvYGD/YmIAAAAAAAD8YWEAAADLTk7/Y2MAAAAAAAAAAADpW1v/YmIAAAAAAAAAAAAAAADnW1sAAAAAAADpW1vpWloAAAAAAADYVFT9YmL9YmLYU1MAAAAAAAAAAABuMDDoW1v9YWH9YmIAAAAAAABqKyv5YGD5YWFmLCwAAACSPT3+YmKPODjkWFjkWVn5YGD5YWH/YmL/Zmb/aGj/Y2P/////9/f/9vb/ZGT/+fn/aWn/+/v//v7//f3/6ur/fn7/e3v/7e3/vr7/09P/wcH/c3P/8/P/dHT/yMj/cnIAAADC39qGAAAAT3RSTlMAGGi02PIUk/tC7l4++hHpiBL2XarT7fjjAbp5eAIg/AMEqwcn9QUIDGj+BgkNEHYRFIF/ExZh6+piCw4VJYTp6AoPJMjGIxIq7CldX6CjkhEdfwAAAAFiS0dEAIgFHUgAAAAHdElNRQfiCgESOA6K0YkPAAABnElEQVQoz43RZ1fCMBQGYFFQRBRQQYtGEoul2gJBwdG6qANxRY17K47//w+8TQMI9oP39PScN09Gc9vT898K9PYFQ6FgX2/AB/sHwkxWeKC/Wwcj7FdFBjt1KMw6Kjz0W6PDrKuGo20diYmhM0/OxTs20uK4GLjgl4xzdsWvRYw3NTHqLeY3Ht+KOJqQPCbPu7u/Bn54uPDimORxyY/8ifNn/iLjuOSkzK/8jcPzLmNSckrmxgeH+viUMSV5onnZxhfnX9/NNCF5st0N+LRWTXqqpP05rQhVpvx5WnFdQTMZP87MIJcRJrN+PEswgsWYqNm5vzyXVQlWgLWcPr/Q/UMX5vWcJtgw84ViNxcLedNwmQDT0mKnLpUoMBGrczotV5ZX2ri6VilTPWd4Z6uWTcvrG5tbHm5vbqyXqW2p7tlwMcOs2g4tVXZ2Xd3br5SoY1fhaCTaQgzVtPIOrR3UGasf1qiTt0zVIMjrGiIaTKjqtnPE2LFj61VAjSAkm44wJpoGM6yTUwtM0wjGSLRcOOwAvYU9oGAdhqgI/QGO56ynz9f/jQAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAxOC0xMC0wMVQxNTo1NjoxNCswMzowMN4M1hsAAAAldEVYdGRhdGU6bW9kaWZ5ADIwMTgtMTAtMDFUMTU6NTY6MTQrMDM6MDCvUW6nAAAAAElFTkSuQmCC',
  cafe: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAMAAAAM7l6QAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAABLFBMVEUAAAD0gGDue2DuemDtemDteWDygGbueV/uel/wfGHueV/vemLve2PueWDwh2nteV/uemDxgGPteV/ve2DtemDuel/uemDueWDteV8AAADtemDseF/seWAAAADfeGDueV8AAAAAAADseV4AAAC+Yk7temAAAAAAAAAAAADacVjueV8AAAAAAAAAAAAAAADYblYAAAAAAADZb1fZcFgAAAAAAADKZ1HreF7reV/LaFEAAAAAAAAAAABnNynYblfreF/reV8AAAAAAABjOSvod13odl1mMywAAACMSTfteV+JRDjWblXUblbneF7od17teV/0sqT////3yL7wlH/87erte2L+/Pv98e/2wLTtfGLyoI7tfWT+/f340cj75eD++/rxm4f2w7fvi3QAAABiUJoLAAAAT3RSTlMAGGi02PIUk/tC7l4++hHpiBL2XarT7fjjAbp5eAIg/AMEqwcn9QUIDGj+BgkNEHYRFIF/ExZh6+piCw4VJYTp6AoPJMjGIxIq7CldX6CjkhEdfwAAAAFiS0dEAIgFHUgAAAAHdElNRQfiCgESOA6K0YkPAAABoUlEQVQoz43Q51LDMAwAYHbZBcoKYLAbSFOSggstI2E17GnMaiib938IJNuUkOMHOt9F9mfJF7W0/Dda29o7Ojs72tta/8CuTLcw0Z3pSmtPr0hEb89v7cPSa3kDSzfoS2r/AJ7dyjtYun6g/0cHs+roXj7AMv2zg00e0ifJaiGGvnV4RB8k3oYYGTacE39GzvCo2slmGB41PJbievyIB2OGxw2L5rUYk3HDEyluyDomE4YnU/wknzGZ1GpNpfhFvmIyZSm1ptNvv71jMmOhW2R2Dnd12cBPQ759fGIyN0uQCWV53Mbf/xXrLnlGCRRTZs8vwPYxrid+WizM24xawE7BLS6mJ7pYdAuOYs8vLS2neXmp5HvIDJiXV37rapkDM1VdcHmlurb+gxub1Qp3C55+2w5CXtna3tnVuLezvVXhYWDj2/Bjnl8LI16u7h+gHh5VyzwKa/A0UWNhnu0HpYgfn5wKcXp2zKNS4NseI3pqhDlwoeaG0bkQF1Ho1gAdRogZOqGUOQ7cCC6vAjDHYZQSNXLl0AFmCz0goI7C1lL6BadUrIOK/xGEAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDE4LTEwLTAxVDE1OjU2OjE0KzAzOjAw3gzWGwAAACV0RVh0ZGF0ZTptb2RpZnkAMjAxOC0xMC0wMVQxNTo1NjoxNCswMzowMK9RbqcAAAAASUVORK5CYII=',
  bar: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAMAAAAM7l6QAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAABCFBMVEUAAAD/qiv/oir/oin/oij/oSj/pjP/oSr/oin/oiv/oin/oyn/pSn/oSn/pS3/oij/oSn/qiv/oij/oin/oin/oin/oSn/oSj/oigAAAD/oin9oCj9oigAAADvlyj/oigAAAAAAAD8oCgAAADLgyH/oSkAAAAAAAAAAADpkyX/oigAAAAAAAAAAAAAAADnkyUAAAAAAADplCbplSYAAAAAAADYiSL9oSj9oCjYiiQAAAAAAAAAAABuTBXokyX9oCj9oCkAAAAAAABqRxX5nij5nShmQhYAAACSYRj+oSiPXRnkkSbkkSb5nij5nif/oSj/267/////pDD/79v/sEv/+/b/xHgAAABdACoBAAAAT3RSTlMAGGi02PIUk/tC7l4++hHpiBL2XarT7fjjAbp5eAIg/AMEqwcn9QUIDGj+BgkNEHYRFIF/ExZh6+piCw4VJYTp6AoPJMjGIxIq7CldX6CjkhEdfwAAAAFiS0dEAIgFHUgAAAAHdElNRQfiCgESOA6K0YkPAAABiElEQVQoz43Ra0OCMBQGYMtS7G5pRbXaQicJ1ijoAnaBLma3SWD//6e0sQFKfuj9xOHZdtihVPpv5ubLC4uLC+X5uRlYqSpURqlWilpbohNZqk3rskKnoixP6soqLWR1Jde1dfon62sZb/B6FGYZ8Xoj1fomL7+jVKNvXm/WJW+J4+Jx+EPpTziORb0luSHbcRFrkjQkN9PPGYVRJBrzNCVvpy94e9GYZ1vyTnabOAzjrNiRvJvfNgzz512h6t5s3lMTVfdn84HKXQWHR7P46BBwBhAdZ8gji2MEAdsMkdZq/+V2S0NQZYw7+km3+MO6J3oHJ2yYvdOzIp+d9kyDM2JMrPNpvbAIY5Ts7ujEdi6vcry+cWyidwzRW3M9Yvdv7+4FPtzd9m3iuRrvzS5mmL4XEMt5fOL6/OJYJPB81hokY0GGZrq9gAxeh5QO3wYk6LmmZiAgpgYQZgt83QveKf0IPN1niBEAcugAQoQxW+F+frnMMEYQgmTkibMT2GzZGSxsH2SlmugvrnWrWjsFn+UAAAAldEVYdGRhdGU6Y3JlYXRlADIwMTgtMTAtMDFUMTU6NTY6MTQrMDM6MDDeDNYbAAAAJXRFWHRkYXRlOm1vZGlmeQAyMDE4LTEwLTAxVDE1OjU2OjE0KzAzOjAwr1FupwAAAABJRU5ErkJggg==',
  shopping: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAMAAAAM7l6QAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAABO1BMVEUAAABqqpVnpIxmpIxmpItlo4tmpoxmo41mpItopotmpItnpY1npYxmo4xppZZmo4xlo41xqo5mpIxlpYxmpIxmo4xlpIxmo4xlpIsAAABlo4xlootmpIoAAABgn4dlpIwAAAAAAABko4sAAABVg29mo4sAAAAAAAAAAABdloBlpIwAAAAAAAAAAAAAAABdlYAAAAAAAABdloBcl4EAAAAAAABXi3ZlootkoopWjXgAAAAAAAAAAAAwTD5dlYBlooplo4oAAAAAAAArR0Bjn4hjoIksQjoAAAA9YVVmo4s+XVFalH5blH5jn4ljoIhlo4vt9PH///+Gt6S61cvU5d74+/np8u/b6uSJuKbO4dqXwLDA2c+lybux0MSz0cajyLrB2tCVwK/P4tuIt6Xd6uXd6+V5r5prppAAAACGn70NAAAAT3RSTlMAGGi02PIUk/tC7l4++hHpiBL2XarT7fjjAbp5eAIg/AMEqwcn9QUIDGj+BgkNEHYRFIF/ExZh6+piCw4VJYTp6AoPJMjGIxIq7CldX6CjkhEdfwAAAAFiS0dEAIgFHUgAAAAHdElNRQfiCgESOA6K0YkPAAABt0lEQVQoz43QZ1uDMBAHcLd11q2o0USUolBNtXWAq7gnXt176/f/Bl4uUWwfX3gvOP73I8lDqqr+W9U1tXX19XW1NdV/YENjKjaVamyo1Kbm+Fc1N5VrSyouq1TLb21to+EJYJ3Qa1trou1pGpWAqkQh3f7DHXrHUzg1D1Ud39rZpQdnamEJznTq6jTcTfEcfuqcBt2GeyhdJHxBgx7DvZQu4UrvegWX1HsN91G6hhvNN3BNvc9wP6VbuNN8B7fU+w0PULqHB80PcE99QKs1SOkRnjQ/wSP1QYvUGqL0DC+aX+CZ+rCl3GIjoyq9wpvmd3hVbXSEKWZcjKn4kfz3h8pjgjNczIU9PoHxM+FPjBPjtuAWspNxJ6fiipqadDMOsednp2cqeWY663uKBbLMzZbrXE4iC1qdcWW+ML+Q4OJSIS/djKfPtoNQ5pdXVtc0rq+uLOdlGNjqbPwxzy+GkcwVNjaVbm0XcjIKi3g0o2sRnu0H2Uju7O7F8d7+joyygW97gulbY8LBD4puGB3E8WEUukVERzBmLp1xLhwHvwiOjgM0xxGcM7pyctwB7xb3wMJ1HKNF+gXoyK0/DDl3NgAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAxOC0xMC0wMVQxNTo1NjoxNCswMzowMN4M1hsAAAAldEVYdGRhdGU6bW9kaWZ5ADIwMTgtMTAtMDFUMTU6NTY6MTQrMDM6MDCvUW6nAAAAAElFTkSuQmCC'
}