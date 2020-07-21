import hljs from "highlight.js";
import DefaultColorTheme from "../theme/DefaultColorTheme"
import ColorTheme from "../theme/IColorTheme"

export default class CodeBuilder {
  codeSnippet: string;

  theme: ColorTheme;

  language: string;

  _sourceCode: string;

  constructor(sourceCode: string, language = "auto", theme = new DefaultColorTheme()) {
    this._sourceCode = sourceCode;
    this.language = language;
    this.theme = theme;
  }
}
