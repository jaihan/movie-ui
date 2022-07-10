import React from "react";
import { Input, Pagination } from "semantic-ui-react";
import { Card } from "semantic-ui-react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import MovieServices from "../services/MovieServices";
import { IMovie } from "../interface";

type LoginFormProps = {
  history: any;
};

type MyState = {
  movies: IMovie[];
  activePage: number;
  begin: number;
  end: number;
  total: number;
};

type MyProps = LoginFormProps & RouteComponentProps;

class MovieListPage extends React.Component<MyProps, MyState> {
  constructor(props: MyProps) {
    super(props);
    this.state = {
      movies: [],
      activePage: 1,
      begin: 0,
      end: 3,
      total: 0,
    };
    this.handlePaginate = this.handlePaginate.bind(this);
    this.searchMovieByTitle = this.searchMovieByTitle.bind(this);
    this.filerMovieByGenre = this.filerMovieByGenre.bind(this);
    this.filerMovieByProductionYear =
      this.filerMovieByProductionYear.bind(this);
    this.goMovieDetail = this.goMovieDetail.bind(this);
  }

  async componentDidMount() {
    this.loadMovieList();
  }

  async loadMovieList() {
    try {
      const queryParams = {
        page: this.state.begin,
        size: this.state.end,
      };
      const res = await MovieServices.getAll(queryParams);

      this.setState({
        movies: res.data.movies,
        total: res.data.totalItems,
      });
    } catch (error) {
      console.log(error);
    }
  }

  async handlePaginate(e: any, pageInfo: any) {
    await this.setState({ activePage: pageInfo.activePage });
    await this.setState({ begin: this.state.activePage - 1 });
    this.loadMovieList();
  }

  async searchMovieByTitle(event: React.SyntheticEvent | any) {
    try {
      const queryParams = {
        page: this.state.begin,
        size: this.state.end,
        title: event.target.value,
      };
      const res = await MovieServices.getAll(queryParams);

      this.setState({
        movies: res.data.movies,
        total: res.data.totalItems,
      });
    } catch (error) {
      console.log(error);
    }
  }

  async filerMovieByGenre(event: React.SyntheticEvent | any) {
    try {
      const queryParams = {
        page: this.state.begin,
        size: this.state.end,
        genre: event.target.value,
      };
      const res = await MovieServices.getAll(queryParams);
      this.setState({
        movies: res.data.movies,
        total: res.data.totalItems,
      });
    } catch (error) {
      console.log(error);
    }
  }

  async filerMovieByProductionYear(event: React.SyntheticEvent | any) {
    try {
      const queryParams = {
        page: this.state.begin,
        size: this.state.end,
        productionyear: event.target.value,
      };
      const res = await MovieServices.getAll(queryParams);
      this.setState({
        movies: res.data.movies,
        total: res.data.totalItems,
      });
    } catch (error) {
      console.log(error);
    }
  }

  goMovieDetail(id: string) {
    this.props.history.push(`/movie/${id}`);
  }

  render() {
    const { movies, activePage, total }: MyState = this.state;

    return (
      <div>
        <Input
          icon="search"
          placeholder="Search by tilte"
          onChange={this.searchMovieByTitle}
        />
        <Input
          icon="search"
          placeholder="Search by genre"
          onChange={this.filerMovieByGenre}
        />
        <Input
          icon="search"
          placeholder="Search by production year"
          onChange={this.filerMovieByProductionYear}
          style={{ marginBottom: "2em" }}
        />
        <Card.Group itemsPerRow={3}>
          {movies.map((movie: any) => (
            <Card onClick={() => this.goMovieDetail(movie.id)}>
              <Card.Content>
                <Card.Header>{movie.genre} </Card.Header>
                <Card.Meta>
                  {movie.genre} {movie.productionyear}
                </Card.Meta>
                <Card.Description>{movie.synopsis}</Card.Description>
              </Card.Content>
            </Card>
          ))}
        </Card.Group>
        <Pagination
          fluid
          defaultActivePage={1}
          activePage={activePage}
          onPageChange={this.handlePaginate}
          totalPages={Math.ceil(total / 3)}
          style={{ marginTop: "2em" }}
        />
      </div>
    );
  }
}

export default withRouter(MovieListPage);
