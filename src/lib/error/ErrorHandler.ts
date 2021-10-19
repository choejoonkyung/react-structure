import { AxiosResponse } from "axios";

class ErrorHandler {
  private static checkNullish(res: AxiosResponse) {
    if (typeof res !== "object" || res == null) {
      return false;
    }
  }
  static checkForbiddenError<T>(res: AxiosResponse<T>) {
    ErrorHandler.checkNullish(res);
    return res.status === 403 ? true : false;
  }
}

export default ErrorHandler;
