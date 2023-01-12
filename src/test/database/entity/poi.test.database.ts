import Poi from "../../../entity/PointOfInterest.entity";
import City from "../../../entity/City.entity";
import { PoiRepository } from "../../../repository/poi.repository";
import { CityRepository } from "../../../repository/city.repository";
import { emojiTest, emojiAlambic } from "../../../utils/emoji.utils";
import Type from "../../../entity/Type.entity";
import { TypeRepository } from "../../../repository/type.repository";


 export const poiNames = ["Musée du Louvre", "Arc de Triomphe", "La Tour Eiffel", "Rue de la Soif", "Gare Saint Charles"],
    poiAddress = ["Rue de Rivoli, 75001 Paris", "Pl. Charles de Gaulle, 75008 Paris", "Champ de Mars, 5 Av. Anatole France, 75007 Paris", "rue saint michel 35000 Rennes", "GARE SAINT CHARLES - 118000 Marseille"],
    poiLatitudes = ["48.8611473", "48.8737791", "48.8582602", "48.1140518", "43.302426"],
    poiLongitudes = ["2.3380277", "2.2950372", "2.2944991", "-1.6813832", "5.3816767"],
    poiPictures = ["musee-du-louvre.png", "arc-de-triomphe.png", "tour-eiffel.png", "rue-de-la-soif.png", "gare-saint-charles.png"];


export const loadPoiData = async () => {
    const Paris: City | null = await CityRepository.findOneBy({ name: "Paris" });
    const Rennes: City | null = await CityRepository.findOneBy({ name: "Rennes" });
    const Marseille: City | null = await CityRepository.findOneBy({ name: "Marseille" });
    const type1: Type | null = await TypeRepository.findOneBy({ name: "Type1" });
    const type2: Type | null = await TypeRepository.findOneBy({ name: "Type2" });
    const type3: Type | null = await TypeRepository.findOneBy({ name: "Type3" });
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
        } else if (index === 3) {
            if (Rennes !== null) newPoi.city = Rennes;
            if (type2 !== null) newPoi.type = type2;
        } else if (index === 4) {
            if (Marseille !== null) newPoi.city = Marseille;
            if (type3 !== null) newPoi.type = type3;
        }
        
        try {
            await PoiRepository.save(newPoi);
        } catch (e) {}
    }));

    console.log(`${emojiAlambic}  Points of interest well added in database ${emojiTest}`);
}