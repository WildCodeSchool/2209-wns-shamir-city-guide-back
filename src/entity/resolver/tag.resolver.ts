import { Resolver, Arg, Mutation, Query } from "type-graphql";
import Tag from "../entity/Tag.entity";
import { validateIdInput, validateNameInput } from "../validator/common.validator";
import * as TagService from "../service/tag.service";
import { validateCreationTagInput, validateUpdateTagInput } from "../validator/entity/tag.validator.entity";


@Resolver(Tag)
export class TagResolver {
  @Query(() => [Tag])
  async getAllTags(): Promise<Tag[]> {
    const tags: Tag[] = await TagService.getAll();
    return tags;
  }

  @Query(() => Tag)
  async getTagById(@Arg("id") id: number): Promise<Tag> {
    const verifiedId: number = await validateIdInput(id);
    return await TagService.getById(verifiedId);
  }

  @Query(() => Tag) 
  async getTagByName(@Arg("name") name: string): Promise<Tag> {  
    const verifiedName: string = await validateNameInput(name);
    return await TagService.getByName(verifiedName);
  }

  @Mutation(() => Tag)
  async createTag(
    @Arg("name") name: string,
    @Arg("icon") icon: string,
  ): Promise<Tag> {
    const verifiedData: Tag = await validateCreationTagInput(name, icon);
    return await TagService.create(verifiedData);
  }

  @Mutation(() => Tag)
  async updateTag(
    @Arg("id") id: number,
    @Arg("name") name: string,
    @Arg("icon") icon: string,
  ): Promise<Tag> {
    const verifiedData: Tag = await validateUpdateTagInput(id, name, icon);
    return await TagService.update(verifiedData);
  }

  @Mutation(() => Tag)
  async deleteTag(@Arg("id") id: number): Promise<Tag> {
    const verifiedId = await validateIdInput(id);
    return await TagService.deleteTag(verifiedId);
  }
}
