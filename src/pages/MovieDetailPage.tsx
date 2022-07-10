import React from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import MovieServices from "../services/MovieServices";

type LoginFormProps = {
  history: any;
  match: any;
};
type MovieObject = {
  _id: string;
  title: string;
  synopsis: string;
  genre: string;
  productionyear: string;
};

type MyState = {
  movie: MovieObject;
};

type MyProps = LoginFormProps & RouteComponentProps;

class MovieDetailPage extends React.Component<MyProps, MyState> {
  state: MyState = {
    movie: {
      _id: "",
      title: "",
      synopsis: "",
      genre: "",
      productionyear: "",
    },
  };
  async componentDidMount() {
    try {
      const res = await MovieServices.get(this.props.match.params.id);

      this.setState({
        movie: res.data,
      });
    } catch (error) {
      console.log(error);
    }
  }
  render() {
    const { movie }: MyState = this.state;
    return (
      <dl>
        <div>
          <dt>Title</dt>
          <dd>{movie.title}</dd>
        </div>
        <div>
          <dt>Synopsis</dt>
          <dd>{movie.synopsis}</dd>
        </div>
        <div>
          <dt>Genre</dt>
          <dd>{movie.genre}</dd>
        </div>
        <div>
          <dt>Production Year</dt>
          <dd>{movie.productionyear}</dd>
        </div>
      </dl>
    );
  }
}

export default withRouter(MovieDetailPage);
