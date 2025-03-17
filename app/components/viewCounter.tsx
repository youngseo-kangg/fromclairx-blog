import { getViewsCount, incrementView } from "queries/db";

type Props = {
  slug: string;
};

export const ViewCounter = async ({ slug }: Props) => {
  await incrementView(slug);
  const views = await getViewsCount();
  const viewCount = views.find((view) => view.slug === slug)?.count ?? 0;

  return (
    <p className="text-sm text-neutral-600 dark:text-neutral-400">
      {viewCount.toLocaleString()} views
    </p>
  );
};
