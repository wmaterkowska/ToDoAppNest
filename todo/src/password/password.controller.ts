import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { PasswordService } from './password.service';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { UserId } from 'src/auth/decorator/get-user-id.decorator';


@UseGuards(AuthGuard)
@Controller('password')
export class PasswordController {
  constructor(private readonly passwordService: PasswordService) { }

  // @Post()
  // create(@Body() createPasswordDto: CreatePasswordDto) {
  //   return this.passwordService.create(createPasswordDto);
  // }

  // @Get()
  // findAll() {
  //   return this.passwordService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.passwordService.findOne(+id);
  // }

  @Patch()
  update(@UserId() userId: number, @Body() updatePasswordDto: UpdatePasswordDto) {
    return this.passwordService.update(+userId, updatePasswordDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.passwordService.remove(+id);
  }
}
