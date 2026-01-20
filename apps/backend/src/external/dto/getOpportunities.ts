import {ApiProperty, ApiPropertyOptional} from '@nestjs/swagger';
import {IsString, IsArray, ValidateNested, IsOptional, IsEnum} from 'class-validator';
import { Type, Expose } from 'class-transformer';

export enum FLUENCY {
    BEGINNER = 'beginner',
    INTERMEDIATE = 'intermediate',
    ADVANCED = 'advanced',
    NATIVE = 'native',
    FULLY_FLUENT = 'fully-fluent',
}

export enum PROFICIENCY {
    BEGINNER = 'beginner',
    INTERMEDIATE = 'intermediate',
    ADVANCED = 'advanced',
    NATIVE = 'native',
    EXPERT = 'expert',
}

export enum CODE {
    OPEN = 'open',
    CLOSED = 'closed',
}

export class StatusDto {
    @ApiProperty()
    @IsEnum(CODE)
    code: CODE;
}

export class SkillRoleRootDto {
    @ApiProperty()
    @IsString()
    text: string;

    @ApiPropertyOptional()
    @IsEnum(PROFICIENCY)
    @IsOptional()
    proficiency: PROFICIENCY;
}

export class LanguageRootDto {
    @ApiProperty()
    @IsString()
    term: string;

    @ApiPropertyOptional()
    @IsEnum(FLUENCY)
    @IsOptional()
    fluency: FLUENCY;
}

export class KeyWordRootDto {
    @ApiProperty()
    @IsString()
    term: string;

    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    locale: string = 'en';
}

export class OpportunityCriterionDto {
    @ApiPropertyOptional()
    @ValidateNested()
    @Type(() => KeyWordRootDto)
    @IsOptional()
    keywords?: KeyWordRootDto;

    @ApiPropertyOptional()
    @ValidateNested()
    @Type(() => LanguageRootDto)
    @IsOptional()
    language?: LanguageRootDto;

    @ApiPropertyOptional({ name: 'skill/role' })
    @ValidateNested()
    @Type(() => SkillRoleRootDto)
    @IsOptional()
    @Expose({ name: 'skill/role' })
    skillRole?: SkillRoleRootDto;

    @ApiPropertyOptional()
    @ValidateNested()
    @Type(() => StatusDto)
    @IsOptional()
    status?: StatusDto;
}

export class GetOpportunitiesDto {
    @ApiPropertyOptional({ type: [OpportunityCriterionDto] })
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => OpportunityCriterionDto)
    and?: OpportunityCriterionDto[];
}