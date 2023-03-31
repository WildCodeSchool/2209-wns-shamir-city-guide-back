import Circuit from "../../../entities/Circuit.entity";
import City from "../../../entities/City.entity";
import Poi from "../../../entities/PointOfInterest.entity";
import Category from "../../../entities/Category.entity";
import { CityRepository } from "../../../repositories/city.repository";
import { CategoryRepository } from "../../../repositories/category.repository";
import { PoiRepository } from "../../../repositories/poi.repository";
import { emojiTest, emojiAlambic } from "../../../utils/emoji.utils";
import PointOfInterest from "../../../entities/PointOfInterest.entity";
import { CircuitRepository } from "../../../repositories/circuit.repository";


export const circuitsNames = ["Promenade de Paris", "Une visite bouillabesque", "À Nantes ça chauffe! Houuu!!"],
    circuitsPicture = [
        "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/P1030047_Paris_II_Rue_de_Richelieu_rwk.JPG/1200px-P1030047_Paris_II_Rue_de_Richelieu_rwk.JPG",
        "https://thumbs.dreamstime.com/b/yacht-club-marseille-france-yachts-boats-parked-port-111118228.jpg",
        "https://metropole.nantes.fr/files/images/emploi/vue-nantes-675.jpg"
    ],
    circuitsdescription = [
        "Je vous propose une sacré visite de Paris, venez, on est bien!",
        "Ha le sud, tant de soleil et biientôt la secheresse, mais que dis-je? Elle est déjà là haha!",
        "Un petit tour culturel des essentiels de la Nantes"
    ],
    circuitsPrice = [0, 3, 50];


export const loadCircuitData = async () => {
    const Paris: City | null = await CityRepository.findOneBy({ name: "Paris" });
    const Marseille: City | null = await CityRepository.findOneBy({ name: "Marseille" });
    const Nantes: City | null = await CityRepository.findOneBy({ name: "Nantes" });

    const Culturel: Category | null = await CategoryRepository.findOneBy({ name: "Culturel" });
    const Divertissement: Category | null = await CategoryRepository.findOneBy({ name: "Divertissement" });

    const Louvre: PointOfInterest | null = await PoiRepository.findOneBy({ name: "Musée du Louvre" });
    const TourEiffel: PointOfInterest | null = await PoiRepository.findOneBy({ name: "La Tour Eiffel" });
    const ArcDeTriomphe: PointOfInterest | null = await PoiRepository.findOneBy({ name: "Arc de Triomphe" });
    const GareSaintCharles: PointOfInterest | null = await PoiRepository.findOneBy({ name: "Gare Saint Charles" });
    const ChateauDucsDeBretagne: PointOfInterest | null = await PoiRepository.findOneBy({ name: "Château des ducs de Bretagne" });
    const MuseumHistoireNaturelleNantes: PointOfInterest | null = await PoiRepository.findOneBy({ name: "Muséum d'histoire naturelle de Nantes" });
    const MuseeArtNantes: PointOfInterest | null = await PoiRepository.findOneBy({ name: "Musée d'art de Nantes" });
    const DorcelStoreNantes: PointOfInterest | null = await PoiRepository.findOneBy({ name: "Dorcel Store de Nantes" });

    await Promise.all(circuitsNames.map(async (name, index) => {
        let newCircuit = new Circuit();
        newCircuit.name = name;
        newCircuit.picture = circuitsPicture[index],
        newCircuit.description = circuitsdescription[index]; 
        newCircuit.price = circuitsPrice[index];
        if (index === 0) {
            if (Paris !== null) newCircuit.city = Paris;
            if (Culturel !== null) newCircuit.category = Culturel;
            if (
                Louvre !== null &&
                TourEiffel !== null &&
                ArcDeTriomphe !== null
            ) newCircuit.pointsOfInterest = [Louvre, TourEiffel, ArcDeTriomphe];
        } else if (index === 1) {
            if (Marseille !== null) newCircuit.city = Marseille;
            if (Divertissement !== null) newCircuit.category = Divertissement;
            if (GareSaintCharles !== null) newCircuit.pointsOfInterest = [GareSaintCharles];
        } else if (index === 2) {
            if (Nantes !== null) newCircuit.city = Nantes;
            if (Culturel !== null) newCircuit.category = Culturel;
            if (
                ChateauDucsDeBretagne !== null &&
                MuseumHistoireNaturelleNantes &&
                MuseeArtNantes !== null &&
                DorcelStoreNantes !== null
            ) newCircuit.pointsOfInterest = [
                ChateauDucsDeBretagne,
                MuseumHistoireNaturelleNantes,
                MuseeArtNantes,
                DorcelStoreNantes
            ];
        }
        
        try {
            await CircuitRepository.save(newCircuit);
        } catch (e) {}
    }));

    console.log(`${emojiAlambic}  Circuits well added in database ${emojiTest}`);
}