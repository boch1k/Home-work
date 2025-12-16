import { AppDataSource } from "../data-source";
import { NextFunction, Request, Response } from "express";
import { PhotoMetadata } from "../entity/PhotoMetadata";
import { Photo } from "../entity/Photo";

export class PhotoMetaController {
    private metaRepository = AppDataSource.getRepository(PhotoMetadata);
    private photoRepository = AppDataSource.getRepository(Photo);

    async all(request: Request, response: Response, next: NextFunction) {
        const meta = await this.metaRepository.find({
            relations: {
                photo: true,
            },
        });
        return meta;
    }

    async save(request: Request, response: Response, next: NextFunction) {
        const {
            height,
            width,
            orientation,
            compressed,
            comment,
            name,
            description,
            filename,
            views,
            isPublished,

        } = request.body;

        const photo = Object.assign(new Photo(), {
            name,
            description,
            filename,
            views,
            isPublished,
        });

        const metadata = Object.assign(new PhotoMetadata(), {
            height,
            width,
            orientation,
            compressed,
            comment,
            photo
        });

        return await this.metaRepository.save(metadata)
    }

    async remove(request: Request, response: Response, next: NextFunction) {
        const id = parseInt(request.params.id);

        let metaToRemove = await this.metaRepository.findOneBy({ id });

        if (!metaToRemove) {
            return "this meta not exist";
        }

        await this.metaRepository.remove(metaToRemove);

        return "meta has been removed";
    }

    async removeAll(request: Request, response: Response, next: NextFunction) {

        const metaToRemove = await this.metaRepository.find();

        if (!metaToRemove) {
            return "no meta to remove";
        }

        return await this.metaRepository.remove(metaToRemove);
    }
}
