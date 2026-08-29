import { useNavigate, useLocation, useParams } from 'react-router-dom';

export function useRouter() {
  const navigate = useNavigate();
  return {
    push: (path) => navigate(path),
    replace: (path) => navigate(path, { replace: true }),
    back: () => navigate(-1),
  };
}

export function usePathname() {
  const location = useLocation();
  return location.pathname;
}

export { useParams };
