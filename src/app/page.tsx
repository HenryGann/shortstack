'use client';

import FormData from '@/types/forms';
import graphqlClient from '@/util/graphqlClient';

import { createNewMapping } from '@/util/graphqlRequests';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { ToastContainer, toast } from 'react-toastify';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy, faRotateLeft } from '@fortawesome/free-solid-svg-icons';

export default function Home() {
  const [ short, setShort ] = useState < string | null>(null);

  const schema = z.object({
    long: z.string()
      .regex(/^(https?:\/\/)?(www\.)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/[^\s]*)?$/, { message: 'Please enter a valid url' })
      .nonempty({ message: 'A URL is required' })
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const createShort = ({ long }: FormData) => {
    graphqlClient.mutate({ mutation: createNewMapping, variables: { long } })
      .then((res) => {
        const { createNewMapping: { success, message } } = res.data;
        if (success){
          setShort(`${window.location.origin}/${message}`);
        }
        else{
          toast.error(message);
        }
      });
  };

  const handleClear = () => {
    setShort(null);
    reset();
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black px-6">
      <h1 className="text-3xl font-bold text-white mb-6">Shortstack - A URL Shortener</h1>

      {short ? (
        <div className="flex flex-col items-center gap-4 bg-gray-900 p-6 rounded-xl shadow-lg w-full max-w-md">
          <div className="flex items-center bg-gray-700 text-white p-3 rounded-lg w-full">
            <span className="truncate">{short}</span>
            <div className="ml-auto flex gap-2">
              <button
                className="bg-green-500 hover:bg-green-600 text-white font-semibold px-3 py-1 rounded-lg cursor-pointer"
                onClick={() => {
                  navigator.clipboard.writeText(short);
                  toast.success('Saved to clipboard', { autoClose: 500 });
                }}
              >
                <FontAwesomeIcon icon={faCopy} />
              </button>
              <button
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-3 py-1 rounded-lg transition cursor-pointer"
                onClick={handleClear}
              >
                <FontAwesomeIcon icon={faRotateLeft} style={{ color: '#fff', }} />
              </button>
            </div>
          </div>
        </div>

      ) :
        <form
          className="flex flex-col items-center gap-4 bg-gray-900 p-6 rounded-xl shadow-lg w-full max-w-md"
          onSubmit={handleSubmit((data) => createShort(data))}
        >
          <input
            className="w-full p-3 rounded-lg bg-gray-700 text-white placeholder-gray-400 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500"
            {...register('long')}
            placeholder="Enter a long URL"
          />
          {errors.long && <p className="text-red-400">{errors.long.message}</p>}
          <button
            className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-lg transition"
            type="submit"
          >
          Shorten
          </button>
        </form>
      }
      <ToastContainer/>
    </div>
  );
}
