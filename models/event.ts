export interface IEvent{
    _id?: string,
    title: string,
    artist: string,
    orginizer: string,
    image: string,
    location: string,
    dateTime: string,
    price: number,
    vip: number,
    normal: number,
    seats: number,
    status?: string,
    category?: 'concert' | 'match' | 'other'
}