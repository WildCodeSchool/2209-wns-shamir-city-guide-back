import { Resolver, Arg, Mutation, Query } from "type-graphql";
import Tag from "../../dao/entity/Tag.entity";
import * as TagService from "../../dao/service/tag.service";

@Resolver(Tag)
export class TagResolver {
  @Query(() => [Tag])
  async getAllTag(): Promise<Tag[]> {
    return await TagService.getAll();
  }

  @Query(() => Tag)
  async getTagById(@Arg("id") id: number): Promise<Tag | null> {
    return await TagService.getById(id);
  }

  @Query(() => Tag)
  async getTagByName(@Arg("name") name: string): Promise<Tag | null> {
    return await TagService.getByName(name);
  }

  @Mutation(() => Tag)
  async createTag(@Arg("name") name: string): Promise<Tag | null | undefined> {
    return await TagService.create(name);
  }

  @Mutation(() => Tag)
  async updateTag(
    @Arg("id") id: number,
    @Arg("name") name: string
  ): Promise<Tag | null | undefined> {
    return await TagService.update(id, name);
  }

  @Mutation(() => Tag)
  async deleteTag(@Arg("id") id: number): Promise<Tag | undefined> {
    return await TagService.deleteTag(id);
  }
}
