export const weekDays: Map<number, string> = new Map([
    [0, "Domingo"],
    [1, "Segunda"],
    [2, "Terça"],
    [3, "Quarta"],
    [4, "Quinta"],
    [5, "Sexta"],
    [6, "Sábado"],
]);

export type Day = {
    day?: number | string;
    month: number;
    weekDay: number;
};  

export function range(start: number = 0, end: number) {
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
}
