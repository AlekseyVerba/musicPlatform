import { num_word } from "./num_word"


export const countMilliSeconds = (mlSeconds: number) => {
    const years = Math.floor(mlSeconds / (1000 * 60 * 60 * 24 * 30 * 12))

    if (years) {
        return `${years} ${num_word(years, ["год", "года", "лет"])} назад`
    }

    const months = Math.floor(mlSeconds / (1000 * 60 * 60 * 24 * 30) % 12)

    if (months) {
        return `${months} ${num_word(months, ["месяц", "месяца", "месяцев"])} назад`
    }

    const days = Math.floor(mlSeconds / (1000 * 60 * 60 * 24) % 30)

    if (days) {
        return `${days} ${num_word(days, ["день", "дня", "дней"])} назад`
    }

    const hours = Math.floor((mlSeconds / (1000 * 60 * 60)) % 24)

    if (hours) {
        return `${hours} ${num_word(hours, ["час", "часа", "часов"])} назад`
    }

    const minutes = Math.floor((mlSeconds / (1000 * 60)) % 60)

    if (minutes) {
        return `${minutes} ${num_word(minutes, ["минуту", "минуты", "минут"])} назад`
    }

    const seconds = Math.floor((mlSeconds / 1000) % 60)

    if (seconds) {
        return `${seconds} ${num_word(seconds, ["секунду", "секунды", "секунд"])} назад`
    }


}