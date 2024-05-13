import { redirect } from "next/navigation";

export async function GET() {
  const baseURL = "https://nid.naver.com/oauth2.0/authorize";
  const params = {
    client_id: process.env.NAVER_CLIENT_ID,
    redirect_uri: process.env.NAVER_REDIRECT_URI,
    response_type: "code",
    state: process.env.NAVER_STATE,
  };

  const formattedParams = new URLSearchParams(params).toString();
  const finalUrl = `${baseURL}?${formattedParams}`;

  return redirect(finalUrl);
}
