/*
 * Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license.
 * See LICENSE in the project root for license information.
 */

/* global document, Office */

import hljs from "highlight.js";

import CodeBuilder from "./codebuilder/codeBuilder";

Office.onReady(info => {
  if (info.host === Office.HostType.OneNote) {
    document.getElementById("sideload-msg").style.display = "none";
    document.getElementById("app-body").style.display = "flex";
    document.getElementById("run").onclick = run;
  }
});


export async function run() {
  /**
   * Insert your OneNote code here
   */
  try {
    await OneNote.run(async context => {
      // Get the current page.
      var page = context.application.getActivePage();

      let code = (<HTMLInputElement>document.getElementById("input-code")).value;

      let builder =  new CodeBuilder(code,'java');
      builder.highLight()
      page.addOutline(40, 90, builder.codeSnippet);

      // Run the queued commands, and return a promise to indicate task completion.
      return context.sync();
    });
  } catch (error) {
    console.log("Error: " + error);
  }
}
