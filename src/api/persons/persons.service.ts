import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';
import { Person } from './entities/person.entity';

@Injectable()
export class PersonsService {
  constructor(
    @InjectRepository(Person) private personRepository: Repository<Person>,
  ) {}

  //Create a person
  async create(createPersonDto: CreatePersonDto) {
    try {
      if (createPersonDto.parent) {
        const parentId = parseInt(createPersonDto.parent);
        const parentEntity = await this.findOneById(parentId);
        const newPerson = this.personRepository.create(createPersonDto);
        newPerson.parent = parentEntity;
        await this.personRepository.save(newPerson);
        return newPerson;
      }
      //If the person parent is void(this person will be the root)
      const newPerson = this.personRepository.create(createPersonDto);
      await this.personRepository.save(newPerson);
      return newPerson;
    } catch (error) {
      throw new HttpException(error.message, error);
    }
  }

  //Get all persons
  async findAll() {
    try {
      const allPersons = await this.personRepository.manager
        .getTreeRepository(Person)
        .findTrees();
      return allPersons;
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  //Get a person by id
  async findOneById(id: number) {
    try {
      const person = await this.personRepository.findOne({
        where: {
          id: id,
        },
      });
      if (!person) {
        throw new HttpException(
          `Person with id=${id} not found`,
          HttpStatus.NOT_FOUND,
        );
      }
      return person;
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  //Update a person
  async update(id: number, updatePersonDto: UpdatePersonDto) {
    try {
      await this.personRepository.update({ id }, updatePersonDto);
      return await this.findOneById(id);
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  //Remove a person
  async remove(id: number) {
    try {
      await this.personRepository.delete({ id });
      return { message: `Person with id=${id} deleted!` };
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }
}
