import Category from "../../../entities/Category.entity";
import { CategoryRepository } from "../../../repositories/category.repository";
import { emojiTest, emojiAlambic } from "../../../utils/emoji.utils";

export const categoryNames = ["Cat1", "Cat2", "Cat3"],
  categoryIcons = ["https://cat1.png", "https://cat2.png", "https://cat3.png"],
  categoryColors = ["#fff", "#000", "#343434"];
  
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
