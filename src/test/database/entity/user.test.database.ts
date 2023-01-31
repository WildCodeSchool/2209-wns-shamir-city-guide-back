import * as argon2 from "argon2";
import Role from "../../../entity/Role.entity";
import User from "../../../entity/User.entity";
import { RoleRepository } from "../../../repository/role.repository";
import { UserRepository } from "../../../repository/user.repository";
import { emojiTest, emojiAlambic } from "../../../utils/emoji.utils";


export const userUsernames = ["Shirley", "Christelle", "Medhi", "Thibault"],
  userEmails = ["shirley@yopmail.fr", "christelle@gmail.com", "medhi@hotmail.fr", "thibault@gmail.com"],
  userPwds = ["Shirley2023$", "Christelle2023$", "Medhi2023$", "Thibault2023$"];
  
export const loadUserData = async () => {
    const SUPER_ADMIN: Role | null = await RoleRepository.findOneBy({ name: "SUPER_ADMIN" });
    const CITY_ADMIN: Role | null = await RoleRepository.findOneBy({ name: "CITY_ADMIN" });
    const CONTRIBUTOR: Role | null = await RoleRepository.findOneBy({ name: "CONTRIBUTOR" });
    const USER: Role | null = await RoleRepository.findOneBy({ name: "USER" });

    await Promise.all(
        userUsernames.map(async (username, index) => {
        let newUser = new User();
        newUser.username = username;
        newUser.email = userEmails[index];
        newUser.hashedPassword = await argon2.hash(userPwds[index]);
        if (index === 0) {
            if (USER !== null) newUser.roles = [USER];
        }
        else if (index > 0 && index < 2) {
            if (
                CITY_ADMIN !== null && 
                CONTRIBUTOR !== null && 
                USER !== null
            ) newUser.roles = [CITY_ADMIN, CONTRIBUTOR, USER];
        }
        else if (index >= 2) {
            if (
                SUPER_ADMIN !== null &&
                CITY_ADMIN !== null && 
                CONTRIBUTOR !== null && 
                USER !== null
            ) newUser.roles = [SUPER_ADMIN, CITY_ADMIN, CONTRIBUTOR, USER];        
        }
            
        try {
            await UserRepository.save(newUser);
        } catch (e) {}
        })
    );

    console.log(`${emojiAlambic}  Users well added in database ${emojiTest}`);
};
