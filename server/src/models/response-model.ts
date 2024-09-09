export class CustomResponse {
    public status: number;
    public message: string;
    public data?: object | unknown;
  
    constructor(status: number, message: string, data?: object | unknown) {
      this.status = status;
      this.message = message;
      this.data = data;
    }
  }