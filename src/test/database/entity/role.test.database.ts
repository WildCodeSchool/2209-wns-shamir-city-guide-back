import Role from "../../../entity/Role.entity";
import { RoleRepository } from "../../../repository/role.repository";
import { emojiTest, emojiAlambic } from "../../../utils/emoji.utils";


 export const roleNames = ["SUPER_ADMIN", "CITY_ADMIN", "CONTRIBUTOR", "USER"];


export const loadRoleData = async () => {
    await Promise.all(roleNames.map(async (name) => {
        let newRole = new Role();
        newRole.name = name;
        try {
            await RoleRepository.save(newRole);
        } catch (e) {}
    }));

    console.log(`${emojiAlambic}  Roles well added in database ${emojiTest}`);
}