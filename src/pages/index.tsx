import type { NextPage } from 'next';
import React, { useEffect, useState } from 'react';
import { dehydrate, QueryClient } from 'react-query';
import { Layout } from 'src/Layout';
import { MainContent } from 'src/components/MainContent';
import { GetServerSideProps } from 'next';
import axios, { AxiosRequestConfig } from 'axios';
import { ssr } from 'src/api';
import { keys } from 'src/hooks';
import { getLocalStorage, setLocalStorage } from 'src/lib/utils/localStorage';
import { Exp } from 'src/interface/content-type';
import { errorHandler } from 'src/api/errorHandler';
import { MainHead } from 'src/components/common';
import { ssrQuery } from 'src/hooks/queries/defaultQueryClient';
import { useRouter } from 'next/router';
import Link from 'next/link';

const Home: NextPage<{ exp: Exp }> = (props) => {
  setLocalStorage('exp', JSON.stringify(props.exp));
  const router = useRouter();
  const { cg, keyword } = router.query as { cg: string; keyword: string };
  const [title, setTitle] = useState('');
  useEffect(() => {
    setTitle(
      ` ${
        cg && keyword
          ? cg.toUpperCase() + ' | ' + keyword.toUpperCase()
          : cg && cg.toUpperCase()
      }`,
    );
  }, [cg, keyword]);

  return (
    <>
      <MainHead title={title} />
      <Layout sideLeft sideRight banner>
        <MainContent />
      </Layout>
    </>
  );
};
export default Home;

const queryClient = ssrQuery();
export const getServerSideProps: GetServerSideProps = errorHandler(
  async ({ ctx: { req, query }, cookie, exp }) => {
    queryClient.invalidateQueries(keys.auth);
    if (exp?.access_exp) {
      await queryClient.prefetchQuery(keys.auth, () =>
        ssr.auth(req as AxiosRequestConfig),
      );
    }
    // await ssrQuery.prefetchQuery(keys.questions(), () => ssr.questions());
    // await ssrQuery.prefetchQuery(keys.sourcings(), () => ssr.sourcings());
    return {
      props: {
        dehydratedState: dehydrate(queryClient),
        exp: exp,
      },
    };
  },
);
