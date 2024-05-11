const options: Intl.DateTimeFormatOptions = {
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
};

/**
 * Преобразует переданное значение даты или строку даты в формате "07.06.2023 17:39:50".
 * @param {Date | string} value Значение даты или строка даты для форматирования.
 * @returns {string} Возвращает отформатированную строку с датой в формате "07.06.2023 17:39:50".
 */
export const formatToRussianDate = (value: Date | string) => {
  return new Intl.DateTimeFormat("ru-RU", options).format(new Date(value));
};
