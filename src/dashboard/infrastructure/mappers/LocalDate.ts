export class LocalDate {
  static parse(dateStr: string) {
    const [y, m, d] = dateStr.split('-').map(Number)
    if(!y || !m || !d) throw new Error("Cannot parse this date");
    return new Date(y, m - 1, d)
  }

  static getWeekDay(dateStr: string) {
    return this.parse(dateStr).getDay()
  }
}
