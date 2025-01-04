interface ResponseData {
    res: any;
    status: number;
    success: boolean;
    message: string;
    data?: any;
  }
  
  export const sendResponse = ({ res, status, success, message, data }: ResponseData) => {
    res.status(status).json({
      success,
      message,
      data: data || null,
    });
  };
  