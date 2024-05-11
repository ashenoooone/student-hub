import { EventsList } from "@/entities/events";
import { EventsFilters } from "@/features/events/filters";
import { Page } from "@/shared/ui/page";
import { EventsListWithFilters } from "@/widgets/events/event-list-with-filters";

export default function Events() {
  return (
    <Page>
      <EventsListWithFilters />
    </Page>
  );
}
