import { GetServerSideProps } from 'next';

import { getCookie } from 'cookies-next';
import { Inter } from 'next/font/google';
import { useState, useEffect } from 'react';
import api from '@api/api';
import PunchCard from '@components/dashboard/PunchCard';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {

  const [data, setData] = useState({});

  const testbackendApi = async () => {
    try {
      const res = await api.get("data")
      setData(res.data);
    } catch (error) {
      console.log("see error", error);
    }
  }



  useEffect(() => {
    testbackendApi();
  }, []);


  return (
    <main
      className="pt-[60px]"
    >
      <PunchCard />
    </main>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const token = getCookie("authtoken", { req, res })
  if (!token) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      }
    }
  }

  return {
    props: {}
  }
}