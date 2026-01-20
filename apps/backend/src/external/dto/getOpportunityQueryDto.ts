import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";

export class GetOpportunitiesQueryDto {
    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    currency?: string;

    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    periodicity?: string;

    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    lang?: string;

    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    size?: string;

    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    contextFeature?: string;
}