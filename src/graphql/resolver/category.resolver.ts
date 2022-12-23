import { Resolver, Arg, Mutation, Query } from "type-graphql";
import Category from "../../entity/Category.entity";
import * as CategoryService from "../../service/category.service";

@Resolver(Category)
export class CategoryResolver {
  @Query(() => [Category])
  async getAllCategories(): Promise<Category[]> {
    const categories: Category[] = await CategoryService.getAll();
    return categories;
  }

  @Query(() => Category)
  async getCategoryByName(@Arg("name") name: string): Promise<Category> {
    return await CategoryService.getByName(name);
  }

  @Query(() => Category)
  async getCategoryById(@Arg("id") id: number): Promise<Category> {
    return await CategoryService.getById(id);
  }

  @Query(() => Category)
  async getCategoryByIcon(@Arg("icon") icon: string): Promise<Category> {
    return await CategoryService.getByIcon(icon);
  }

  @Mutation(() => Category)
  async createCategory(
    @Arg("name") name: string,
    @Arg("color") color: string,
    @Arg("icon") icon: string
  ): Promise<Category> {
    return await CategoryService.create(name, color, icon);
  }

  @Mutation(() => Category)
  async updateCategory(
    @Arg("id") id: number,
    @Arg("name") name: string,
    @Arg("color") color: string,
    @Arg("icon") icon: string
  ): Promise<Category> {
    return await CategoryService.create(name, color, icon);
  }

  @Mutation(() => Category)
  async deleteCategory(@Arg("id") id: number): Promise<Category> {
    return await CategoryService.deleteCategory(id);
  }
}
