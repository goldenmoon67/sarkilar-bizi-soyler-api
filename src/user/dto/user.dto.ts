import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsBoolean,
  IsDate,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumberString,
  IsObject,
  IsOptional,
  IsPhoneNumber,
  IsString,
  Length,
  Matches,
  MaxDate,
  NotContains,
  ValidateNested,
} from 'class-validator';
import { PaginationDto } from 'nestjs-search';
import { UserEventResponse, UserGroupResponse, UserPrivateEventResponse } from '../../libs/social-client';
import { PaginationListResponse } from '../../libs/dto/pagination.dto';
import { Address, ContactRule, School, Settings, Venly, VenlyUserWallet, WorkHistory } from '../model/user-model';
import { Users } from '../schemas/user.schema';
import { Transform, Type } from 'class-transformer';

export class PasswordDto {
  @IsNotEmpty()
  @IsString()
  @NotContains(' ', { message: 'your password contains invalid characters' })
  @Length(8, 16)
  @Matches(/((?=.*\d)|(?=.*\w+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, { message: 'your password contains invalid characters' })
  currentPassword: string;

  @IsNotEmpty()
  @IsString()
  @NotContains(' ', { message: 'your password contains invalid characters' })
  @Length(8, 16)
  @Matches(/((?=.*\d)|(?=.*\w+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, { message: 'your password contains invalid characters' })
  newPassword: string;

  @IsNotEmpty()
  @IsString()
  confirmNewPassword: string;
}

export class ProfileDto {
  @IsOptional()
  @IsNumberString()
  @IsPhoneNumber('GB')
  phoneNumber: string;
  @IsOptional()
  @IsString()
  displayName: string; //'John Doe',
  @IsOptional()
  @IsString()
  firstName: string;
  @IsOptional()
  @IsString()
  lastName: string;
  @IsObject()
  @IsOptional()
  address: Address;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  @MaxDate(new Date(Date.now() - 18 * 365 * 24 * 60 * 60 * 1000))
  birthDate: Date;
  @IsOptional()
  @IsString()
  timeZone: string;
}

export class OtherProfileDto {
  @IsOptional()
  @IsString()
  aboutMe: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SocialMedia)
  socialMedia: SocialMedia[];

  @IsOptional()
  @IsString()
  jobTitle: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => School)
  schools?: School[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => WorkHistory)
  workHistory?: WorkHistory[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @ArrayMaxSize(5)
  skills?: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  futurePlans?: string[];
}

export class UserNotifications {
  @IsOptional()
  @IsBoolean()
  userNotification = true;
  @IsOptional()
  @IsBoolean()
  groupNotification = true;
  @IsOptional()
  @IsBoolean()
  eventNotification = true;
  @IsOptional()
  @IsBoolean()
  messageNotification = true;
  @IsOptional()
  @IsBoolean()
  campaignNotification = true;
}

export class UserPrivacy {
  @IsOptional()
  @IsEnum(ContactRule)
  whoCanContactYou: ContactRule;
  @IsOptional()
  @IsBoolean()
  showGroupsAndEvents = true;
  @IsOptional()
  @IsBoolean()
  showInterest = true;
  @IsOptional()
  @IsBoolean()
  showSocialMedia = true;
  @IsOptional()
  @IsBoolean()
  showProfile = true;
}

export class InterestsDto {
  @IsNotEmpty()
  @IsArray()
  @IsString({ each: true })
  @ArrayMinSize(1)
  interests: string[];
}
export class SetPasswordDto {
  @IsNotEmpty()
  @IsString()
  @Length(8, 16)
  @Matches(/((?=.*\d)|(?=.*\w+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/)
  password: string;
  confirmPassword: string;
}

export class ProfilePhotoDto {
  @IsString()
  file: string;
}
export class DeleteUserDto {
  @IsOptional()
  @IsEmail()
  email: string;
  @IsOptional()
  @IsString()
  @Length(8, 16)
  @Matches(/((?=.*\d)|(?=.*\w+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/)
  password: string;
}

export interface UsersListResponse extends PaginationListResponse {
  results: Users[];
}

export class MemberGroup {
  groupId: string;
  groupName: string;
  groupImageUrl: string;
}
export class MemberEvent {
  eventId: string;
  eventName: string;
  eventImageUrl: string;
  eventDate: Date;
}
export class Interest {
  key: string;
  name: string;
  imageUrl: string;
}

export class SocialMedia {
  @IsNotEmpty()
  @IsString()
  name: string;
  @IsNotEmpty()
  @IsString()
  link: string;
  @IsOptional()
  @IsString()
  imageUrl: string;
}
export class ProfileResponse {
  userId: string;
  displayName: string;
  photoURL: string;
  firstName: string;
  lastName: string;
  aboutMe?: string;
  groups?: UserGroupResponse;
  events?: UserEventResponse;
  privateEvents?: UserPrivateEventResponse;
  interests?: string[]; //Interest[];
  socialMedia?: SocialMedia[];
  email?: string;
  phoneNumber?: string;
  address?: Address;
  emailVerified?: boolean = false;
  phoneVerified?: boolean = false;
  following: number;
  follower: number;
  amIFollowing?: boolean;
  amIFollowed?: boolean;
  jobTitle?: string;
  schools?: School[];
  workHistory?: WorkHistory[];
  skills?: string[];
  futurePlans?: string[];
  settings?: Settings;
  birthDay?: Date;
  timeZone?: string;
  venly?: Venly;
  whoReferred?: { userId: string; displayName: string };
}

export class UserList {
  @IsNotEmpty()
  @IsArray()
  userIds: string[];
  @IsOptional()
  params: PaginationDto;
}

export class UpdateVenlyDto {
  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => Venly)
  venly: Venly;
}
