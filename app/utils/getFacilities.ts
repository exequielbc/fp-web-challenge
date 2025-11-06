import facilitiesData from "../../_instructions/facility-checkin-pwa/assets/facilities.json";
import { Facility } from "../_common/_types/facility";

export function getFacilities(): Facility[] {
  return facilitiesData;
}
