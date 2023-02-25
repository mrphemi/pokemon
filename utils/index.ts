// Prefix single gigits with two zeros and double digits with one zero
export const zeroPad = (num: number, places: number) =>
  String(num).padStart(places, "0");
