import {
  Injectable,
  BadRequestException,
  NotFoundException,
  Body,
} from '@nestjs/common';

import { DatabaseService } from 'src/database/database.service';
import { PostTaskDto } from './dto/post-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { isValidObjectId } from 'mongoose';
// import { ObjectId } from 'bson';
import { groupTasksByParentId, ITask } from './tasks.helper';
// import { Prisma } from '@prisma/client';
interface ISubTask extends ITask {
  id: string;
}

@Injectable()
export class TasksService {
  constructor(private readonly prisma: DatabaseService) {}

  async getAllTasks() {
    const tasks = await this.prisma.tasks.findMany();

    return tasks;
  }

  async createTask(@Body() postTaskDto: PostTaskDto) {
    const result = await this.prisma.tasks.create({
      data: postTaskDto,
    });
    return result;
  }

  async updateTask(id: string, updateTaskDto: UpdateTaskDto) {
    if (!isValidObjectId(id)) {
      throw new BadRequestException('Invalid ID format');
    }
    // const objectId = new ObjectId(id);
    const editedTask = await this.prisma.tasks.findUnique({
      where: { id },
    });
    if (!editedTask) {
      throw new NotFoundException('Task not found');
    }

    const updatedTask = await this.prisma.tasks.update({
      where: { id },
      data: updateTaskDto,
    });
    return updatedTask;
  }

  async removeTask(id: string) {
    if (!isValidObjectId(id)) {
      throw new BadRequestException('Invalid ID format');
    }

    const allTasks = await this.prisma.tasks.findMany();

    const taskToDelete = allTasks.find((task) => task.id === id);
    if (!taskToDelete) {
      throw new NotFoundException('Task not found');
    }
    const taskMap = groupTasksByParentId(allTasks);

    const deleteTaskChain = async (id: string) => {
      if (taskMap[id]) {
        taskMap[id].forEach((subtask: ISubTask) => {
          deleteTaskChain(subtask.id);
        });
      }
      const result = await this.prisma.tasks.delete({
        where: { id: id },
      });

      return result;
    };

    return deleteTaskChain(id);
  }
}
