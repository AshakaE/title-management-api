import { userService } from '../../services'
import { errorHandlerWrapper } from '../../utils'
import { generateToken } from '../../utils/generate'
import { comparePassword } from '../../utils/password'
import httpStatus from 'http-status'

const loginHandler = async (req, res) => {
    const { email, password } = req.body
    const findUser = await userService.getOneUser({ email })
    const compare = await comparePassword(password, findUser.password)

    if (!findUser || (findUser && !compare))
        return res.status(httpStatus.UNAUTHORIZED).json({
            success: false,
            message: 'Invalid credentials',
        })
    if (findUser.deletedAt)
        return res.status(httpStatus.NOT_FOUND).json({
            success: false,
            message: 'User does not exist',
        })

    const token = generateToken(findUser.uuid)
    return res.json({ token }).status(httpStatus.ACCEPTED)
}

export const loginController = errorHandlerWrapper(loginHandler)
