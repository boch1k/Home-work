import { AppDataSource } from "../data-source";
import { NextFunction, Request, Response } from "express";
import { User } from "../entity/User";
import { Photo } from "../entity/Photo";
import { PhotoMetadata } from "../entity/PhotoMetadata";
import { Repository } from "typeorm";

export class UserController {
  private userRepository = AppDataSource.getRepository(User);
  private photoRepository = AppDataSource.getRepository(Photo);
  private metaRepository = AppDataSource.getRepository(PhotoMetadata)

  timerPromise = (a) =>
    new Promise(resolve => setTimeout(() => resolve(a), 1000))

  async all(request: Request, response: Response, next: NextFunction) {
    return await this.timerPromise(this.userRepository.find())
  }

  async findIgnoreCase(request: Request, response: Response, next: NextFunction) {

    const user = request.body

    if ("age" in user) {
      return await this.userRepository.createQueryBuilder("user")
        .where(`user.age = :pattern`, { pattern: user.age })
        .getMany();
    } else {
      return await this.userRepository.createQueryBuilder("user")
        .where(`user.firstName ILIKE :firstName `, { firstName: `%${user.firstName}%` })
        .orWhere(`user.lastName ILIKE :lastName`, { lastName: `%${user.lastName}%` })
        .getMany();
    }

  }

  async one(request: Request, response: Response, next: NextFunction) {

    const req = Object.assign(new User(), request.body);

    const result = await AppDataSource.manager
      .createQueryBuilder(User, "user")
      .where("user.firstName = :firstName OR user.lastName = :lastName", req)
      .getMany()

    // Repository
    // const userr = await AppDataSource
    //   .getRepository(User)
    //   .createQueryBuilder("user")
    //   .where("user.id = :id", { id })
    //   .getOne()


    if (!result) {
      return "unregistered user";
    }
    return result;
  }

  async oneId(request: Request, response: Response, next: NextFunction) {
    const id = parseInt(request.params.id);

    const user = await this.userRepository.findOne({
      where: { id },
    });

    // DataSource
    const userds = await AppDataSource
      .createQueryBuilder()
      .select("user")
      .from(User, "user")
      .where("user.id = :id", { id })
      .getOne()

    // DataSource.manager
    const userm = await AppDataSource.manager
      .createQueryBuilder(User, "user")
      .where("user.id = :id", { id })
      .getOne()

    // Repository
    const userr = await AppDataSource
      .getRepository(User)
      .createQueryBuilder("user")
      .where("user.id = :id", { id })
      .getOne()


    if (!userds) {
      return "unregistered user";
    }
    return userds;
  }

  async save(request: Request, response: Response, next: NextFunction) {
    const { firstName, lastName, age } = request.body;

    const user = Object.assign(new User(), {
      firstName,
      lastName,
      age,
    });

    return await this.userRepository.save(user);
  }

  async saveVmeta(request: Request, response: Response, next: NextFunction) {
    const { firstName, lastName, age,
      name, description, filename, views, isPublished,
      height, width, orientation, compressed, comment, } = request.body;


    const metadata = Object.assign(new PhotoMetadata(), {
      height,
      width,
      orientation,
      compressed,
      comment,
    });

    const photos = Object.assign(new Photo(), {
      name,
      description,
      filename,
      views,
      isPublished,
      metadata
    });

    const user = Object.assign(new User(), {
      firstName,
      lastName,
      age,
      photos
    });


    await this.photoRepository.save(photos);
    return await this.userRepository.save(user);
  }

  async remove(request: Request, response: Response, next: NextFunction) {
    const id = parseInt(request.params.id);

    let userToRemove = await this.userRepository.findOneBy({ id });

    if (!userToRemove) {
      return "this user not exist";
    }

    await this.userRepository.remove(userToRemove);

    return "user has been removed";
  }
}
