import { ObjectSchema } from "joi";
import { BadRequest } from "../errors";

//This handles the errors as an example the email's misspled
export const validate = async (schema: ObjectSchema, payload: any) => {
    try {
        await schema.validateAsync(payload, { abortEarly: false })
    } catch (e) {
        throw new BadRequest(e)
    }
}