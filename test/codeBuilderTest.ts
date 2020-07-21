import { expect } from "chai";
import CodeBuilder from "../src/taskpane/codebuilder/codeBuilder";

describe("CodeBuilder", () => {
  it("can be initialized with only sourceCode parameter", () => {
    let code = `
        @Override
        public Boolean batchDeleteInvoice(List<InvoiceNoInfo> infos) {
            invoiceInfoService.batchDelete(infos);
            return true;
        }
        `;
    const builder = new CodeBuilder(code);
    expect(builder.language).to.eq("auto");
    expect(builder.theme.name).to.eq("Default");
  });
});
