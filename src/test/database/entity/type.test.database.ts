import Type from "../../../entities/Type.entity";
import { TypeRepository } from "../../../repositories/type.repository";
import { emojiTest, emojiAlambic } from "../../../utils/emoji.utils";


 export const typeNames = ["Type1", "Type2", "Type3"],
    typeLogos = ["type1.png", "type2.jpeg", "type3.png"],
    typeColors = ["#4d5d53", "#ffa500", "#0e3d2b"];


export const loadTypeData = async () => {
    await Promise.all(typeNames.map(async (name, index) => {
        let newType = new Type();
        newType.name = name;
        newType.logo = typeLogos[index];
        newType.color = typeColors[index];
        try {
            await TypeRepository.save(newType);
        } catch (e) {}
    }));

    console.log(`${emojiAlambic}  Types well added in database ${emojiTest}`);
}