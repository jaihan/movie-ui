import React from "react";
import { Menu } from "semantic-ui-react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { RemoveItem } from "../storage/LocalStorage";

type LoginFormProps = {
  history: any;
};
type MyState = {
  activeItem: string;
};

type MyProps = LoginFormProps & RouteComponentProps;

class MenuForm extends React.Component<MyProps, MyState> {
  state: MyState = {
    activeItem: "user",
  };

  handleItemClick = (e: any, { name }: any) => {
    this.setState({ activeItem: name });
    this.renderSwitch(name);
  };

  renderSwitch(param: any) {
    switch (param) {
      case "home":
        return this.props.history.push("/movies");
      case "logout":
        RemoveItem("Authorization");
        return this.props.history.push("/");
      default:
        return;
    }
  }

  render() {
    return (
      <Menu inverted borderless size="massive">
        <Menu.Item name="home" onClick={this.handleItemClick} />
        <Menu.Menu position="right">
          <Menu.Item name="logout" onClick={this.handleItemClick} />
        </Menu.Menu>
      </Menu>
    );
  }
}

export default withRouter(MenuForm);
