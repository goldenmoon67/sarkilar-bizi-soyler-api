import { Type } from 'class-transformer';
import { IsArray, IsBoolean, IsNotEmpty, IsOptional, IsString, Length, ValidateNested } from 'class-validator';

export enum ProfileStatus {
  ACTIVE = 'active',
  WAITING_APPROVAL = 'waiting-approval',
  PASSIVE = 'passive',
  BLOCKED = 'blocked',
  DELETED = 'deleted',
  PAUSED = 'paused',
  FIREBASE_TOKEN_APPROVAL = 'firebase-token-approval',
}
export class Address {
  city: string;
  address: string;
  addressExt: string;
  postCode: string;
  state: string;
  country: string;
}

export enum Role {
  CoOrganizer = 'co-organizer',
  AssistantOrganizer = 'assistant-organizer',
  Organizer = 'organizer',
  Admin = 'admin',
  SuperAdmin = 'super-admin',
  Editor = 'editor',
  BookWriter = 'book-writer',
  Trainer = 'trainer',
  Influencer = 'influencer',
  Pending = 'pending',
  Member = 'member',
}

export class Verification {
  code: string;
  date: Date;
  attempt: number;
}

export class User {
  userId?: string;
  displayName?: string;
  emailVerified?: boolean;
  phoneVerified?: boolean;
  photoURL?: string;
  status?: ProfileStatus;
  firstName?: string;
  lastName?: string;
  email?: string;
  phoneNumber?: string;
  verification?: Verification;
  address?: Address;
  roles?: Role[];
  createdBy?: string;
  createdDate?: Date;
  lastUpdatedTime?: Date = new Date();
  whoReferred?: string;
  history?: any[];
}

export class Follow {
  following: string[];
  follower: string[];
  history?: any[];
}
export class MobileDevice {
  firebaseToken: string;
  deviceId: string;
  date: Date;
  permissions: any;
}

export class School {
  @IsNotEmpty()
  @IsString()
  school: string;
  @IsNotEmpty()
  @IsString()
  fieldOfStudy: string;
  @IsOptional()
  @IsString()
  startDate: string; //MMYYYY
  @IsOptional()
  @IsString()
  endDate: string; //MMYYYY
  @IsOptional()
  @IsString()
  description: string;
}

export class WorkHistory {
  @IsNotEmpty()
  @IsString()
  title: string;
  @IsOptional()
  @IsString()
  employmentType: string;
  @IsNotEmpty()
  @IsString()
  companyName: string;
  @IsOptional()
  @IsString()
  location: string;
  @IsOptional()
  @IsBoolean()
  currentlyWorkingInThisRole: boolean;
  @IsOptional()
  @IsString()
  startDate: string; //MMYYYY
  @IsOptional()
  @IsString()
  endDate: string; //MMYYYY
  @IsOptional()
  @IsString()
  description: string;
}

export class UserNotifications {
  userNotification = true;
  groupNotification = true;
  eventNotification = true;
  messageNotification = true;
  campaignNotification = true;
}

export enum ContactRule {
  ANYONE = 'anyone',
  MEMBER_OF_MY_GROUPS_ONLY = 'member-of-my-groups-only',
  ORGANIZERS_ONLY = 'organizers_only',
}

export class UserPrivacy {
  whoCanContactYou: ContactRule;
  showGroupsAndEvents = true;
  showInterest = true;
  showSocialMedia = true;
  showProfile = true;
}
export class Settings {
  notifications: UserNotifications;
  privacy: UserPrivacy;
}

export class VenlyUserWallet {
  @IsNotEmpty()
  @IsString()
  @Length(40, 128)
  address: string;
  @IsNotEmpty()
  @IsString()
  @Length(1, 128)
  coinType: string;
  @IsNotEmpty()
  @IsString()
  @Length(1, 128)
  coinSymbol: string;
  @IsNotEmpty()
  @IsString()
  @Length(1, 128)
  walletId: string;
}

export class Venly {
  @IsNotEmpty()
  @IsString()
  userId: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => VenlyUserWallet)
  wallets: VenlyUserWallet[];
}
