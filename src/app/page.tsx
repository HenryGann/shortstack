'use client';
import graphqlClient from '@/util/graphqlClient';
import { getByShort } from '@/util/graphqlRequests';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

export default function Home() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const createShort = ({ long }) => {
    console.log(long);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black px-6">
      <h1 className="text-3xl font-bold text-white mb-6">Shortstack - A URL Shortener</h1>
      <form
        className="flex flex-col items-center gap-4 bg-gray-900 p-6 rounded-xl shadow-lg w-full max-w-md"
        onSubmit={handleSubmit((data) => createShort(data))}
      >
        <input
          className="w-full p-3 rounded-lg bg-gray-700 text-white placeholder-gray-400 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500"
          {...register('long', { required: 'Enter a URL' })}
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
    </div>
  );
}
