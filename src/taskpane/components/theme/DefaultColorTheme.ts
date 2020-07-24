import ColorTheme from "./IColorTheme";

export default class DefaultColorTheme implements ColorTheme {
  name: string;
  constructor() {
    this.name = "Default";
  }
  getKeyword() {
    return "#333333";
  }
  getQuote() {
    return "#808080";
  }
  getEmphasis() {
    return "italic";
  }
  getStrong() {
    return "bold";
  }
  getBullet() {
    return "#990073";
  }
  getSymbol() {
    return "#990073";
  }
  getSelectorTag() {
    return "#333333";
  }
  getType() {
    return "#445588";
  }
  getLiteral() {
    return "#008080";
  }
  getSelectorPseudo() {
    return "#333333";
  }
  getSelectorAttr() {
    return "#333333";
  }
  getSelectorClass() {
    return "#333333";
  }
  getSelectorId() {
    return "#990000";
  }
  getAttr() {
    return "#008080";
  }
  getTitle() {
    return "#000000";
  }
  getTag() {
    return "#efefef";
  }
  getSection() {
    return "#990000";
  }
  getAttribute() {
    return "#008080";
  }
  getComment() {
    return "#999988";
  }
  getString() {
    return "#dd1144";
  }
  getVariable() {
    return "#008080";
  }
  getTemplateVariable() {
    return "#008080";
  }
  getMeta() {
    return "#808000";
  }
  getDefault() {
    return "#000000";
  }
  getFontSize(): string {
    return "10.5";
  }
  getFontFamily() {
    return "Consolas";
  }
}
