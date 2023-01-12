import { loadTagData } from "./entity/tag.test.database";
import { loadTypeData } from "./entity/type.test.database";
import { loadCityData } from "./entity/city.test.database";
import { loadPoiData } from "./entity/poi.test.database";

export const loadData = async () => {
    await loadTagData();
    await loadTypeData();
    await loadCityData(); 
    await loadPoiData();
}