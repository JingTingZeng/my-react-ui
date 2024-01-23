import { HttpMethod } from "../enum/api.enum";

const sendApiRequest = async <T>(url: string, method = HttpMethod.Get, data = null): Promise<T> => {
  const requestOptions = {
    method,
    headers: new Headers({
      'Content-Type': 'application/json',
    }),
    body: data ? JSON.stringify(data) : null,
  };

  try {
    const response: Response = await fetch(url, requestOptions);
    if (!response.ok) {
      throw new Error(`API request failed with status: ${response.status}`);
    }

    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error('Error sending API request:', error);
    throw error;
  }
};

export default sendApiRequest;
