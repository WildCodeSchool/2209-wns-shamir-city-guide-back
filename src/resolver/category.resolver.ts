import { Resolver, Arg, Mutation, Query, Authorized } from "type-graphql";
import Category from "../entity/Category.entity";
import {
  validateIdInput,
  validateNameInput,
} from "../validator/common.validator";
import * as CategoryService from "../service/category.service";
import {
  CategoryValidator,
  validateCreationCategoryInput,
  validateUpdateCategoryInput,
} from "../validator/entity/category.validator.entity";
import { CategoryType } from "../utils/type/category.utils.type";
import { UserRoles } from "../utils/constants.utils";

@Resolver(Category)
export class CategoryResolver {
  @Query(() => [Category])
  async getAllCategories(): Promise<Category[]> {
    const categories: Category[] = await CategoryService.getAll();
    return categories;
  }
  
  @Query(() => Category)
  async getCategoryByName(@Arg("name") name: string): Promise<Category> {
    const verifiedName: string = await validateNameInput(name);
    return await CategoryService.getByName(verifiedName);
  }
  
  @Query(() => Category)
  async getCategoryById(@Arg("id") id: number): Promise<Category> {
    const verifiedId: number = await validateIdInput(id);
    return await CategoryService.getById(verifiedId);
  }
  
  // @Query(() => Category)
  // async getCategoryByIcon(@Arg("icon") icon: string): Promise<Category> {
  //   const verifiedIcon: string = await validateIconInput(icon);
  //   return await CategoryService.getByIcon(verifiedIcon);
  // }
    
  @Authorized([UserRoles.SUPER_ADMIN])
  @Mutation(() => Category)
  async createCategory(
    @Arg("category") category: CategoryType
  ): Promise<Category> {
    const verifiedData: CategoryValidator = await validateCreationCategoryInput(
      category
    );
    return await CategoryService.create(verifiedData);
  }

  @Authorized([UserRoles.CITY_ADMIN])
  @Mutation(() => Category)
  async updateCategory(
    @Arg("category") category: CategoryType
  ): Promise<Category> {
    const verifiedData: CategoryValidator = await validateUpdateCategoryInput(
      category
    );
    return await CategoryService.update(verifiedData);
  }

  @Authorized([UserRoles.CITY_ADMIN])
  @Mutation(() => Category)
  async deleteCategory(@Arg("id") id: number): Promise<Category> {
    const verifiedId = await validateIdInput(id);
    return await CategoryService.deleteCategory(verifiedId);
  }
}
