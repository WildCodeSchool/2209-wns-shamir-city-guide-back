import City from "../../../entity/City.entity";
import User from "../../../entity/User.entity";
import { CityRepository } from "../../../repository/city.repository";
import { UserRepository } from "../../../repository/user.repository";
import { emojiTest, emojiAlambic } from "../../../utils/emoji.utils";


export const cityNames = ["Paris", "Marseille", "Rennes", "Berlin", "Dublin"],
    cityLatitudes = ["48.8588897", "43.2961743", "48.1113387", "52.5170365", "53.3498006"],
    cityLongitudes = ["2.320041", "5.3699525", "-1.6800198", "13.3888599", "-6.2602964"],
    cityPictures = ["paris.png", "marseille.png", "rennes.png", "berlin.png", "dublin.png"];


export const loadCityData = async () => {
    const Shirley: User | null = await UserRepository.findOneBy({ username: "Shirley" });
    const Christelle: User | null = await UserRepository.findOneBy({ username: "Christelle" });
    const Medhi: User | null = await UserRepository.findOneBy({ username: "Medhi" });
    const Thibault: User | null = await UserRepository.findOneBy({ username: "Thibault" });

    await Promise.all(cityNames.map(async (name, index) => {
        let newCity = new City();
        newCity.name = name;
        newCity.latitude = cityLatitudes[index];
        newCity.longitude = cityLongitudes[index];
        newCity.picture = cityPictures[index];

        if (index === 0)
            if (Shirley !== null) newCity.user = Shirley;
        if (index === 1)
            if (Christelle !== null) newCity.user = Christelle;
        if (index === 2)
            if (Medhi !== null) newCity.user = Medhi;
        if (index >= 3)
            if (Thibault !== null) newCity.user = Thibault;

        try {
            await CityRepository.save(newCity);
        } catch (e) {}
    }));

    console.log(`${emojiAlambic}  Cities well added in database ${emojiTest}`);
}