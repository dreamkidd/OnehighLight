import hljs from "highlight.js";
import DefaultColorTheme from "../theme/DefaultColorTheme";
import ColorTheme from "../theme/IColorTheme";

export default class CodeBuilder {
  codeSnippet: string;

  theme: ColorTheme;

  language: string;

  private _sourceCode: string;

  private _content: string;

  constructor(sourceCode: string, language = "auto", theme = new DefaultColorTheme()) {
    this._sourceCode = sourceCode;
    this.language = language;
    this.theme = theme;
  }

  highLight() {
    if (this.language === "auto") {
      this._content = hljs.highlightAuto(this._sourceCode).value;
      this.genBr();
      this.replaceWriteSpace();
      console.log(this._content);
      this.codeSnippet = this._content;
    }
  }

  private genBr() {
    this._content = this._content
              .replace(/\r\n/g, "<br/>")
              .replace(/\n\r/g, "<br/>")
              .replace(/\n/g, "<br/>")
              .replace(/\r/g, "<br/>")
  }

  private replaceWriteSpace() {
    let content = this._content;
    let idx = content.search(/>\s+/);
    while (idx != -1) {
      var count = 1;
      while (/\s/.test(content.charAt(++idx))) {
        count++;
      }
      let tokenized = ">";
      while (count != 0) {
        tokenized += "&nbsp;";
        count--;
      }
      content = content.replace(/>\s+/, tokenized);
      idx = content.search(/>\s+/);
    }
    this._content = content;
  }
}
