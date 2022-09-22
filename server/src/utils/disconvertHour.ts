//1080 -> 18:00
export function hourDisconverter(hourstring: number){
    const hours = Math.floor(hourstring / 60);
    const minutes = hourstring % 60;

    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
}