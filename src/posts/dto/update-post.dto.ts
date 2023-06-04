import { Type } from "class-transformer";
import { IsNotEmpty, IsOptional, IsString, ValidateNested } from "class-validator";
import { NewsCategory } from "../../entities/NewsCategory.entity";
import { ApiProperty } from "@nestjs/swagger";

export class UpdatePostDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    readonly title: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    readonly body: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    readonly imgSrc: string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    readonly intro: string | null;

    @ApiProperty({ type: () => NewsCategory })
    @ValidateNested()
    @Type(() => NewsCategory)
    readonly category: NewsCategory[];

}