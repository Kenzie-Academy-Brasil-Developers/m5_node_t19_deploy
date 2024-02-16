export const jwtConfig = () => {
  const secret = process.env.SECRET_KEY;
  const expiresIn = process.env.EXPIRES_IN;

  if (!secret) {
    throw new Error("Missing env var 'SECRET_KEY'.");
  }

  return { secret, expiresIn };
};
