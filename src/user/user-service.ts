import { IUser } from "./user-types";
import userModel from "./user-model";
import createHttpError from "http-errors";
import bcrypt from "bcrypt";

export class UserService {
    // async create(user: IUser) {
    //     return await userModel.create(user);
    // }

    // constructor(private userRepository: Repository<User>) {}

    async create({
        username,
        firstName,
        middleName,
        lastName,
        email,
        password,
        profilePic,
        mobileNumber,
        dateOfBirth,
        address,
        role,
    }: IUser) {
        // const user = await userModel.findOne({ email });
        // if (user) {
        //     const err = createHttpError(400, "Email is already exists!");
        //     throw err;
        // }
        // Hash the password
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        try {
            // return await productModel.create(product);
            return await userModel.create({
                username,
                email,
                password: hashedPassword,
                mobileNumber,
                firstName,
                middleName,
                lastName,
                dateOfBirth,
                profilePic,
                address,
                role,
            });
        } catch (err: any) {
            const errMsg: any =
                // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
                err?.message || "Failed to store the data in the database";
            const error = createHttpError(500, errMsg);
            throw error;
        }
    }
}
