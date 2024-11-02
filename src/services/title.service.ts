import { DeleteResult, Repository } from 'typeorm'
import { AppDataSouce } from '../db'
import { TitleEntity } from '../entities'
import { CreateTitleType } from '../types'

export const createTitle = async (
    data: CreateTitleType,
): Promise<TitleEntity> => {
    const titleRepository = AppDataSouce.getRepository(TitleEntity)
    const newTitle = titleRepository.create(data)
    await titleRepository.save(newTitle)

    return newTitle
}

export const deleteTitle = async (uuid: string): Promise<DeleteResult> => {
    const titleRepository = AppDataSouce.getRepository(TitleEntity)
    const result = await titleRepository.delete({uuid})
    return result
}

export const readTitle = async (uuid: string): Promise<TitleEntity[]> => {
    const titleRepository: Repository<TitleEntity> =
        AppDataSouce.getRepository(TitleEntity)

    return titleRepository.find({
        where: {
            userId: {
                uuid,
            },
        },
        order: {
            createdAt: 'DESC',
        },
    })
}
