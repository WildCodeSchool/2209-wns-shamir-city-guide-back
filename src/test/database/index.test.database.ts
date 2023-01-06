import { loadTagData } from "./tag.test.database";
import { loadCityData } from "./city.test.database";

export const loadData = async () => {
    await loadTagData();
    await loadCityData(); 
}