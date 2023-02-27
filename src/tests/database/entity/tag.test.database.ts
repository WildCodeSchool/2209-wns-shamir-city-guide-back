import Tag from "../../../entities/Tag.entity";
import { TagRepository } from "../../../repositories/tag.repository";
import { emojiTest, emojiAlambic } from "../../../utils/emoji.utils";


export const tagNames = [
    "Sports", 
    "Restaurant", 
    "Café", 
    "Bar",
    "Monument",
    "Gallerie", 
    "Cinéma", 
    "Théatre",
    "Concert",
    "Jardin",
    "Promenade",
    "Beach",
    "Shopping"
],
tagIcons = [
    "SportsKabaddiRounded", 
    "RestaurantRounded", 
    "LocalCafeRounded", 
    "LocalBarRounded", 
    "AccountBalanceRounded",
    "CollectionsRounded",
    "LocalMoviesRounded",
    "TheaterComedyRounded",
    "AudiotrackRounded",
    "YardOutlined",
    "DirectionsWalkOutlined",
    "WavesOutlined",
    "ShoppingCartOutlined"
];
   

export const loadTagData = async () => {
    await Promise.all(
        tagNames.map(async (name, index) => {
            let newTag = new Tag();
            newTag.name = name;
            newTag.icon = tagIcons[index];
            try {
                await TagRepository.save(newTag);
            } catch (e) {}
        }));

    console.log(`${emojiAlambic}  Tags well added in database ${emojiTest}`);
}
