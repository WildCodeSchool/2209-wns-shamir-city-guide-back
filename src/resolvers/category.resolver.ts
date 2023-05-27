import { Resolver, Arg, Mutation, Query, Authorized } from "type-graphql";
import Category from "../entities/Category.entity";
import {
  validateIdInput,
  validateNameInput,
} from "../validators/common.validator";
import * as CategoryService from "../services/category.service";
import {
  CategoryValidator,
  validateCreationCategoryInput,
  validateUpdateCategoryInput,
} from "../validators/entities/category.validator.entity";
import { CategoryType } from "../types/category.type";
import { UserRoles } from "../utils/constants.utils";

@Resolver(Category)
export class CategoryResolver {
  @Authorized([UserRoles.SUPER_ADMIN])
  @Query(() => [Category])
  async getAllCategories(): Promise<Category[]> {
    const categories: Category[] = await CategoryService.getAll();
    return categories.sort((a: Category, b: Category) => a.name.localeCompare(b.name));
  }
  
  @Authorized([UserRoles.SUPER_ADMIN])
  @Query(() => Category)
  async getCategoryByName(@Arg("name") name: string): Promise<Category> {
    const verifiedName: string = await validateNameInput(name);
    return await CategoryService.getByName(verifiedName);
  }
  
  @Authorized([UserRoles.SUPER_ADMIN])
  @Query(() => Category)
  async getCategoryById(@Arg("id") id: number): Promise<Category> {
    const verifiedId: number = await validateIdInput(id);
    return await CategoryService.getById(verifiedId);
  }
    
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

  @Authorized([UserRoles.SUPER_ADMIN])
  @Mutation(() => Category)
  async updateCategory(
    @Arg("category") category: CategoryType
  ): Promise<Category> {
    const verifiedData: CategoryValidator = await validateUpdateCategoryInput(
      category
    );
    return await CategoryService.update(verifiedData);
  }

  @Authorized([UserRoles.SUPER_ADMIN])
  @Mutation(() => Category)
  async deleteCategory(@Arg("id") id: number): Promise<Category> {
    const verifiedId = await validateIdInput(id);
    return await CategoryService.deleteCategory(verifiedId);
  }
}
