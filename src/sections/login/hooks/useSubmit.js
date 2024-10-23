import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import api from 'src/api/apiClient';
import { setCookie } from 'src/api/cookie';
import { OnRun } from 'src/api/OnRun';
import { useRouter } from 'src/routes/hooks';

const useSubmitOtp = (registerd) => {
  const router = useRouter();

  return useMutation({
    mutationKey: ['submitOtp'],
    mutationFn: async ({ nationalCode, otp }) => {
      const url_ = registerd ? `${OnRun}/api/login/` : `${OnRun}/api/signup/`;
      const response = await api.post(url_, {
        uniqueIdentifier: nationalCode,
        otp,
      });
      return response.data;
    },
    onSuccess: (data) => {
      setCookie('access', data.access, 5);
      if (registerd) {
        router.push('/');
      } else {
        router.push('/ProfilePage');
      }
      toast.warning(data.message);
    },
    onError: (error) => {
      console.error('خطا:', error);
      toast.error('خطا در ارسال درخواست به سرور.');
    },
  });
};

export default useSubmitOtp;
