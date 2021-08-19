import { IsEmail, IsString, IsUrl, MaxLength } from 'class-validator';

export class CreateUrlDto {
    @IsUrl()
    public longUrl: string;

    @IsUrl()
    public shortUrl: string;

    @MaxLength(50)
    public urlCode: string;
}
