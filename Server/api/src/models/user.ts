import { Schema, model, Document } from 'mongoose'
import { hash, compare } from 'bcryptjs'
import { BCRYPT_WORK_FACTOR } from '../config'

interface UserDocument extends Document {
    email: string,
    name: string,
    password: string,
    matchesPassword: (password: string) => Promise<boolean>
}

const userSchema = new Schema({
    email: String,
    name: String,
    password: String
}, {
    timestamps: true
})

//Pre save hook
userSchema.pre<UserDocument>('save', async function () {
    if (this.isModified('password')) {
        this.password = await hash(this.password, BCRYPT_WORK_FACTOR)
    }
})

userSchema.methods.matchesPassword = function (password: string) {
    return compare(password, this.password)
}

//Hide the document's fields of __v and password, and have the other fields under the object name 'rest'
userSchema.set('toJSON', {
    transform: (doc, { __v, password, ...rest }, options) => rest
})

export const User = model<UserDocument>('User', userSchema)