import { customAlphabet } from 'nanoid';

export default async function handler(req, res) {


  res.status(200).json({code: getRandomCode()})
}

export function getRandomCode(){
  const alphabet = '0123456789';
  const nanoid = customAlphabet(alphabet, 6);
  const randomCode = parseInt(nanoid());
  return randomCode;
}
