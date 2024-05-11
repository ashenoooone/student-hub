import { EventsService } from "@/entities/events";
import { EventType } from "@/entities/events/model/types";
import { Page } from "@/shared/ui/page";
import { log } from "console";
import { GetStaticProps } from "next";
import { useRouter } from "next/router";

export default function Event() {
  const router = useRouter();
  return <Page>Post: {router.query.id}</Page>;
}

export async function getStaticPaths() {
  try {
    const events = await EventsService.instance.getAll();
    const paths = events.data.map((event) => ({
      params: { id: event.id },
    }));
    return { paths, fallback: "blocking" };
  } catch (e) {
    throw e;
  }
}

export const getStaticProps = (async (context) => {
  const { id } = context.params as { id: string };

  try {
    const event = await EventsService.instance.getEventById({
      params: {
        id,
      },
    });
    return { props: { event: event.data }, revalidate: 15 };
  } catch (e) {
    throw e;
  }
}) satisfies GetStaticProps<{
  event: EventType;
}>;
