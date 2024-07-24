import service from './service';

export default function loginApi(code: string) {
  return service.post(`/login?code=${code}`);
}

export {
  loginApi,
};
