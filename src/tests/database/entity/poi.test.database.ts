import Poi from "../../../entities/PointOfInterest.entity";
import City from "../../../entities/City.entity";
import { PoiRepository } from "../../../repositories/poi.repository";
import { CityRepository } from "../../../repositories/city.repository";
import { emojiTest, emojiAlambic } from "../../../utils/emoji.utils";
import Type from "../../../entities/Type.entity";
import { TypeRepository } from "../../../repositories/type.repository";
import { TagRepository } from "../../../repositories/tag.repository";
import Tag from "../../../entities/Tag.entity";


 export const poiNames = ["Musée du Louvre", "Arc de Triomphe", "La Tour Eiffel", "Rue de la Soif", "Gare Saint Charles"],
    poiAddress = ["Rue de Rivoli, 75001 Paris", "Pl. Charles de Gaulle, 75008 Paris", "Champ de Mars, 5 Av. Anatole France, 75007 Paris", "rue saint michel 35000 Rennes", "GARE SAINT CHARLES - 118000 Marseille"],
    poiLatitudes = ["48.8611473", "48.8737791", "48.8582602", "48.1140518", "43.302426"],
    poiLongitudes = ["2.3380277", "2.2950372", "2.2944991", "-1.6813832", "5.3816767"],
    poiPictures = ["https://musee-du-louvre.png", "https://arc-de-triomphe.png", "https://tour-eiffel.png", "https://rue-de-la-soif.png", "https://gare-saint-charles.png"];


export const loadPoiData = async () => {
    const Paris: City | null = await CityRepository.findOneBy({ name: "Paris" });
    const Rennes: City | null = await CityRepository.findOneBy({ name: "Rennes" });
    const Marseille: City | null = await CityRepository.findOneBy({ name: "Marseille" });
    const type1: Type | null = await TypeRepository.findOneBy({ name: "Type1" });
    const type2: Type | null = await TypeRepository.findOneBy({ name: "Type2" });
    const type3: Type | null = await TypeRepository.findOneBy({ name: "Type3" });
    const tag1: Tag | null = await TagRepository.findOneBy({ id: 1 });
    const tag2: Tag | null = await TagRepository.findOneBy({ id: 2 });
    const tag3: Tag | null = await TagRepository.findOneBy({ id: 3 });
    const tag4: Tag | null = await TagRepository.findOneBy({ id: 4 });
    const tag5: Tag | null = await TagRepository.findOneBy({ id: 5 });
    await Promise.all(poiNames.map(async (name, index) => {
        let newPoi = new Poi();
        newPoi.name = name;
        newPoi.address = poiAddress[index],
        newPoi.latitude = poiLatitudes[index]; 
        newPoi.longitude = poiLongitudes[index];
        newPoi.picture = poiPictures[index];
        if (index < 3 ) {
            if (Paris !== null) newPoi.city = Paris;
            if (type1 !== null) newPoi.type = type1;
            if (tag1 !== null && tag2 !== null) newPoi.tags = [tag1, tag2];
        } else if (index === 3) {
            if (Rennes !== null) newPoi.city = Rennes;
            if (type2 !== null) newPoi.type = type2;
            if (tag3 !== null) newPoi.tags = [tag3];
        } else if (index === 4) {
            if (Marseille !== null) newPoi.city = Marseille;
            if (type3 !== null) newPoi.type = type3;
            if (
                tag1 !== null &&
                tag4 !== null &&
                tag5 !== null
            ) newPoi.tags = [tag1, tag4, tag5]
        }
        
        try {
            await PoiRepository.save(newPoi);
        } catch (e) {}
    }));

    console.log(`${emojiAlambic}  Points of interest well added in database ${emojiTest}`);
}