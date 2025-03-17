import { GetServerSideProps } from 'next';
import graphqlClient from '@/util/graphqlClient';
import { getByShort } from '@/util/graphqlRequests';
import { SHORT_LENGTH } from '@/util/url';

// Fetches long url
const getLongUrl = async (short: string): Promise<string | null> => {
  try {
    const res = await graphqlClient.query({
      query: getByShort,
      variables: { short },
    });

    const { getByShort: { long } } = res.data;
    return long || null;
  } catch (error) {
    console.error('Error fetching long URL:', error);
    return null;
  }
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const short = params?.short as string;

  // Checks for a valid URL else returns home
  if (!short || short.length !== SHORT_LENGTH) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  const longUrl = await getLongUrl(short);

  // Handle redirection
  if (longUrl) {
    return {
      redirect: {
        destination: longUrl,
        permanent: false,
      },
    };
  }
  return {
    redirect: {
      destination: '/',
      permanent: false,
    },
  };
};

export default function ShortPage() {
  return null;
}