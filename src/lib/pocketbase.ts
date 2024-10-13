import PocketBase from "pocketbase";
import type { TypedPocketBase } from "./pocketbase-types";

export const URL = "https://db.aymeri100.fr";
export const GAMES_COLLECTION_ID = "lpxgbuvaexmfao6";

export const pb = new PocketBase(URL) as TypedPocketBase;