"use server";

import { unstable_noStore as noStore } from "next/cache";
import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.POSTGRES_URL!);

const getViewsCount = async () => {
  if (!process.env.POSTGRES_URL) {
    return [];
  }

  noStore();
  const result = await sql`
    SELECT slug, count FROM blog_views
  `;

  return result;
};

const incrementView = async (slug: string) => {
  noStore();

  await neon(process.env.POSTGRES_URL!)`
  INSERT INTO blog_views (slug, count)
  VALUES (${slug}, 1)
  ON CONFLICT (slug) 
  DO UPDATE SET count = blog_views.count + 1;
  `;
};

export { getViewsCount, incrementView };
