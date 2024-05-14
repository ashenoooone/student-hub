import { EventType } from "@/entities/events/model/types";

export interface AllStatistic {
  statisticPeople: StatisticPeople;
  statisticProject: StatisticProject;
  lastCreatedProjects: LastCreatedProject[];
  topEvent: TopEvent;
  topRole: RoleStatistic;
  rareRole: RoleStatistic;
  findRole: RoleStatistic;
}

export interface StatisticPeople {
  countPeople: number;
}

export type RoleStatistic = {
  name: string;
  count: number;
};

export type LastCreatedProject = {
  id: number;
  avatar: string;
  name: string;
  description: string;
  status: string;
};

export type TopEvent = EventType;

export interface StatisticProject {
  countAllProject: number;
  countAllProjectToday: number;
  countAllProjectPlanned: number;
  countAllProjectOpen: number;
  countAllProjectComleted: number;
}

export type GetAllStatisticsResponse = AllStatistic;
