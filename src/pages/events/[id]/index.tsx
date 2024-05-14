import { EventsService, Event } from "@/entities/events";
import { EventType } from "@/entities/events/model/types";
import { ProjectType } from "@/entities/project";
import { Page } from "@/shared/ui/page";
import { GetStaticProps, InferGetStaticPropsType } from "next";

export default function EventPage(
  props: InferGetStaticPropsType<typeof getStaticProps>
) {
  const { event, eventProjects } = props;

  return (
    <Page>
      <Event eventProjects={eventProjects} event={event} />
    </Page>
  );
}

export async function getStaticPaths() {
  try {
    const events = await EventsService.instance.getAll({
      params: {
        limit: 1000,
        status: "OPEN",
      },
    });
    const paths = events.data.content.map((event) => ({
      params: { id: `${event.id}` },
    }));
    return { paths, fallback: "blocking" };
  } catch (e) {
    console.log(e);
    throw e;
  }
}

export const getStaticProps = (async (context) => {
  const { id } = context.params as { id: string | number };

  try {
    const [event, eventProjects] = await Promise.all([
      EventsService.instance.getEventById({
        params: {
          id,
        },
      }),
      EventsService.instance.getEventProjects({
        params: {
          id: +id,
          limit: 6,
        },
      }),
    ]);
    return {
      props: { event: event.data, eventProjects: eventProjects.data.content },
      revalidate: 15,
    };
  } catch (e) {
    console.log(e);
    throw e;
  }
}) satisfies GetStaticProps<{
  event: EventType;
  eventProjects: ProjectType[];
}>;
