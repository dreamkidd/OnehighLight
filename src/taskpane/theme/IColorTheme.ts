export default interface ColorTheme {
  getKeyword();
  getQuote();
  getEmphasis();
  getStrong();
  getBullet();
  getSymbol();
  getSelectorTag();
  getType();
  getLiteral();
  getSelectorPseudo();
  getSelectorAttr();
  getSelectorClass();
  getSelectorId();
  getAttr();
  getTitle();
  getTag();
  getSection();
  getAttribute();
  getComment();
  getString();
  getVariable();
  getTemplateVariable();
  getMeta();
  getDefault(): any;
  name: string;
  getFontFamily(): string;
  getFontSize(): string;

}
