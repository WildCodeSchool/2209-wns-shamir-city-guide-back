import Tag from "../../../entities/Tag.entity";
import { TagRepository } from "../../../repositories/tag.repository";
import { emojiTest, emojiAlambic } from "../../../utils/emoji.utils";


 export const tagNames = ["Concert", "Musées", "Promenade", "Restaurant", "Visite"],
    tagIcons = ["https://concert.png", "https://musées.jpeg", "https://promenade.pngmusées.jpeg", "https://restaurant.jpg", "https://Visite.png"];


export const loadTagData = async () => {
    await Promise.all(tagNames.map(async (name, index) => {
        let newTag = new Tag();
        newTag.name = name;
        newTag.icon = tagIcons[index];
        try {
            await TagRepository.save(newTag);
        } catch (e) {}
    }));

    console.log(`${emojiAlambic}  Tags well added in database ${emojiTest}`);
}