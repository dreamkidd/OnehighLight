import { expect } from "chai";
import CodeBuilder from "../src/taskpane/codebuilder/codeBuilder";

describe("CodeBuilder", () => {
  it("can be initialized with only sourceCode parameter", () => {
    let code = `
    private genBr() {
        this._content = this._content
                  .replace(/\r\n/g, "<br/>")
                  .replace(/\n\r/g, "<br/>")
                  .replace(/\n/g, "<br/>")
                  .replace(/\r/g, "<br/>")
          // .trim();
    }
        `;
    const builder = new CodeBuilder(code);
    expect(builder.language).to.eq("auto");
    expect(builder.theme.name).to.eq("Default");
    builder.highLight()
  });
});
