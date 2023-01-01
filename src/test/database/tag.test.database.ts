import Tag from "../../entity/Tag.entity";
import { TagRepository } from "../../repository/tag.repository";
import { emojiTest, emojiAlambic, emojiWarning, emojiExclamation } from "../../utils/emoji.utils";

const tagNames = ["Concert", "Musées", "Promenade", "Restaurant", "Visite"];
const tagIcons = ["concert.png", "musées.jpeg", "", "restaurant.jpg", "Visite.png"];


export const loadTagData = async () => {
    Promise.all(tagNames.map(async (name, index) => {
        let newTag = new Tag();
        newTag.name = name;
        newTag.icon = tagIcons[index];
        try {
            await TagRepository.save(newTag);
        } catch (e) {
            console.log(`${emojiWarning}${emojiExclamation} Error to load tag data: `, e);
        }
    }));

    console.log(`${emojiAlambic}  Tags well added in database ${emojiTest}`);
}