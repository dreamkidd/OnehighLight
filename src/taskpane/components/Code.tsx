import * as React from "react";
import { TextField } from "office-ui-fabric-react/lib/TextField";
import {
  Dropdown,
  IDropdownOption,
  IDropdownStyles,
  Stack,
  IStackStyles,
  IStackTokens,
  IStackProps,
  IStackItemStyles
} from "office-ui-fabric-react";
import { DefaultPalette } from "office-ui-fabric-react/lib/Styling";
import CodeBuilder from "./codebuilder/codeBuilder";

const stackStyles: Partial<IStackStyles> = { root: { width: 320 } };
const stackItemStyles: IStackItemStyles = {
  root: {
    background: DefaultPalette.themeLight,
    color: DefaultPalette.white,
    padding: 5,
    width: 310
  }
};
const dropdownStyles: Partial<IDropdownStyles> = {
  dropdown: { width: 100 }
};
const outStackTokens: IStackTokens = { childrenGap: 5 };
const innerStackTokens: IStackTokens = {
  childrenGap: 5,
  padding: 5
};

const language: IDropdownOption[] = [{ key: "java", text: "java" }];
const theme: IDropdownOption[] = [{ key: "default", text: "default" }];

interface CodeProp {
  snippet?: any;
}

const initialState = { code: "" };
type CodeState = Readonly<typeof initialState>;
export class Code extends React.Component<CodeProp, CodeState> {
  onChange = (ev: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newText: string): void => {
    let codeBuilder = new CodeBuilder(newText,'java');
    codeBuilder.highLight();
    this.props.snippet(codeBuilder.codeSnippet);
  };
  render() {
    return (
      <Stack tokens={outStackTokens} styles={stackStyles}>
        <Stack styles={stackStyles} tokens={innerStackTokens}>
          <Stack.Item grow={20} align="center" styles={stackItemStyles}>
            <TextField label="Input you Code Here" multiline autoAdjustHeight onChange={this.onChange} />
          </Stack.Item>
          {/* <Stack.Item grow={10} align="center" styles={stackItemStyles}>
            <Stack horizontal horizontalAlign="center">
              <Stack.Item>
                <Dropdown
                  placeholder="Select an option"
                  label="Choose Language"
                  options={language}
                  styles={dropdownStyles}
                />
                <Dropdown
                  placeholder="Select an option"
                  label="Choose Language"
                  options={theme}
                  styles={dropdownStyles}
                />
              </Stack.Item>
            </Stack>
          </Stack.Item> */}
        </Stack>
      </Stack>
    );
  }
}
