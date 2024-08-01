import NewsLetter from "@/components/NewsLetterForm";
import { client } from "@/sanity/lib/client";
import { groq } from "next-sanity";

export const revalidate = 1;


type Hero = {
  heading: string;
};

async function getHero(): Promise<Hero> {
  const query = groq`*[_type == "hero"][0]{
    heading
  }`;
  return await client.fetch(query);
}


export default async function Home() {
  const heroData = await getHero();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-16 bg-gray-50">
      <div className="text-center">
        <h1 className="text-5xl font-extrabold text-gray-900">
          {heroData.heading}
        </h1>
        <p className="mt-4 text-2xl italic text-gray-700">
          Email
          <span className=" font-bold italic text-gray-900"> is</span> {""}
          content
        </p>
      </div>
      <div className="mt-16 w-full  p-8 bg-white rounded-lg shadow-md">
        <NewsLetter />
      </div>
    </div>
  );
}