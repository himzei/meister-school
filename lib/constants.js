export const PASSWORD_MIN_LENGTH = 6;
export const PASSWORD_MIN_ERROR = "패스워드는 최소 6글자 이상이어야 합니다";
export const PASSWORD_REGEX = new RegExp(
  /^(?=.*[a-z])(?=.*\d)(?=.*?[#?!@$%^&*-_]).+$/
);

export const PASSWORD_REGEX_ERROR =
  "영문자, 숫자, 특수기호(#?!@$%^&*-_)가 하나 이상 포함되어야 합니다!";
