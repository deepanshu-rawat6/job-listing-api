import bcrypt from 'bcrypt';
import config from '../config'

export const hashPassword = async (password: string) => {
    const salt = await bcrypt.genSalt(Number(config.SALT_ROUNDS));
    return bcrypt.hash(password, salt);
};

export const comparePassword = async (password: string, hashedPassword: string) => {
    return bcrypt.compare(password, hashedPassword);
};