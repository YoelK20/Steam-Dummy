import bcryptjs from "bcryptjs";

export const hashText = (password: string): string => bcryptjs.hashSync(password);
export const compareTextWithHash = (password: string, hash: string): boolean =>
  bcryptjs.compareSync(password, hash);