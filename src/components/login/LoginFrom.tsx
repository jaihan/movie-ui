import React from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import AuthenticateService from "../../services/AuthenticateService";
import {
  Button,
  Form,
  Grid,
  Header,
  Message,
} from "semantic-ui-react";

type LoginFormProps = {
  history: any;
};
type MyState = {
  email: string;
  password: string;
};

type MyProps = LoginFormProps & RouteComponentProps;

class LoginForm extends React.Component<MyProps, MyState> {
  state: MyState = {
    email: "",
    password: "",
  };

  handleChange = (e: React.FormEvent<HTMLInputElement>): void => {
    const { name, value }: { name: string; value: string } = e.currentTarget;
    this.setState({ [name]: value } as Pick<any, any>);
  };

  loginAndContinue = async () => {
    try {
      const { email, password }: MyState = this.state;
      const data = {
        email: email,
        password: password,
      };
      await AuthenticateService.signIn(data);
      this.props.history.push("/movie");
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    const { email, password }: MyState = this.state;
    return (
      <Grid
        textAlign="center"
        style={{ height: "100vh" }}
        verticalAlign="middle"
      >
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as="h2" color="teal" textAlign="center">
            Sign-in to your account
          </Header>
          <Form onSubmit={this.loginAndContinue}>
            <Form.Field required>
              <label>Email </label>
              <input
                name="email"
                onChange={this.handleChange}
                value={email}
                placeholder="Email"
              />
            </Form.Field>
            <Form.Field required>
              <label>Password</label>
              <input
                name="password"
                value={password}
                onChange={this.handleChange}
                type="password"
                placeholder="Password"
              />
            </Form.Field>
            <Button type="submit">Submit</Button>
          </Form>
          <Message>
            New to us?{" "}
            <span onClick={() => this.props.history.push("/auth/sign-up")} style={{color: "blue", cursor: "pointer"}}>
              Sign Up
            </span>
          </Message>
        </Grid.Column>
      </Grid>
    );
  }
}

export default withRouter(LoginForm);
