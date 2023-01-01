import { Resolver, Arg, Mutation, Query } from "type-graphql";
import Tag from "../../entity/Tag.entity";
import { TagTypeValidator, validateTagInput } from "../../validator/tag.validator";
import * as TagService from "../../service/tag.service";
import { FunctionsFlag } from "../../utils/constants.utils";


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
    const dataToVerify: TagTypeValidator = {id};
    await validateTagInput(FunctionsFlag.GETBYID, dataToVerify);
    return await TagService.getById(id);
  }

  @Query(() => Tag) 
  async getTagByName(@Arg("name") name: string): Promise<Tag> {
    const dataToVerify: TagTypeValidator = {name};  
    await validateTagInput(FunctionsFlag.GETBYNAME, dataToVerify);
    return await TagService.getByName(name);
  }

  @Mutation(() => Tag)
  async createTag(
    @Arg("name") name: string,
    @Arg("icon") icon: string,
  ): Promise<Tag> {
    const dataToVerify: TagTypeValidator = {
      name: name.trim(),
      icon: icon.trim()
    } 
    await validateTagInput(FunctionsFlag.CREATE, dataToVerify);
    const data = new Tag();
    data.name = name.trim();
    data.icon = icon.trim();
    return await TagService.create(data);
  }

  @Mutation(() => Tag)
  async updateTag(
    @Arg("id") id: number,
    @Arg("name") name: string,
    @Arg("icon") icon: string,
  ): Promise<Tag> {
    const dataToVerify: TagTypeValidator = {
      id,
      name: name.trim(),
      icon: icon.trim()
    } 
    await validateTagInput(FunctionsFlag.UPDATE, dataToVerify);
    const data = new Tag();
    data.id = id;
    data.name = name.trim();
    data.icon = icon.trim();
    return await TagService.update(data);
  }

  @Mutation(() => Tag)
  async deleteTag(@Arg("id") id: number): Promise<Tag> {
    const dataToVerify: TagTypeValidator = {id};
    await validateTagInput(FunctionsFlag.GETBYID, dataToVerify);
    return await TagService.deleteTag(id);
  }
}
