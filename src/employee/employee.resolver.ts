import { UseGuards } from '@nestjs/common';
import {} from '@nestjs/graphql';
import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { CongnitoAuthGuard } from 'src/auth/congito.guard';
import { CurrentUser } from 'src/auth/currentUser.decorator';
import { User } from 'src/auth/user.type';
import { EmployeeCreateDTO } from './dto/create-employee.input';
import { EmployeeService } from './employee.service';
import { Employee } from './entity/employee.entity';
@Resolver(() => Employee)
export class EmployeeResolver {
  constructor(private employeeService: EmployeeService) {}

  @Query(() => User)
  @UseGuards(CongnitoAuthGuard)
  whoIamI(@CurrentUser() user: User) {
    return user;
  }

  @Query(() => [Employee], { name: 'getAllEmployees' })
  @UseGuards(CongnitoAuthGuard)
  findAll() {
    return this.employeeService.findAll();
  }

  @Mutation(() => Employee, { name: 'createEmployee' })
  create(@Args('employeeInput') employee: EmployeeCreateDTO) {
    return this.employeeService.create(employee);
  }
  @Query(() => Employee)
  findOne(@Args('id') id: string, @CurrentUser() user: User) {
    console.log(user);
    return this.employeeService.findOne(id);
  }

  /* @ResolveField(() => Project)
    project(@Parent() employee: Employee) {
        return this.employeeService.getProject(employee.projectId)

    } */
}
