import dayjs from "dayjs"

export const formatDate = (timeMS: number): string => {
    return dayjs(
        timeMS,
      ).format("dddd, MMMM, D")
}