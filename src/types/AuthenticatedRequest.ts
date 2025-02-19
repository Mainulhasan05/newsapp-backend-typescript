
import { Request } from 'express';

export interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
    roles?: string[];
    // Add any other user properties if needed
  };
}
