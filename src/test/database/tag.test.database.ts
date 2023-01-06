import Tag from "../../entity/Tag.entity";
import { TagRepository } from "../../repository/tag.repository";
import { emojiTest, emojiAlambic } from "../../utils/emoji.utils";


 export const tagNames = ["Concert", "Musées", "Promenade", "Restaurant", "Visite"],
    tagIcons = ["concert.png", "musées.jpeg", "", "restaurant.jpg", "Visite.png"];


export const loadTagData = async () => {
    Promise.all(tagNames.map(async (name, index) => {
        let newTag = new Tag();
        newTag.name = name;
        newTag.icon = tagIcons[index];
        try {
            await TagRepository.save(newTag);
        } catch (e) {}
    }));

    console.log(`${emojiAlambic}  Tags well added in database ${emojiTest}`);
}