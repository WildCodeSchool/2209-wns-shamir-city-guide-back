import Type from "../../../entities/Type.entity";
import { TypeRepository } from "../../../repositories/type.repository";
import { emojiTest, emojiAlambic } from "../../../utils/emoji.utils";


export const 
    typeNames = [
        "Histoire", 
        "Nature", 
        "Divertissement",  
        "Restauration",
        "Art",
        "Évènement",
        "Vie nocture"
    ],
    typeLogos = [
        "HistoryEduOutlined", 
        "SpaOutlined", 
        "AttractionsOutlined", 
        "LocalDiningOutlined",
        "PaletteOutlined",
        "EventOutlined",
        "NightlifeOutlined"
    ],
    typeColors = [
        "#8b8378", 
        "#68b253", 
        "#74267e", 
        "#26507e",
        "#a71b29",
        "#9d9e2e",
        "#612ead"
    ];



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