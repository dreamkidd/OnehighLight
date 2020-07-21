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

      // let codes = code.replace(/\s/g,"&nbsp;");
      // code.replace(/\n/g,';')
      // console.log(code.indexOf('\n'))
      // var code = `
      // class MyClass {
      //   public static myValue: string;
      //   constructor(init: string) {
      //     this.myValue = init;
      //   }
      // }
      // import fs = require("fs");
      // module MyModule {
      //   export interface MyInterface extends Other {
      //     myProperty: any;
      //   }
      // }
      // declare magicNumber number;
      // myArray.forEach(() => { });
      // `;
      // code.replace(new RegExp('\\n','g'), '<br/>')
      // code.split("\n").join("!@@@@@@@")

      // code.replace(/\s/g,"&nbsp;");
      // code.replace(/\r\n/g,"<br/>");
      // code.replace(/\\r\\n/g,"<br/>");
      // console.log(content4);
      // console.log(content4.indexOf("\n"));
      // // code.replace
      // // var idx = code.indexOf('/(\n(?=(\n+)))/g')
      // // console.log(idx);

      // // code.replace(/\r\n/g,"&nbsp;")
      // // Queue a command to set the page title.
      // // page.title = "Hello World";

      console.log(code);
      let tokenized = hljs.highlightAuto(code).value;
      // // Queue a command to add an outline to the page.
      // // var html = hljs.highlightAuto(code).value;
      var html = "<pre>" + tokenized + "</pre>";
      console.log("highLighted html is ", html);

      var colorTheme = {
        fontFamily: "Consolas",
        fontSize: 10.5,
        comment: "#998",
        quote: "#998",
        keyword: "#333"
      };

      var formated = replace(html, colorTheme);

      let content1 = formated.replace(/\r\n/g, "<br />");
      let content2 = content1.replace(/\n\r/g, "<br />");
      let content3 = content2.replace(/\n/g, "<br />");
      let content4 = content3.replace(/\r/g, "<br />");
      // let content5 = content4.replace(/\s/g,"&nbsp;")
      // console.log(formated.indexOf("\n"));
      // let content5 = content4.replace(/>\s+</g,'>&nbsp;&nbsp;&nbsp;&nbsp;<')
      let idx = content4.search(/>\s+</);
      var content5 = content4;
      // while (idx != -1) {
      console.log("idx = ", idx);
      var count = 1;
      console.log(/\s/.test(content5.charAt(++idx)));
      while (/\s/.test(content5.charAt(++idx))) {
        count++;
      }
      console.log("count ", count);
      // let replace = "";
      // for (var i = 0; i < count; i++) {
      //   replace += "&bnsp;";
      // }
      // console.log("replace str = ", replace);
      // content5.replace(/>\s+</, replace);
      console.log("content5 = ", content5);
      idx = content5.search(/>\s+</);
      // }
      console.log("highLighted formated html is ", content5);

      // formated.replace(/\s/g,"&nbsp;");
      // formated.replace(/\r\n/g,"<br/>");
      // formated.replace(/\\r\\n/g,"<br/>");

      
      page.addOutline(40, 90, builder.codeSnippet);

      // Run the queued commands, and return a promise to indicate task completion.
      return context.sync();
    });
  } catch (error) {
    console.log("Error: " + error);
  }
}
