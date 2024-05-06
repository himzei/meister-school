import dynamic from "next/dynamic";

const redirect = dynamic(import("next/navigation"));

export async function GET() {
  const baseURL = "https://kauth.kakao.com/oauth/authorize";
  const params = {
    client_id: process.env.KAKAO_CLIENT_ID,
    redirect_uri: process.env.KAKAO_REDIRECT_URI,
    response_type: "code",
  };

  const formattedParams = new URLSearchParams(params).toString();
  const finalUrl = `${baseURL}?${formattedParams}`;

  return redirect(finalUrl);
}
