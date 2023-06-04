import { TypeRole } from '../auth.interface'
import { JwtAuthGuards } from '../guards/jwt.guards'
import { OnlyAdminGuard } from '../guards/admin.guards'
import { UseGuards, applyDecorators } from '@nestjs/common/decorators'

export const Auth = (role: TypeRole = 'user') =>
  applyDecorators(role === 'admin'
    ? UseGuards(JwtAuthGuards, OnlyAdminGuard)
    : UseGuards(JwtAuthGuards),
  )
