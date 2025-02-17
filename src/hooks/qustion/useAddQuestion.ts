import { useRouter } from 'next/router';
import { useMutation, UseMutationResult, useQueryClient } from 'react-query';
import { CreateQuestion, Question } from 'src/interface';
import { keys } from '../queries/queryKeys';
import produce from 'immer';
import { AxiosError } from 'axios';

// 요청량이 많으면 커스텀 업데이트, 페이지 단위일시 invalidate사용
const useAddQuestion = (mutationFn: any, qid?: number) => {
  const queryClient = useQueryClient();
  return useMutation((data: CreateQuestion) => mutationFn(data, qid ? qid : null), {
    onSuccess: async (newQuestion: Question) => {
      // 메인페이지에 새로 추가
      if (!qid) {
        const old = queryClient.getQueryData(keys.questions());
        if (!old) return;
        // post
        queryClient.setQueryData(keys.questions(), (oldData: any) => {
          if (newQuestion.createdAt === newQuestion.updatedAt) {
            const updatedData = produce(oldData, (draft: any) => {
              draft.result.unshift(newQuestion);
            });
            return updatedData;
          }
          if (oldData) {
            const updatedData = produce(oldData, (draft: any) => {
              draft.result.unshift(newQuestion);
              draft.result.map((page: Question) => {
                if (page.id === newQuestion.id) return newQuestion;
                return page;
              });
            });
            return updatedData;
          }
        });
      }

      // patch
      if (qid) {
        // infinityQuery data 커스텀 업데이트
        queryClient.cancelQueries(keys.questions());
        queryClient.cancelQueries(keys.qDetail(newQuestion.id));
        queryClient.invalidateQueries(keys.qDetail(newQuestion.id));

        queryClient.setQueryData(keys.questions(), (oldData: any) =>
          produce(oldData, (draft: any) => {
            oldData?.result.forEach((v: any, j: number) => {
              if (v.id === newQuestion.id) {
                draft.result[j] = newQuestion;
                return false;
              }
            });
          }),
        );
      }
    },

    onError: (error: any) => {
      let message = typeof error.response !== 'undefined' ? error.response.data?.error?.message : error.message;
      queryClient.setQueryData('serverErrorMessage', message || '잘못된 요청입니다.');
    },
  });
};

export default useAddQuestion;
