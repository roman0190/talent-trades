import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Request,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateGigDto, UpdateGigDto } from './gig.dto';

import { ExceptionsHandler } from '@nestjs/core/exceptions/exceptions-handler';
import { Public } from '../auth/constants';
import { errorResponse } from '../functions/errorResponse';
import { GigsService } from './gigs.service';

@Controller('seller/gigs')
export class GigsController {
  constructor(private readonly gigsService: GigsService) {}

  @Post('create')
  @UsePipes(new ValidationPipe())
  async create(@Request() req, @Body() createGigDto: CreateGigDto) {
    try {
      const { userId } = req.user;

      return await this.gigsService.create(userId, createGigDto);
    } catch (error) {
      return errorResponse(error);
    }
  }

  @Get('all')
  async findAll() {
    return this.gigsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.gigsService.findOne(+id);
  }

  @Patch('update/:id')
  @UsePipes(new ValidationPipe())
  async update(
    @Request() req,
    @Param('id') gigId: string,
    @Body() updateGigDto: UpdateGigDto,
  ) {
    try {
      const { userId } = req.user;
      return await this.gigsService.update(+gigId, userId, updateGigDto);
    } catch (error) {
      return errorResponse(error);
    }
  }

  @Delete('delete/:id')
  async remove(@Request() req, @Param('id') id: string) {
    try {
      const { userId } = req.user;
      return await this.gigsService.remove(+id, userId);
    } catch (error) {
      return errorResponse(error);
    }
  }
}
