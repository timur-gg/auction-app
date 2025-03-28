import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  UseGuards, Put
} from '@nestjs/common';

import {
  ApiTags,
  ApiOperation,
  ApiParam,
  ApiBearerAuth,
  ApiOkResponse,
  ApiUnauthorizedResponse,
  ApiNotFoundResponse,
  ApiCreatedResponse,
  ApiBadRequestResponse
} from '@nestjs/swagger';

import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto.ts';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard.ts';
import { Project } from './entities/project.entity.ts';

@ApiTags('Projects') // 🧠 Groups all endpoints under "Projects" in Swagger UI
@Controller('projects') // 🧠 All routes will be prefixed with /projects
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all projects with pagination' }) // 📘 Swagger route summary/ ✅ Applies validation to query params
  @ApiOkResponse({
    description: 'Returns all projects',
    type: [Project],
  })
  findProjects(): Promise<Project[]> {
    return this.projectsService.findAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get a project by ID' })
  @ApiParam({ name: 'id', type: String }) // 📘 Document route param
  @ApiOkResponse({
    description: 'Returns an project by id',
    type: Project,
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiNotFoundResponse({ description: 'Project not found' })
  findOne(@Param('id') id: string): Promise<Project> {
    return this.projectsService.findOne(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new project' })
  @ApiCreatedResponse({
    description: 'The project has been successfully created',
    type: Project,
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiBadRequestResponse({ description: 'Invalid input data' })
  create(@Body() createProjectDto: CreateProjectDto): Promise<Project> {
    return this.projectsService.create(createProjectDto);
  }

@Put(':id')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@ApiOperation({ summary: 'Update a project' })
@ApiParam({ name: 'id', description: 'Project ID' })
@ApiOkResponse({
  description: 'The project has been successfully updated',
  type: Project,
})
@ApiUnauthorizedResponse({ description: 'Unauthorized' })
@ApiNotFoundResponse({ description: 'Auction not found' })
@ApiBadRequestResponse({ description: 'Invalid input data' })
update(
  @Param('id') id: string,
  @Body() updateProjectsDto: UpdateProjectDto,
): Promise<Project> {
  return this.projectsService.update(id, updateProjectsDto);
}
}
