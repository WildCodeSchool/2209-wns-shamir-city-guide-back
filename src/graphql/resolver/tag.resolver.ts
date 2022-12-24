import { Resolver, Arg, Mutation, Query } from "type-graphql";
import Tag from "../../entity/Tag.entity";
import * as TagService from "../../service/tag.service";
import { formatString } from "../../utils/string.utils";

@Resolver(Tag)
export class TagResolver {
  @Query(() => String)
  async getStatus(): Promise<string> {
    return `🚀 Hello world! 😎`;
  }
  
  @Query(() => [Tag])
  async getAllTags(): Promise<Tag[]> {
    const tags: Tag[] = await TagService.getAll();
    return tags;
  }

  @Query(() => Tag)
  async getTagById(@Arg("id") id: number): Promise<Tag> {
    return await TagService.getById(id);
  }

  @Query(() => Tag) 
  async getTagByName(@Arg("name") name: string): Promise<Tag> {
    return await TagService.getByName(formatString(name));
  }

  @Mutation(() => Tag)
  async createTag(
    @Arg("name") name: string,
    @Arg("icon") icon: string,
  ): Promise<Tag> {
    return await TagService.create(formatString(name), icon);
  }

  @Mutation(() => Tag)
  async updateTag(
    @Arg("id") id: number,
    @Arg("name") name: string,
    @Arg("icon") icon: string,
  ): Promise<Tag> {
    return await TagService.update(id, formatString(name), icon);
  }

  @Mutation(() => Tag)
  async deleteTag(@Arg("id") id: number): Promise<Tag> {
    return await TagService.deleteTag(id);
  }
}
