export interface IOrigin {
  name: string
  url: string
}

export interface ILocation {
  name: string
  url: string
}

export interface ICharactersCard {
  id: number | string
  name: string
  status: string
  species: string
  type: string
  gender: string
  origin: IOrigin
  location: ILocation
  image: string
  episode: string[]
  url: string
  created: string
}

export interface ILocation {
  id: number
  name: string
  type: string
  dimension: string
  residents: string[]
  url: string
  created: string
}

