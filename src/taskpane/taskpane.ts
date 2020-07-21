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

function replace(html: String, colorTheme) {
  return html
    .replace(
      /class="hljs-meta"/g,
      `style="font-family: ${colorTheme.fontFamily}; font-size: ${colorTheme.fontSize}px; color: ${colorTheme.meta ||
        colorTheme.default};"`
    )
    .replace(
      /class="hljs-comment"/g,
      `style="font-family: ${colorTheme.fontFamily}; font-size: ${colorTheme.fontSize}px; color: ${colorTheme.comment ||
        colorTheme.default};"`
    )
    .replace(
      /class="hljs-string"/g,
      `style="font-family: ${colorTheme.fontFamily}; font-size: ${colorTheme.fontSize}px; color: ${colorTheme.string ||
        colorTheme.default};"`
    )
    .replace(
      /class="hljs-variable"/g,
      `style="font-family: ${colorTheme.fontFamily}; font-size: ${
        colorTheme.fontSize
      }px; color: ${colorTheme.variable || colorTheme.default};"`
    )
    .replace(
      /class="hljs-template-variable"/g,
      `style="font-family: ${colorTheme.fontFamily}; font-size: ${
        colorTheme.fontSize
      }px; color: ${colorTheme.templateVariable || colorTheme.default};"`
    )
    .replace(
      /class="hljs-strong"/g,
      `style="font-family: ${colorTheme.fontFamily}; font-size: ${colorTheme.fontSize}px; : ${colorTheme.strong ||
        colorTheme.default};`
    )
    .replace(
      /class="hljs-emphasis"/g,
      `style="font-family: ${colorTheme.fontFamily}; font-size: ${
        colorTheme.fontSize
      }px; color: ${colorTheme.emphasis || colorTheme.default};`
    )
    .replace(
      /class="hljs-quote"/g,
      `style="font-family: ${colorTheme.fontFamily}; font-size: ${colorTheme.fontSize}px; color: ${colorTheme.quote ||
        colorTheme.default};"`
    )
    .replace(
      /class="hljs-keyword"/g,
      `style="font-family: ${colorTheme.fontFamily}; font-size: ${colorTheme.fontSize}px; color: ${colorTheme.keyword ||
        colorTheme.default};"`
    )
    .replace(
      /class="hljs-selector-tag"/g,
      `style="font-family: ${colorTheme.fontFamily}; font-size: ${
        colorTheme.fontSize
      }px; color: ${colorTheme.selectorTag || colorTheme.default};"`
    )
    .replace(
      /class="hljs-type"/g,
      `style="font-family: ${colorTheme.fontFamily}; font-size: ${colorTheme.fontSize}px; color: ${colorTheme.type ||
        colorTheme.default};"`
    )
    .replace(
      /class="hljs-literal"/g,
      `style="font-family: ${colorTheme.fontFamily}; font-size: ${colorTheme.fontSize}px; color: ${colorTheme.literal ||
        colorTheme.default};"`
    )
    .replace(
      /class="hljs-symbol"/g,
      `style="font-family: ${colorTheme.fontFamily}; font-size: ${colorTheme.fontSize}px; color: ${colorTheme.symbol ||
        colorTheme.default};"`
    )
    .replace(
      /class="hljs-bullet"/g,
      `style="font-family: ${colorTheme.fontFamily}; font-size: ${colorTheme.fontSize}px; color: ${colorTheme.bullet ||
        colorTheme.default};"`
    )
    .replace(
      /class="hljs-attribute"/g,
      `style="font-family: ${colorTheme.fontFamily}; font-size: ${
        colorTheme.fontSize
      }px; color: ${colorTheme.attribute || colorTheme.default};"`
    )
    .replace(
      /class="hljs-section"/g,
      `style="font-family: ${colorTheme.fontFamily}; font-size: ${colorTheme.fontSize}px; color: ${colorTheme.section ||
        colorTheme.default};"`
    )
    .replace(
      /class="hljs-name"/g,
      `style="font-family: ${colorTheme.fontFamily}; font-size: ${colorTheme.fontSize}px; color: ${colorTheme.name ||
        colorTheme.default};"`
    )
    .replace(
      /class="hljs-tag"/g,
      `style="font-family: ${colorTheme.fontFamily}; font-size: ${colorTheme.fontSize}px; color: ${colorTheme.tag ||
        colorTheme.default};"`
    )
    .replace(
      /class="hljs-title"/g,
      `style="font-family: ${colorTheme.fontFamily}; font-size: ${colorTheme.fontSize}px; color: ${colorTheme.title ||
        colorTheme.default};"`
    )
    .replace(
      /class="hljs-attr"/g,
      `style="font-family: ${colorTheme.fontFamily}; font-size: ${colorTheme.fontSize}px; color: ${colorTheme.attr ||
        colorTheme.default};"`
    )
    .replace(
      /class="hljs-selector-id"/g,
      `style="font-family: ${colorTheme.fontFamily}; font-size: ${
        colorTheme.fontSize
      }px; color: ${colorTheme.selectorId || colorTheme.default};"`
    )
    .replace(
      /class="hljs-selector-class"/g,
      `style="font-family: ${colorTheme.fontFamily}; font-size: ${
        colorTheme.fontSize
      }px; color: ${colorTheme.selectorClass || colorTheme.default};"`
    )
    .replace(
      /class="hljs-selector-attr"/g,
      `style="font-family: ${colorTheme.fontFamily}; font-size: ${
        colorTheme.fontSize
      }px; color: ${colorTheme.selectorAttr || colorTheme.default};"`
    )
    .replace(
      /class="hljs-selector-pseudo"/g,
      `style="font-family: ${colorTheme.fontFamily}; font-size: ${
        colorTheme.fontSize
      }px; color: ${colorTheme.selectorPseudo || colorTheme.default};"`
    )
    .replace(
      /class="hljs-.*?"/g,
      `style="font-family: ${colorTheme.fontFamily}; font-size: ${colorTheme.fontSize}px; color: ${colorTheme.default};"`
    );
}

export async function run() {
  /**
   * Insert your OneNote code here
   */
  try {
    await OneNote.run(async context => {
      // Get the current page.
      var page = context.application.getActivePage();

      let code = (<HTMLInputElement>document.getElementById("input-code")).value;

      let builder =  new CodeBuilder(code);
      builder.highLight()
      page.addOutline(40, 90, builder.codeSnippet);

      // Run the queued commands, and return a promise to indicate task completion.
      return context.sync();
    });
  } catch (error) {
    console.log("Error: " + error);
  }
}
