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


export const circuitsNames = ["Promenade de Paris", "Une vise bouillabesque"],
    circuitsPicture = [
        "https://cdn.sortiraparis.com/images/80/83517/753564-visuel-paris-tour-eiffel-rue.jpg, 75001 Paris",
        "https://www.marseille.fr/sites/default/files/styles/custom_poster_768x529/public/contenu/mairie/vue-generale-de-marseille_1920x600.jpg?itok=pMsl9Rvw"
    ],
    circuitsdescription = ["Je vous propose une sacré visite de Paris, venez, on est bien!", "Ha le sud, tant de soleil et biientôt la secheresse, mais que dis-je? Elle est déjà là haha!"],
    circuitsPrice = [0, 3];


export const loadCircuitData = async () => {
    const Paris: City | null = await CityRepository.findOneBy({ name: "Paris" });
    const Marseille: City | null = await CityRepository.findOneBy({ name: "Marseille" });
    const cat1: Category | null = await CategoryRepository.findOneBy({ name: "Cat1" });
    const cat2: Category | null = await CategoryRepository.findOneBy({ name: "Cat2" });
    const Louvre: PointOfInterest | null = await PoiRepository.findOneBy({ name: "Musée du Louvre" });
    const TourEiffel: PointOfInterest | null = await PoiRepository.findOneBy({ name: "La Tour Eiffel" });
    const ArcDeTriomphe: PointOfInterest | null = await PoiRepository.findOneBy({ name: "Arc de Triomphe" });
    const GareSaintCharles: PointOfInterest | null = await PoiRepository.findOneBy({ name: "Gare Saint Charles" });

    await Promise.all(circuitsNames.map(async (name, index) => {
        let newCircuit = new Circuit();
        newCircuit.name = name;
        newCircuit.picture = circuitsPicture[index],
        newCircuit.description = circuitsdescription[index]; 
        newCircuit.price = circuitsPrice[index];
        if (index === 0) {
            if (Paris !== null) newCircuit.city = Paris;
            if (cat1 !== null) newCircuit.category = cat1;
            if (
                Louvre !== null && 
                TourEiffel !== null &&
                ArcDeTriomphe !== null
            ) newCircuit.pointsOfInterest = [Louvre, TourEiffel, ArcDeTriomphe];
        } else {
            if (Marseille !== null) newCircuit.city = Marseille;
            if (cat2 !== null) newCircuit.category = cat2;
            if (GareSaintCharles !== null) newCircuit.pointsOfInterest = [GareSaintCharles];
        } 
        
        try {
            await CircuitRepository.save(newCircuit);
        } catch (e) {}
    }));

    console.log(`${emojiAlambic}  Circuits well added in database ${emojiTest}`);
}