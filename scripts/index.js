import { listRoundsService } from "./list-rounds-service.js";

onload = () => {
  listRoundsService().then((res) => console.log(res));
};
