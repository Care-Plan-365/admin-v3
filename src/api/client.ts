import { getStoredToken } from '../utils/authStorage';

export class ApiError extends Error {
  status: number;
  data?: unknown;

  constructor(message: string, status: number, data?: unknown) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.data = data;
  }
}

type ClientOptions = Omit<RequestInit, 'body' | 'headers'> & {
  skipAuth?: boolean;
  body?: unknown;
  headers?: HeadersInit;
};

const DEFAULT_API_BASE_URL = 'https://careplan-backend-v2-455e27abb649.herokuapp.com/api';

const normalizeBaseUrl = (baseUrl: string | undefined) => {
  if (!baseUrl) {
    return DEFAULT_API_BASE_URL;
  }

  const trimmed = baseUrl.trim();
  if (!trimmed) {
    return DEFAULT_API_BASE_URL;
  }

  return trimmed.endsWith('/') ? trimmed.slice(0, -1) : trimmed;
};

const getBaseUrl = () => normalizeBaseUrl(import.meta.env.VITE_API_BASE_URL);

const buildHeaders = (init?: HeadersInit, skipAuth?: boolean): Headers => {
  const headers = new Headers(init ?? {});
  if (!headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json');
  }

  if (!skipAuth) {
    const token = getStoredToken();
    const normalizedToken = token?.trim();
    if (normalizedToken) {
      headers.set('Authorization', `Bearer ${normalizedToken}`);
    }
  }

  return headers;
};

export const apiClient = async <TResponse>(path: string, options: ClientOptions = {}): Promise<TResponse> => {
  const { skipAuth, body, ...rest } = options;

  const headers = buildHeaders(rest.headers, skipAuth);
  const config: RequestInit = {
    method: rest.method ?? 'GET',
    credentials: rest.credentials ?? 'same-origin',
    headers,
    ...rest,
  };

  if (body !== undefined) {
    config.body = typeof body === 'string' ? body : JSON.stringify(body);
  }

  const response = await fetch(`${getBaseUrl()}${path}`, config);

  const contentType = response.headers.get('content-type');
  const isJson = contentType?.includes('application/json');
  const payload = isJson ? await response.json() : await response.text();

  if (!response.ok) {
    const message = getErrorMessage(payload) || response.statusText || 'Request failed';
    throw new ApiError(message, response.status, payload);
  }

  return (isJson ? payload : undefined) as TResponse;
};

const getErrorMessage = (payload: unknown): string | undefined => {
  if (!payload || typeof payload !== 'object') {
    return typeof payload === 'string' ? payload : undefined;
  }

  if ('message' in payload && typeof payload.message === 'string') {
    return payload.message;
  }

  return undefined;
};
