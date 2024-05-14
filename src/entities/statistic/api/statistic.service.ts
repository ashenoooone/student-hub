import { $api } from "@/shared/api";
export class StatisticService {
  async getAllStatistic(config?: RequestConfig) {
    return $api.get("/statistic", config?.config);
  }

  static instance = new StatisticService();
}
