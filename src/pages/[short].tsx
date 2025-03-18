import { useEffect } from 'react';
import { useRouter } from 'next/router';
import graphqlClient from '@/util/graphqlClient';
import { getByShort } from '@/util/graphqlRequests';
import { SHORT_LENGTH } from '@/util/url';

export default function ShortPage() {
  const router = useRouter();
  const { short } = router.query;

  useEffect(() => {
    if (!router.isReady) { return; }

    const redirect = async () => {
      if (!short || typeof short !== 'string' || short.length !== SHORT_LENGTH) {
        router.replace('/');
        return;
      }

      try {
        const res = await graphqlClient.query({
          query: getByShort,
          variables: { short },
        });

        const longUrl = res.data?.getByShort?.long || '/';
        router.replace(longUrl);
      } catch (error) {
        console.log(error);
        router.replace('/');
      }
    };

    redirect();
  }, [ short, router, router.isReady ]);

  return (
    <div className='h-full w-full bg-black'/>
  );
}
