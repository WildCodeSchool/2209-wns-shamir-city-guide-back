import { Resolver, Arg, Mutation, Query, Authorized } from "type-graphql";
import Tag from "../entities/Tag.entity";
import {
  validateIdInput,
  validateNameInput,
} from "../validators/common.validator";
import * as TagService from "../services/tag.service";
import {
  TagValidator,
  validateCreationTagInput,
  validateUpdateTagInput,
} from "../validators/entities/tag.validator.entity";
import { TagType } from "../types/tag.type";
import { UserRoles } from "../utils/constants.utils";


@Resolver(Tag)
export class TagResolver {
  @Query(() => [Tag])
  async getAllTags(): Promise<Tag[]> {
    const tags: Tag[] = await TagService.getAll();    
    return tags.sort((a: Tag, b: Tag) => a.name.localeCompare(b.name));
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

  @Authorized([UserRoles.SUPER_ADMIN])
  @Mutation(() => Tag)
  async createTag(@Arg("tag") tag: TagType): Promise<Tag> {
    const verifiedData: TagValidator = await validateCreationTagInput(tag);
    return await TagService.create(verifiedData);
  }

  @Authorized([UserRoles.SUPER_ADMIN])
  @Mutation(() => Tag)
  async updateTag(@Arg("tag") tag: TagType): Promise<Tag> {
    const verifiedData: TagValidator = await validateUpdateTagInput(tag);
    return await TagService.update(verifiedData);
  }
  
  @Authorized([UserRoles.SUPER_ADMIN])
  @Mutation(() => Tag)
  async deleteTag(@Arg("id") id: number): Promise<Tag> {
    const verifiedId = await validateIdInput(id);
    return await TagService.deleteTag(verifiedId);
  }
}
