import { AppDataSource } from "../data-source";
import { NextFunction, Request, Response } from "express";
import { Photo } from "../entity/Photo";
import { PhotoMetadata } from "../entity/PhotoMetadata";
import { User } from "../entity/User";

export class PhotoController {
  private photoRepository = AppDataSource.getRepository(Photo);
  private metaRepository = AppDataSource.getRepository(PhotoMetadata);
  private userRepository = AppDataSource.getRepository(User)

  async save(request: Request, response: Response, next: NextFunction) {
    const { name, description, filename, views, isPublished,
      height, width, orientation, compressed, comment,
      firstName, lastName, age, } = request.body;

    const user = Object.assign(new User(), {
      firstName,
      lastName,
      age,
    });

    const metadata = Object.assign(new PhotoMetadata(), {
      height,
      width,
      orientation,
      compressed,
      comment,
    })

    const photo = Object.assign(new Photo(), {
      name,
      description,
      filename,
      views,
      isPublished,
      user,
      metadata
    });

    return await this.photoRepository.save(photo);

  }

  async all(request: Request, response: Response, next: NextFunction) {

    const photo = await this.photoRepository.find({
      relations: {
        metadata: true,
        user: true
      },
    });
    return photo;
  }
  // QueryBuilder all photos
  async allqb(request: Request, response: Response, next: NextFunction) {

    const photo = await this.photoRepository.createQueryBuilder("photo")
      .innerJoinAndSelect("photo.metadata", "metadata")
      .getMany()
    return photo;
  }

  // Get one Photo
  async one(request: Request, response: Response, next: NextFunction) {
    const id = parseInt(request.params.id);

    const photo = await this.photoRepository.createQueryBuilder("photo")
      .leftJoinAndSelect("photo.metadata", "meta")
      .where("photo.id = :id", { id })
      .andWhere("meta.compressed = :isCompressed", { isCompressed: true })
      .getOne();

    if (!photo) {
      return "unregistered photo";
    }
    return photo;
  }

  async remove(request: Request, response: Response, next: NextFunction) {
    const id = parseInt(request.params.id);

    let photoToRemove = await this.photoRepository.findOneBy({ id });

    if (!photoToRemove) {
      return "this photo not exist";
    }

    await this.photoRepository.remove(photoToRemove);

    return "photo has been removed";
  }

  async removeAll(request: Request, response: Response, next: NextFunction) {

    const photoToRemove = await this.photoRepository.find();

    if (!photoToRemove) {
      return "no photo to remove";
    }

    return await this.photoRepository.remove(photoToRemove);
  }
}


