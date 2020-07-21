import ColorTheme from "./IColorTheme";

export default class DefaultColorTheme implements ColorTheme {
  name: string;
  constructor() {
    this.name = "Default";
  }
  getFontFamily() {
    return "Consolas";
  }
}
