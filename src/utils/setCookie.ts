// write a function that takes all the parameters needed to set a cookie and sets it

import { Response } from 'express';

const setCookie = (res: Response, name: string, value: string, options: any) => {
  res.cookie(name, value, options);
};

export default setCookie;