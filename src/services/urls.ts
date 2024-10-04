export const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

const urls = {
  signupUrl: `${baseUrl}/auth/signup`,
  loginUrl: `${baseUrl}/auth/login`,
};

export default urls;
