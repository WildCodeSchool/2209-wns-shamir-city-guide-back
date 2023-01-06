import City from "../../entity/City.entity";
import { CityRepository } from "../../repository/city.repository";
import { emojiTest, emojiAlambic } from "../../utils/emoji.utils";


 export const cityNames = ["Paris", "Marseille", "Rennes", "Berlin", "Dublin"],
    cityLatitudes = ["1221.21221", "2422.3694", "254.9987", "789.654", "321.852"],
    cityLongitudes = ["963.258", "852.128", "456.897", "375.951", "368.156"],
    cityPictures = ["paris.png", "marseille.png", "rennes.png", "berlin.png", "dublin.png"];


export const loadCityData = async () => {
    Promise.all(cityNames.map(async (name, index) => {
        let newCity = new City();
        newCity.name = name;
        newCity.latitude = cityLatitudes[index];
        newCity.longitude = cityLongitudes[index];
        newCity.picture = cityPictures[index];
        try {
            await CityRepository.save(newCity);
        } catch (e) {}
    }));

    console.log(`${emojiAlambic}  Cities well added in database ${emojiTest}`);
}