import { auth } from './../../api/apis/ssr';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useQueryClient } from 'react-query';
import { user } from 'src/api';
import {
  removeLocalStorage,
  setLocalStorage,
} from 'src/lib/utils/localStorage';
import { useAuth } from './useAuth';
import { keys } from '..';
import { ssrQuery } from '../queries/defaultQueryClient';

export const useLogout = () => {
  const { auth } = useAuth();
  const router = useRouter();
  const queryClient = useQueryClient();
  const ssrClient = ssrQuery();
  const logout = () => {
    if (confirm('로그아웃 확인')) {
      try {
        axios.delete('/api/auth/logout');
      } catch (e) {}
      queryClient.invalidateQueries(keys.auth);
      queryClient.removeQueries(keys.auth);
      ssrClient.invalidateQueries(keys.auth);
      ssrClient.removeQueries(keys.auth);
      setLocalStorage('exp', '');
      router.replace('/');
    }
  };
  return { logout };
};
