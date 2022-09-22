//18:00 -> 1080
export function hourConverter(hourstring: string){
    const [hours, minutes] = hourstring.split(':').map(Number);
    const minutesAmount = (hours * 60) + minutes;
    return minutesAmount;
}