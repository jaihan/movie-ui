import http from "../config/Axios";

type QueryState ={
  page?: any,
  size?: any, 
  title?: any, 
  genre?: any, 
  productionyear?: any
}
class MovieServices {
  getAll(query: QueryState) {
    let queryPage = '';
    let querySize = '';
    let queryTitle = '';
    let queryGenre = '';
    let queryProductionYear = '';
    if(query.page !== undefined){
      queryPage = "page="+query.page
    }
    if(query.size !== undefined){
      querySize="&size="+query.size
    }
    if(query.title !== undefined){
      queryTitle = "&title="+query.title
    }
    if(query.genre !== undefined){
      queryGenre = "&genre="+query.genre
    }
    if(query.productionyear !== undefined){
      queryProductionYear="&productionyear="+query.productionyear
    }
    return http.get(`/movies?${queryPage}${querySize}${queryTitle}${queryGenre}${queryProductionYear}`);
  }

  get(id: string) {
    return http.get(`/movie/${id}`);
  }
}

export default new MovieServices();
