import Poi from "../../../entities/PointOfInterest.entity";
import City from "../../../entities/City.entity";
import { PoiRepository } from "../../../repositories/poi.repository";
import { CityRepository } from "../../../repositories/city.repository";
import { emojiTest, emojiAlambic } from "../../../utils/emoji.utils";
import Type from "../../../entities/Type.entity";
import { TypeRepository } from "../../../repositories/type.repository";
import { TagRepository } from "../../../repositories/tag.repository";
import Tag from "../../../entities/Tag.entity";


export const poiNames = [
        "Musée du Louvre",
        "Arc de Triomphe",
        "La Tour Eiffel",
        "Rue de la Soif",
        "Gare Saint Charles",
        "Château des ducs de Bretagne",
        "Muséum d'histoire naturelle de Nantes",
        "Musée d'art de Nantes",
        "Dorcel Store de Nantes"
    ],
    poiAddress = [
        "Rue de Rivoli, 75001 Paris",
        "Pl. Charles de Gaulle, 75008 Paris",
        "Champ de Mars, 5 Av. Anatole France, 75007 Paris",
        "rue saint michel 35000 Rennes",
        "GARE SAINT CHARLES - 118000 Marseille",
        "4 Pl. Marc Elder, 44000 Nantes",
        "12 Rue Voltaire, 44000 Nantes",
        "10 Rue Georges Clemenceau, 44000 Nantes",
        "10 Av. des Lions, 44800 Saint-Herblain"
    ],
    poiLatitudes = [
        "48.8611473",
        "48.8737791",
        "48.8582602",
        "48.1140518",
        "43.302426",
        "47.2160973",
        "47.2125868",
        "47.2192783",
        "47.2477162"
    ],
    poiLongitudes = [
        "2.3380277",
        "2.2950372",
        "2.2944991",
        "-1.6813832",
        "5.3816767",
        "-1.5499959",
        "-1.5647029",
        "-1.5470828",
        "-1.6194985"
    ],
    poiPictures = [
        "https://thumbs.dreamstime.com/b/louvre-winter-tourism-beautiful-view-tourists-visiting-museum-paris-france-cloudy-day-february-63047601.jpg",
        "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/Arc_Triomphe.jpg/708px-Arc_Triomphe.jpg",
        "https://thumbs.dreamstime.com/b/paris-france-vue-panoramique-sur-la-tour-eiffel-%C3%A0-237996803.jpg",
        "https://img.20mn.fr/CrK2qhx8TbSV0RVbIxfhoA/1200x768_rue-saint-michel-rennes-surnommee-rue-soif-lors-trans-musicales-2014",
        "https://img.20mn.fr/ebbf_MCVTL6Ot5tqwY2EGQ/310x190_gare-saint-charles-marseille",
        "https://media.istockphoto.com/id/1433119904/fr/photo/vue-panoramique-du-ch%C3%A2teau-des-ducs-de-bretagne-%C3%A0-nantes-france.jpg?s=612x612&w=0&k=20&c=VLf9Ud2cGqRk5GKepKwCo6_0G4uJg4Dm1qsjn4MCWns=",
        "https://www.francetvinfo.fr/pictures/5IyJZXrQD9wJVx7lvRPHODaAKKw/fit-in/720x/2020/12/01/php4jbGGK.jpg",
        "https://museedartsdenantes.nantesmetropole.fr/files/live/sites/museedarts/files/3-A%20faire%20au%20musee/nocturnes/Nocturne-2019.jpg",
        "https://media.gettyimages.com/id/133859801/photo/view-of-lingerie-taken-at-a-porno-group-dorcel-store-on-november-19-2011-in-saint-herblain.jpg?s=612x612&w=gi&k=20&c=s0mGyslmXyPlR1gbRkJiCULSV2YTSDQ5EBL_CtpPJEU="
    ];


export const loadPoiData = async () => {
    const Paris: City | null = await CityRepository.findOneBy({ name: "Paris" });
    const Rennes: City | null = await CityRepository.findOneBy({ name: "Rennes" });
    const Marseille: City | null = await CityRepository.findOneBy({ name: "Marseille" });
    const Nantes: City | null = await CityRepository.findOneBy({ name: "Nantes" });

    const Histoire: Type | null = await TypeRepository.findOneBy({ name: "Histoire" });
    const Divertissement: Type | null = await TypeRepository.findOneBy({ name: "Divertissement" });

    const Restaurant: Tag | null = await TagRepository.findOneBy({ name: "Restaurant" });
    const Cafe: Tag | null = await TagRepository.findOneBy({ name: "Café" });
    const Bar: Tag | null = await TagRepository.findOneBy({ name: "Bar" });
    const Monument: Tag | null = await TagRepository.findOneBy({ name: "Monument" });
    const Gallerie: Tag | null = await TagRepository.findOneBy({ name: "Gallerie" });
    const Concert: Tag | null = await TagRepository.findOneBy({ name: "Concert" });
    const Promenade: Tag | null = await TagRepository.findOneBy({ name: "Promenade" });

    console.log(Paris, Rennes, Marseille, Nantes);
    

    await Promise.all(poiNames.map(async (name, index) => {
        let newPoi = new Poi();
        newPoi.name = name;
        newPoi.address = poiAddress[index],
        newPoi.latitude = poiLatitudes[index]; 
        newPoi.longitude = poiLongitudes[index];
        newPoi.picture = poiPictures[index];
        if (index < 3 ) {
            if (Paris !== null) newPoi.city = Paris;
            if (Histoire !== null) newPoi.type = Histoire;
            if (Monument !== null && Promenade !== null) newPoi.tags = [Monument, Promenade];
        } else if (index === 3) {
            if (Rennes !== null) newPoi.city = Rennes;
            if (Divertissement !== null) newPoi.type = Divertissement;
            if (Cafe !== null && Bar !== null && Concert !== null) newPoi.tags = [Cafe, Bar, Concert];
        } else if (index === 4) {
            if (Marseille !== null) newPoi.city = Marseille;
            if (Histoire !== null) newPoi.type = Histoire;
            if (Restaurant !== null && Gallerie !== null) newPoi.tags = [Restaurant, Gallerie]
        } else {
            if (Nantes !== null) newPoi.city = Nantes;
            if (Histoire !== null) newPoi.type = Histoire;
            if (Monument !== null && Promenade !== null) newPoi.tags = [Monument, Promenade]
        }
        
        try {
            await PoiRepository.save(newPoi);
        } catch (e) {}
    }));

    console.log(`${emojiAlambic}  Points of interest well added in database ${emojiTest}`);
}