import hljs from "highlight.js";
import ColorTheme from "../theme/IColorTheme";
import DefaultColorTheme from "../theme/DefaultColorTheme";

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
    } else {
      this._content = hljs.highlight(this.language, this._sourceCode).value;
    }
    console.log(this._content);
    this.genBr();
    this.replace();
    console.log(this._content);
    this.replaceWriteSpace();
    this.codeSnippet = this._content;
  }

  private genBr() {
    this._content = this._content
      .replace(/\r\n/g, "<br/>")
      .replace(/\n\r/g, "<br/>")
      .replace(/\n/g, "<br/>")
      .replace(/\r/g, "<br/>");
  }

  private replaceWriteSpace() {
    let content = this._content;
    let idx = content.search(/>\s+/);
    while (idx != -1) {
      var count = 1;
      while (/\s/.test(content.charAt(++idx))) {
        count++;
      }
      let tokenized = "><span>";
      while (count != 0) {
        tokenized += "&nbsp;";
        count--;
      }
      tokenized += "</span>";
      content = content.replace(/>\s+/, tokenized);
      idx = content.search(/>\s+/);
    }
    this._content = content;
  }

  private replace() {
    let tokenized = this._content;
    tokenized = tokenized
      .replace(/class="hljs-subst"|class="hljs-title"/g,`
      style="color: #000000;font-style: normal;"
      `)
      // .replace(
      //   /class="hljs-meta"/g,
      //   `style="font-family: ${this.theme.getFontFamily()}; font-size: ${this.theme.getFontSize()}pt; color: ${this.theme.getMeta() ||
      //     this.theme.getDefault()};"`
      // )
      .replace(
        /class="hljs-comment"|class="hljs-quote"/g,
        `style="font-family: ${this.theme.getFontFamily()}; font-size: ${this.theme.getFontSize()}pt; color: #808080;font-style: italic;"`
      )
      .replace(
        /class="hljs-string"/g,
        `style="color: #008000; font-weight: bold;"`
      )
      .replace(
        /class="hljs-variable"|class="hljs-template-variable"/g,
        `style="color: #660e7a;"`
      )
      .replace(
        /class="hljs-template-variable"/g,
        `style="font-family: ${this.theme.getFontFamily()}; font-size: ${this.theme.getFontSize()}pt; color: ${this.theme.getTemplateVariable() ||
          this.theme.getDefault()};"`
      )
      .replace(
        /class="hljs-strong"/g,
        `style="font-family: ${this.theme.getFontFamily()}; font-size: ${this.theme.getFontSize()}pt; font-weight: bold;"`
      )
      .replace(
        /class="hljs-emphasis"/g,
        `style="font-family: ${this.theme.getFontFamily()}; font-size: ${this.theme.getFontSize()}pt; color: ${this.theme.getEmphasis() ||
          this.theme.getDefault()};"`
      )
      // .replace(
      //   /class="hljs-quote"/g,
      //   `style="font-family: ${this.theme.getFontFamily()}; font-size: ${this.theme.getFontSize()}pt; color: ${this.theme.getQuote() ||
      //     this.theme.getDefault()};"`
      // )
      .replace(
        /class="hljs-keyword"|class="hljs-section"|class="hljs-name"|class="hljs-selector-tag"|class="hljs-type"|class="hljs-selector-id"|class="hljs-selector-class"/g,
        `style="font-family: ${this.theme.getFontFamily()}; font-size: ${this.theme.getFontSize()}pt;font-weight: bold; color: #000080;"`
      )
      .replace(
        /class="hljs-selector-tag"/g,
        `style="font-family: ${this.theme.getFontFamily()}; font-size: ${this.theme.getFontSize()}pt; color: ${this.theme.getSelectorTag() ||
          this.theme.getDefault()};"`
      )
      .replace(
        /class="hljs-type"/g,
        `style="font-family: ${this.theme.getFontFamily()}; font-size: ${this.theme.getFontSize()}pt; color: ${this.theme.getType() ||
          this.theme.getDefault()};"`
      )
      .replace(
        /class="hljs-literal"/g,
        `style="font-family: ${this.theme.getFontFamily()}; font-size: ${this.theme.getFontSize()}pt; color: ${this.theme.getLiteral() ||
          this.theme.getDefault()};"`
      )
      .replace(
        /class="hljs-symbol"|class="hljs-bullet"|class="hljs-formula"/g,
        `style="background: #d0eded; font-family: ${this.theme.getFontFamily()}; font-size: ${this.theme.getFontSize()}pt; color: #000000;font-style: italic;"`
      )
      .replace(
        /class="hljs-bullet"/g,
        `style="font-family: ${this.theme.getFontFamily()}; font-size: ${this.theme.getFontSize()}pt; color: ${this.theme.getBullet() ||
          this.theme.getDefault()};"`
      )
      .replace(
        /class="hljs-attribute"|class="hljs-number"|class="hljs-regexp"|class="hljs-link"/g,
        `style="font-family: ${this.theme.getFontFamily()}; font-size: ${this.theme.getFontSize()}pt; font-weight: normal; color: #0000ff;"`
      )
      .replace(
        /class="hljs-section"/g,
        `style="font-family: ${this.theme.getFontFamily()}; font-size: ${this.theme.getFontSize()}pt; color: ${this.theme.getSection() ||
          this.theme.getDefault()};"`
      )
      .replace(
        /class="hljs-name"/g,
        `style="font-family: ${this.theme.getFontFamily()}; font-size: ${this.theme.getFontSize()}pt; color: ${this
          .theme.name || this.theme.getDefault()};"`
      )
      .replace(
        /class="hljs-tag"/g,
        `style="font-family: ${this.theme.getFontFamily()}; font-size: ${this.theme.getFontSize()}pt; color: ${this.theme.getTag() ||
          this.theme.getDefault()};"`
      )
      // .replace(
      //   /class="hljs-title"/g,
      //   `style="color: ${this.theme.getTitle() ||
      //     this.theme.getDefault()};"`
      // )
      .replace(
        /class="hljs-attr"/g,
        `style="font-family: ${this.theme.getFontFamily()}; font-size: ${this.theme.getFontSize()}pt; color: ${this.theme.getAttr() ||
          this.theme.getDefault()};"`
      )
      .replace(
        /class="hljs-selector-id"/g,
        `style="font-family: ${this.theme.getFontFamily()}; font-size: ${this.theme.getFontSize()}pt; color: ${this.theme.getSelectorId() ||
          this.theme.getDefault()};"`
      )
      .replace(
        /class="hljs-selector-class"/g,
        `style="font-family: ${this.theme.getFontFamily()}; font-size: ${this.theme.getFontSize()}pt; color: ${this.theme.getSelectorClass() ||
          this.theme.getDefault()};"`
      )
      .replace(
        /class="hljs-selector-attr"/g,
        `style="font-family: ${this.theme.getFontFamily()}; font-size: ${this.theme.getFontSize()}pt; color: ${this.theme.getSelectorAttr() ||
          this.theme.getDefault()};"`
      )
      .replace(
        /class="hljs-selector-pseudo"/g,
        `style="font-family: ${this.theme.getFontFamily()}; font-size: ${this.theme.getFontSize()}pt; color: ${this.theme.getSelectorPseudo() ||
          this.theme.getDefault()};"`
      )
      .replace(
        /class="hljs-.*?"/g,
        `style="font-family: ${this.theme.getFontFamily()}; font-size: ${this.theme.getFontSize()}pt; color: ${this.theme.getDefault()};"`
      );
    tokenized =
      `<p style="display: block; overflow-x: auto; color: #000000; background: #fff; font-family: ${this.theme.getFontFamily()}; font-size: ${this.theme.getFontSize()}pt;">` + tokenized;
    tokenized += "</p>";
    this._content = tokenized;
  }
}
