let accessToken: string | null = null;

/**
 * Lưu access token vào memory (RAM)
 * @param t token string hoặc null để clear
 */
export const setAccessToken = (t: string | null) => {
  accessToken = t;
};

/** Lấy access token hiện tại (có thể là null) */
export const getAccessToken = (): string | null => accessToken;

/** Check quick */
export const hasAccessToken = () => !!accessToken;
