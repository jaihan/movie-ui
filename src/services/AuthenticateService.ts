import http from "../config/Axios";

class AuthenticateService {
  signIn(data: any) {
    return http.post("/auth/login", data);
  }
  signUp(data: any) {
    return http.post("/auth/register", data);
  }
}

export default new AuthenticateService();
