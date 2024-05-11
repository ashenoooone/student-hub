import clsx from "clsx";
import React from "react";
import { EventType } from "../model/types";

type EventProps = {
  className?: string;
  event: EventType;
};

export const Event = React.memo((props: EventProps) => {
  const { className } = props;
  return <div className={clsx("", className)}></div>;
});

Event.displayName = "Event";
