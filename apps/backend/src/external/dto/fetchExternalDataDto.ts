import {ApiProperty, ApiPropertyOptional} from '@nestjs/swagger';
import {IsString, IsNumber, IsBoolean} from 'class-validator';

export class FetchExternalDataDto {
    @ApiProperty()
    @IsString()
    query: string;

    @ApiProperty()
    @IsString()
    identityType: string;

    @ApiPropertyOptional()
    @IsNumber()
    limit?: number;

    @ApiPropertyOptional()
    @IsBoolean()
    meta?: boolean;

    @ApiPropertyOptional()
    @IsBoolean()
    excludeContacts?: boolean;
}