import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { PersonsService } from './persons.service';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';

@Controller('persons')
export class PersonsController {
  constructor(private readonly personsService: PersonsService) {}

  //Create new person endpoint
  @Post('newPerson')
  async create(@Body() createPersonDto: CreatePersonDto, @Res() res) {
    try {
      Logger.verbose('--NEW PERSON--');
      const newPerson = await this.personsService.create(createPersonDto);
      Logger.verbose('--NEW PERSON-- SUCCESS');
      return res.status(HttpStatus.CREATED).json(newPerson);
    } catch (error) {
      return res.status(error.status).json(error);
    }
  }

  //Get all persons endpoint
  @Get('allPersons')
  async findAll(@Res() res) {
    try {
      Logger.verbose('--GETTING ALL PERSONS-- INIT');
      const allPersons = await this.personsService.findAll();
      Logger.verbose('--GETTING ALL PERSONS-- SUCCESS');
      return res.status(HttpStatus.OK).json(allPersons);
    } catch (error) {
      console.log(error);

      return res.status(error.status).json(error);
    }
  }

  //Get a person by id
  @Get(':id')
  async findOne(@Param('id') id: string, @Res() res) {
    try {
      Logger.verbose(`--GETTING PERSON ID=${id}-- INIT`);
      const person = await this.personsService.findOneById(+id);
      Logger.verbose(`--GETTING PERSON ID=${id}-- SUCCESS`);
      return res.status(HttpStatus.OK).json(person);
    } catch (error) {
      return res.status(error.status).json(error);
    }
  }

  //Update a person
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updatePersonDto: UpdatePersonDto,
    @Res() res,
  ) {
    try {
      Logger.verbose(`--UPDATE PERSON ID=${id}-- INIT`);
      const updateMsg = await this.personsService.update(+id, updatePersonDto);
      Logger.verbose(`--UPDATE PERSON ID=${id}-- SUCCESS`);
      return res.status(HttpStatus.OK).json(updateMsg);
    } catch (error) {
      return res.status(error.status).json(error);
    }
  }

  //Remove a person
  @Delete(':id')
  async remove(@Param('id') id: string, @Res() res) {
    try {
      Logger.verbose(`--DELETE PERSON ID=${id}-- INIT`);
      const deletedMsg = await this.personsService.remove(+id);
      Logger.verbose(`--DELETE PERSON ID=${id}-- SUCCESS`);
    } catch (error) {
      return res.status(error.status).json(error);
    }
  }
}
