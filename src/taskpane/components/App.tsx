import * as React from "react";
import { Button, Stack, PrimaryButton, IStackProps, ButtonType } from "office-ui-fabric-react";
// import Header from "./Header";
import Progress from "./Progress";
import { Code } from "./Code";
/* global Button, Header, HeroList, HeroListItem, Progress */

export interface AppProps {
  title: string;
  isOfficeInitialized: boolean;
}

export interface AppState {
  codesnippet: string;
}

export default class App extends React.Component<AppProps, AppState> {
  constructor(props, context) {
    super(props, context);
  }

  handler = (val: string) => {
    this.setState({
      codesnippet: val
    });
  };

  click = async () => {
    try {
      await OneNote.run(async context => {
        // Get the current page.
        var page = context.application.getActivePage();

        page.addOutline(40, 90, `${this.state.codesnippet}`);

        // Run the queued commands, and return a promise to indicate task completion.
        return context.sync();
      });
    } catch (error) {
      console.log("Error: " + error);
    }
  };

  render() {
    const { title, isOfficeInitialized } = this.props;

    if (!isOfficeInitialized) {
      return (
        <Progress title={title} logo="assets/logo-filled.png" message="Please sideload your addin to see app body." />
      );
    }

    return (
      <div className="ms-welcome">
        {/* <Header logo="assets/logo-filled.png" title={this.props.title} message="Welcome" /> */}
        <Code snippet={this.handler.bind(this)}></Code>
        <Stack>
        <Stack.Item grow={10} align="center">
          <PrimaryButton text="Run" allowDisabledFocus  onClick={this.click} />
        </Stack.Item>
        </Stack>
      </div>
    );
  }
}
