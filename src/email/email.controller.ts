import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Inject } from "@nestjs/common";
import { EmailService } from './email.service';
import { CreateEmailDto } from './dto/create-email.dto';
import { UpdateEmailDto } from './dto/update-email.dto';
import { RedisService } from "../redis/redis.service";

@Controller('email')
export class EmailController {
  @Inject()
  private redisService: RedisService
  constructor(private readonly emailService: EmailService) {}

  @Get('code')
  async sendEmailCode(@Query('address') address) {
    const code = Math.random().toString().slice(2,8)
    await this.redisService.set(`captcha_${address}`,code, 5*60)

    await this.emailService.sendMail({
      to: address,
      subject: '登陆验证码',
      html: `<p> 你的登陆验证码是 ${code}</p>`
    })

    return '发送成功'
  }

}
