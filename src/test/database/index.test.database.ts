import { loadRoleData} from "./entity/role.test.database";
import { loadUserData } from "./entity/user.test.database";
import { loadTagData } from "./entity/tag.test.database";
import { loadTypeData } from "./entity/type.test.database";
import { loadCategoryData } from "./entity/category.test.database";
import { loadCityData } from "./entity/city.test.database";
import { loadPoiData } from "./entity/poi.test.database";

export const loadData = async () => {
  await loadRoleData();
  await loadUserData();
  await loadTagData();
  await loadTypeData();
  await loadCategoryData();
  await loadCityData();
  await loadPoiData();
};
