import jwt from "jsonwebtoken";

export function generateJwtToken(userId: number): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    const currentDate = new Date();
    const fiveMinutesLater = currentDate.setMinutes(
      currentDate.getMinutes() + 5
    );

    const payload = {
      sub: userId,
      exp: Math.floor(fiveMinutesLater / 1000),
    };

    jwt.sign(payload, "1jdsij098_123.pwerj", (err, token) => {
      if (err) {
        reject(err);
        return;
      }

      resolve(token as string);
    });
  });
}
