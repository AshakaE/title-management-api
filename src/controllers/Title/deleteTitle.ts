import { Response } from 'express'
import httpStatus from 'http-status'
import { UserEntity } from '../../entities'
import { titleService } from '../../services'
import { errorHandlerWrapper } from '../../utils'

const deleteTitleHandler = async (req, res: Response) => {
    const { uuid } = req.params
    const deletedResult = await titleService.deleteTitle(uuid)
    if (deletedResult.affected === 0) {
        return res.status(httpStatus.NOT_FOUND).json({})
    }
    return res.status(httpStatus.NO_CONTENT).json({})
}

export const deleteTitleController = errorHandlerWrapper(deleteTitleHandler)
