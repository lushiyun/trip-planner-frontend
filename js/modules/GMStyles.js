export const mapStyles = [
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

export const icons = {
  see: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAdCAYAAABFRCf7AAAACXBIWXMAAAsSAAALEgHS3X78AAAB0ElEQVRIiaWWr0/DQBTHv7ciWegkis1gN0wtS5CQwIJBQZopDDAEkvDDIfjlCQOFITCB3pBUsGEx659QMiRNyaV342jvel37TZp0r91n3/fu3bsRKGRYQRnALoAagLrw1gBAD0DHd0hP9u0Y1LACE8AtgDXVDwqi0JbvkIESalgBddUFYKYAcnkM3I5BMwJFNXyHPI+hLOU+gHJGIJjjiu8Qb4oF9lTArWVgc+Xv88cnsH8hhVJj9InNnQ5F6M4GYBYBczq8j+r6AfC+AW8U3kdUIoYV1Fktx/p5S5/z0jbw+v4vZBciPSjV/QuwfiB1JVO1oHuD1o+m+XgGzM0CzRMttKaF0oXhdV1dBGaKYSxJWmgGuQW21ZSqzrPVHoW1/RqFsaTkCmxAKHXeCtureRqCbw611nu8T5/EAZKjpVzfIRW+ozoilK44dacTdR7p0TtEBsow596nKtG9L67+cU5gmwIhmadZ3VLYgu8QF5I+zer2igNjThG67aaZB4Jc5tLjIdmOsid0aYtAKZSlkbYMl7ITNemI1pUhlrbSqSCbrapKDRkwEcrKoKpv7KyfSIYVHBlWEAgX/aORX3TgMGCfHeeJ4gNFJ16GWPvEBOAXDJWposVp8PsAAAAASUVORK5CYII=',
  hotel: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAdCAYAAABFRCf7AAAACXBIWXMAAAsSAAALEgHS3X78AAABwElEQVRIia2WQU4CMRSG/5kSoytn6w7mAuIJ1HgANV4ALmDkAipcQOUCeAQ8gBFOICeouDKuGF2Z6FDzpi2ZdjrMMPBtCK/lz//e62vxkIPgrAXgFEATQF3tigBMADwBePTCOHL9OiMqODsDcJcSyoMEH7wwvl0qKjgbAGgViNmQ8+O064VoRUGNIeynUq4qCFX3G8Op4OytRA3L0PDCeOqrLm9CENqtr46NZPsQaPzJz2pQGVFT9TDxA2DvGdjaB777cim4NvfMI7k266WjgeCs7jtT372UbkncFtPotWxWiWiWuXNQ3OxkS+WryTD56gNRD/gZA58XqxY3qqmDe2SEqZ6aFZvmhfGEnI5XtbKEIVT3h+lpSPg4kakXQcfPhG4v+GRXlUA2iMTKNor2/r6nI4lTPaY0VYM1U6f7tQ3rllp3/pO5h76lFN01XU71F/uSfnWO7XIi5XLRCHuiOhVcdu23yvVG0ft0VVJw4oXxgR10zT7VduqIu2i7ghlRlYpzs0VHnfFiUSU8KjgNIy+M7/MWc/9MQNb3JXPZOLpdymmKc0d9jTe+EoKzpuBsJjgTapw3A4kJzjJ/b5wA+AepRpUoXZHF9AAAAABJRU5ErkJggg==',
  dining: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAdCAYAAABFRCf7AAAACXBIWXMAAAsSAAALEgHS3X78AAABsElEQVRIia2WP0/CQBjGn2tY3IirDnVwh4m1fgIgjg7KBziVT0AZncDcagLfQJgcqaOTxBUT+wkMm2PNS+9oae+ubcqTkCv35/c+dy/3FgaDIg4XQA9AF0ALQFPODAEEAJZMYKFbnYNGfLf4EcDIFDAlCjBgYhdED5XAlXRWRWMm4OegNYBKe7CT6pzVAJJGEYdHDw3p0pNJSXTWAv62wEnzsP0N4ymnbvydPofGLpTTh1zc6wnQucu3pJsZ4P8A57mNuRFHT0F72VGjLr0ErlfXUedwRLkNK6tzG58lnR+1m/cyoT3HOEQABaOW9DEvtR8z9M0HXvrx83cAPLWTzNu1JujaOOVrkbhWwE0A3BtLBil0mMDWCq6updr+8ojQQEHLZaBYCyYQpgvKa6VLoNcVlcF09p9rAgNVV/dQ2RFYl9k1VqPZ3+mgrssclA45HbGCDszobtRUvnvKaizNJOZ0C2XlWpWArplAO9upvfvyfKYFwK0pB9ZLHHF8Wt5bQyb0gc1VKlZfOspqbgIWQmUCsluk4jO0rStySmCqfwpCrvuystVXxDGJeIn/BQD+ARyCeckINsdpAAAAAElFTkSuQmCC',
  cafe: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAdCAYAAABFRCf7AAAACXBIWXMAAAsSAAALEgHS3X78AAABw0lEQVRIia2VP1LbQBSHv9U4FY0pUuMbxNzAvgEUUcv4BskJEk6AfYLgVhSQE1icIGqoKHAKN6FRkzQUm3nWs2dl7Uor4JvReLSr/b3n928NATLsGLgAJsDY+SoHCmCZYgrf6YZohh0BP1SsCzEwSzHroGiGPVPBYYTgjhKYul7vRTOseLbqIRYUNioonj319PAQCcFpiikT3bh6o6Agufiy9dTn5SQyCJuf8DivLZUp5thocm7dnc+2Xeyv5vpoBDfNopwmBzUYxe9l9QSYDIBPfUVPLqrfl9K/P3hNgv6t4fkeSm8/VaL3kd2zRwQfvof3E62v96RItH9rbO7aTfxpnKiR7zrql1sFH4YwvqpK5pDHRavRIsWcDvRl6YoOx7AOlwwfJ1XmPYlaEOr9ruIXnnPIp7WlbTeh2UeGQIYVK9/k3dMlMSx23yTOx3MdYa+h1PN1UfHWtdaTr3oeAtfJk46xWPIUU4tu4jk46+vl4UJDNMXkbnw6uPTdqN48a4mtOsbittB9G76/v0varKUaZP08ZM0rqsKFL15K466PElXha0Ael3mK6Rg5EcjAybA2w0Zdia2eOkgdisfBOO4B/gO6BIIhsXbEYwAAAABJRU5ErkJggg==',
  bar: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAdCAYAAABFRCf7AAAACXBIWXMAAAsSAAALEgHS3X78AAAB9UlEQVRIiaWWu27UQBSGvxmlgWqjtCDCEyRtqAg1EuQJNknhkrDUCLG8AGzrImRbGoKgRSwVHdqUVNkotCu5gs5GxzPejO2ZsbX8zchz+Xwuc46t8KjQyQB4CjwBdoFtuysDZsB34EzlaeY734IWOjkE3gID3wFHApyoPH0dhRY6eQ8cdsCaEssPXKv1fwJFD4Fv7oS2wOdrAivtFjpZhUHZpFyuYri9Bfe2+qGulrBYujP3VZ4uNqyFN0kZPoBXj/tB33yB8Wd35gQYbdhrc6PzOTx7ZB6Pp5D9qYMGt+F0aMbZr+Zr5BqOxP2iZcHOXfj50rh2tayvDW6Z9eMzmP5oHVV5qvxQ0XAPTgO5e/EBJl/9a7CvQyulFWKNbz4MLBWGVgDXxdCL6poLdB7dIpCLaxNfcTuuTCpL2zLr2PrXJKx5E9oqWQKddkL76xNVQyl0cum0NyPJvhSCaOeOGS9+m3F+7QuFuL6Jk6hx1BaBVcCwJtVKZWm9/tdTWfcrS20vjFsb17gC4mnS7dh2K7NWtpu01dEaVo6a3yrfN+qj7TZ9NFN5ut/c5yvTI+tSl7KQZy2odeWgB7SWnC5LBSzl9i4CPFd5GlwPdimVp6NAs1l0JTTe+kCS4Ma3DE3oz6QX1B52syvXJ94q+0p+hezvULeAfxFZrHdjLFdnAAAAAElFTkSuQmCC',
  mall: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAdCAYAAABFRCf7AAAACXBIWXMAAAsSAAALEgHS3X78AAAB9klEQVRIia2WMUvDQBTH/w1FBB1SEOzgUEVwESy4i/cJrHOGtt/AfALrJ7D9BG2HzG13IRldxIwKoh0cFAQzKIgIyru8aJpckrP6h9DL9d3v3r139y4lqOQ6JoAGgAMAdQA1tpoC8AFMAIwhrEA1PA11nSMAxwBM5YQ/IuAJhNXNh7pOH0CrAJbUAIAd99r4IxA8ph/vMBjYmRMYqcEMqRIn5S4rho2VNTSrG7I9fLjF+Ok+C0zLX6cwGOyhErhvrmK0vff9Tm3qyxAxKMkoA2hmAZvVdUzfXtG7v5Z99eWK7CN5waNqGG3BDi3/M/nP0doWTjd3szySsm8u0OXJZiSskqEaYJYX5C95SYPjIP/lecYmJdeplfO8qS0uYWe5gvbVuXynNoWgQGYulNSqbsgn+HjP9m52+b7B57lQWkBmEdTTsdaUF0En/wiVrLCguM5drLzJZOhsqWgnsAIIS2YxStSQy50UGQv/7Lde9qJGtE+7fHbnVcCMGDSshb0/QHvqehrOpLW9EprGvZyFhjPZc0Dt5F2luqNGfOnpyIOwRNJOVVDamkkL2DalNDRcitI4NbmwlDlQlj4Ia8y3ZJYGbKOUGhrK5g+HpPyihKq/UCK5Dh3dy9gdRqERVN7yhuV5SmGgmB3GeiiOuUB9uU5LPjoC8AUPFo/n8ryUHAAAAABJRU5ErkJggg=='
}