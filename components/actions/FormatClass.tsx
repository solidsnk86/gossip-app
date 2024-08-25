export class Format {
  static time(str: string | number | Date) {
    const time = new Date(str).toLocaleTimeString("es-ES", {
      hour: "2-digit",
      minute: "2-digit",
    });
    return time;
  }

  static date(str: string | number | Date) {
    const date = new Date(str).toLocaleDateString("Es-es", {
      year: "numeric",
      month: "short",
      day: "2-digit",
    });
    return date;
  }

  static monthYear(str: string | number | Date) {
    const monthYear = new Date(str).toLocaleDateString("es-ES", {
      year: "numeric",
      month: "long",
    });
    return monthYear;
  }

  static dateAndTime(str: string | number | Date) {
    const dateTime = new Date(str).toLocaleDateString("es-ES", {
      year: "numeric",
      month: "short",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
    return dateTime;
  }
}
