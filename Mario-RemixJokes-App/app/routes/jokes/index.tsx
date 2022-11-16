import type { LoaderFunction } from "@remix-run/node";
import { useLoaderData, Link } from "@remix-run/react";
import type { Joke } from "@prisma/client";
import { db } from "~/utils/db.server";

type LoaderData = { randomJoke: Joke}

export let loader: LoaderFunction = async () => {
  const count = await db.joke.count();
  const randomRowNumber = Math.floor(Math.random() * count);
  const [randomJoke] = await db.joke.findMany({
    take: 1,
    skip: randomRowNumber,
  }); 
  let data: LoaderData = { randomJoke}
  return data
}

export default function JokesIndexRoute() {
    let data = useLoaderData<LoaderData>()
    return (
      <div>
        <p>Here's a random joke:</p>
        <p>
          {data.randomJoke.content}
        </p>
      </div>
    );
  }