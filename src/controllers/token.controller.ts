import { ApiTags } from '@nestjs/swagger';
import { Controller, Get, Param } from '@nestjs/common';
import { TokenService } from '../services/token.service';

@ApiTags('')
@Controller('')
export class TokenController {
  constructor(private readonly tokenService: TokenService) {}

  @Get('/token')
  async generateToken(): Promise<{ success: boolean; token: string }> {
    const token = await this.tokenService.generateToken();
    return { success: true, token };
  }

  @Get(':token')
  async validateToken(
    @Param('token') tokenString: string,
  ): Promise<{ success: boolean }> {
    const token = await this.tokenService.getToken(tokenString);
    if (
      token &&
      !token.isUsed &&
      new Date().getTime() - token.createdAt.getTime() < 40 * 60 * 1000
    ) {
      await this.tokenService.markTokenAsUsed(tokenString);
      return { success: true };
    }
    return { success: false };
  }
}
