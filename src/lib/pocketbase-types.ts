import type PocketBase from "pocketbase";
import type { RecordService } from "pocketbase";

export enum Collections {
  Games = "games",
  Images = "images",
  Tools = "tools",
}

export type IsoDateString = string;
export type RecordIdString = string;
export type HTMLString = string;

export type BaseSystemFields<T = never> = {
  id: RecordIdString;
  created: IsoDateString;
  updated: IsoDateString;
  collectionId: string;
  collectionName: Collections;
  expand?: T;
};

export enum GamesPlatformsOptions {
  "web" = "web",
  "win" = "win",
  "mac" = "mac",
  "linux" = "linux",
  "mobile" = "mobile",
}

export type GamesRecord = {
  number: number;
  slug: string;
  name: string;
  description: HTMLString;
  platforms: GamesPlatformsOptions[];
  tool: RecordService<ToolsRecord>;
  cover: RecordService<ImagesRecord>;
  link: string;
  released: IsoDateString;
};

export type ToolsRecord = {
  icon: string;
  name: string;
};

export type ImagesRecord = {
  image: string;
  alt: string;
};
