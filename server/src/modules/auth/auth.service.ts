import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { LoginDto } from "./dto/login.dto";

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  async login(dto: LoginDto) {
    const payload = {
      sub: dto.email,
      email: dto.email,
      role: "translator",
    };

    return {
      accessToken: await this.jwtService.signAsync(payload),
      tokenType: "Bearer",
      expiresIn: "1d",
      user: {
        email: dto.email,
      },
      message:
        "JWT placeholder login: replace this with real credential validation later.",
    };
  }
}
