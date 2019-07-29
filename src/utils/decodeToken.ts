import { decode } from 'jsonwebtoken';

export default function(token: string): any {
  return decode(token, { complete: true });
}
