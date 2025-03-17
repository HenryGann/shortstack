// pages/[short].tsx
import { GetServerSideProps } from 'next';
import graphqlClient from '@/util/graphqlClient';
import { getByShort } from '@/util/graphqlRequests';

// Function to fetch long URL from GraphQL API
const getLongUrl = async (short: string): Promise<string | null> => {
  try {
    const res = await graphqlClient.query({
      query: getByShort,
      variables: { short },
    });

    const { getByShort: { long } } = res.data;
    return long || null; // Ensure a null value if `long` is undefined
  } catch (error) {
    console.error('Error fetching long URL:', error);
    return null;
  }
};

// Server-side logic to fetch and redirect
export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const short = params?.short as string;
  console.log(short);

  // Validate the `short` parameter
  if (!short || short.length !== 8) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  // Fetch the long URL
  const longUrl = await getLongUrl(short);

  // Redirect to the long URL if found
  if (longUrl) {
    return {
      redirect: {
        destination: longUrl,
        permanent: false, // Use `true` for permanent redirects (301)
      },
    };
  }

  // If no valid long URL found, redirect to home page
  return {
    redirect: {
      destination: '/',
      permanent: false,
    },
  };
};

// This page will never be rendered since we are redirecting in `getServerSideProps`
export default function ShortPage() {
  return null;
}