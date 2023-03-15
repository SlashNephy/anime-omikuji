export const getAuthorizeUrl = (clientId: string): string =>
  `https://anilist.co/api/v2/oauth/authorize?client_id=${clientId}&response_type=token`
