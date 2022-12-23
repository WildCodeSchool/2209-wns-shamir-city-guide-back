import { Resolver, Arg, Mutation, Query } from "type-graphql";
import Tag from "../../entity/Tag.entity";
import * as TagService from "../../service/tag.service";

@Resolver(Tag)
export class TagResolver {
  @Query(() => String)
  async getStatus(): Promise<string> {
    return `🚀 Hello world! 😎`;
  }
  
  @Query(() => [Tag])
  async getAllTags(): Promise<Tag[]> {
    console.log("COUCOU");
    
    const tags: Tag[] = await TagService.getAll();
    return tags;
  }

  @Query(() => Tag)
  async getTagByIdAndName(
    @Arg("id") id: number, 
    @Arg("name") name: string
  ): Promise<Tag | null> {
    const tag: Tag | null = await TagService.getByIdAndName(id, name);
    return tag;
  }

  @Query(() => Tag)
  async getTagById(@Arg("id") id: number): Promise<Tag> {
    return await TagService.getById(id);
  }

  @Query(() => Tag) 
  async getTagByName(@Arg("name") name: string): Promise<Tag> {
    return await TagService.getByName(name);
  }

  @Mutation(() => Tag)
  async createTag(
    @Arg("name") name: string,
    @Arg("icon") icon: string,
  ): Promise<Tag | null | undefined> {
    return await TagService.create(name, icon);
  }

  @Mutation(() => Tag)
  async updateTag(
    @Arg("id") id: number,
    @Arg("name") name: string,
    @Arg("icon") icon: string,
  ): Promise<Tag | null | undefined> {
    return await TagService.update(id, name, icon);
  }

  @Mutation(() => Tag)
  async deleteTag(@Arg("id") id: number): Promise<Tag | undefined> {
    return await TagService.deleteTag(id);
  }
}