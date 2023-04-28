import City from "../../../entities/City.entity";
import User from "../../../entities/User.entity";
import { CityRepository } from "../../../repositories/city.repository";
import { UserRepository } from "../../../repositories/user.repository";
import { emojiTest, emojiAlambic } from "../../../utils/emoji.utils";


export const cityNames = ["Paris", "Marseille", "Rennes", "Nantes"],
    cityLatitudes = ["48.8588897", "43.2961743", "48.1113387", "47.21829365748452"],
    cityLongitudes = ["2.320041", "5.3699525", "-1.6800198", "-1.5522667227281854"],
    cityPictures = [
        "https://c4.wallpaperflare.com/wallpaper/340/910/565/cities-paris-building-city-wallpaper-preview.jpg",
        "https://thumbs.dreamstime.com/b/aerial-view-marseille-city-harbor-12156820.jpg",
        "https://media.istockphoto.com/id/1127316754/photo/city-hall-plaza-of-rennes-with-people-enjoying-music.jpg?s=612x612&w=0&k=20&c=jj0Hss9OHJc0wsB5h48LVN6CKNJ5zs-ehBR0O-gfqxQ=",
        "https://thumbs.dreamstime.com/b/aerial-view-nantes…-buildings-wide-avenue-sunny-weather-95712012.jpg"
    ];


export const loadCityData = async () => {
    const Shirley: User | null = await UserRepository.findOneBy({ username: "Shirley" });
    const Christelle: User | null = await UserRepository.findOneBy({ username: "Christelle" });
    const Mehdi: User | null = await UserRepository.findOneBy({ username: "Mehdi" });
    const Thibault: User | null = await UserRepository.findOneBy({ username: "Thibault" });

    await Promise.all(cityNames.map(async (name, index) => {
        let newCity = new City();
        newCity.name = name;
        newCity.latitude = cityLatitudes[index];
        newCity.longitude = cityLongitudes[index];
        newCity.picture = cityPictures[index];

        if (index === 0)
            if (Shirley !== null && name === "Paris") newCity.user = Shirley;
        if (index === 1)
            if (Christelle !== null && name === "Marseille") newCity.user = Christelle;
        if (index === 2)
            if (Thibault !== null && name === "Rennes") newCity.user = Thibault;
        if (index === 3)
            if (Mehdi !== null && name === "Nantes") newCity.user = Mehdi;
        try {
            await CityRepository.save(newCity);
        } catch (e) {}
    }));

    console.log(`${emojiAlambic}  Cities well added in database ${emojiTest}`);
}