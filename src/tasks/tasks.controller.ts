import {
  Controller,
  Get,
  // Body,
  // Delete,
  // Param,
  // Post,
  // Patch,
} from '@nestjs/common';

import { TasksService } from './tasks.service';
// import { Prisma } from '@prisma/client';

@Controller('tasks')
export class TasksController {
  constructor(private readonly taskService: TasksService) {}

  @Get()
  getAllTasks() {
    return this.taskService.getAllTasks();
  }

  // @Post()
  // createTask(@Body() postTaskDto: Prisma.) {
  //   return this.taskService.createTask(postTaskDto);
  // }

  // @Patch(':id')
  // updateTask(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
  //   return this.taskService.updateTask(id, updateTaskDto);
  // }

  // @Delete(':id')
  // removeTask(@Param('id') id: string) {
  //   return this.taskService.removeTask(id);
  // }
}
