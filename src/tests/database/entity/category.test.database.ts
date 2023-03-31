import Category from "../../../entities/Category.entity";
import { CategoryRepository } from "../../../repositories/category.repository";
import { emojiTest, emojiAlambic } from "../../../utils/emoji.utils";

export const 
  categoryNames = [
    "Culturel", 
    "Nature", 
    "Gastronomie", 
    "Divertissement",
    "Sportif"
  ],
  categoryIcons = [
    "ChangeHistoryOutlined", 
    "EmojiNatureOutlined", 
    "TableRestaurantOutlined",
    "TheaterComedyOutlined",
    "SportsHandballOutlined"
  ],
  categoryColors = [
    "#e06666", 
    "#5c9665", 
    "#660033",
    "#9900ff",
    "#0066ff"
  ];
  
export const loadCategoryData = async () => {
  await Promise.all(
    categoryNames.map(async (name, index) => {
      let newCategory = new Category();
      newCategory.name = name;
      newCategory.icon = categoryIcons[index];
      newCategory.color = categoryColors[index];
      try {
        await CategoryRepository.save(newCategory);
      } catch (e) {}
    })
  );

  console.log(`${emojiAlambic}  Categories well added in database ${emojiTest}`);
};
