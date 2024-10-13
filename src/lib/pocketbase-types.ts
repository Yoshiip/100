/**
* This file was @generated using pocketbase-typegen
*/

import type PocketBase from 'pocketbase'
import type { RecordService } from 'pocketbase'

export enum Collections {
	Actions = "actions",
	AnonymizedGamesView = "anonymized_games_view",
	Games = "games",
	Logos = "logos",
	Tools = "tools",
}

// Alias types for improved usability
export type IsoDateString = string
export type RecordIdString = string
export type HTMLString = string

// System fields
export type BaseSystemFields<T = never> = {
	id: RecordIdString
	created: IsoDateString
	updated: IsoDateString
	collectionId: string
	collectionName: Collections
	expand?: T
}

export type AuthSystemFields<T = never> = {
	email: string
	emailVisibility: boolean
	username: string
	verified: boolean
} & BaseSystemFields<T>

// Record types for each collection

export enum ActionsTypeOptions {
	"iframe" = "iframe",
	"link" = "link",
	"web" = "web",
	"win" = "win",
	"mac" = "mac",
	"linux" = "linux",
	"mobile" = "mobile",
}
export type ActionsRecord = {
	text?: string
	type?: ActionsTypeOptions
	url: string
}

export type AnonymizedGamesViewRecord<Tactions = unknown, Tbanner = unknown, Tcover = unknown, Tdescription = unknown, Tname = unknown, Tplatforms = unknown, Tslug = unknown, Tsubtitle = unknown, Ttool = unknown> = {
	actions?: null | Tactions
	banner?: null | Tbanner
	cover?: null | Tcover
	description?: null | Tdescription
	name?: null | Tname
	number: number
	platforms?: null | Tplatforms
	released?: IsoDateString
	slug?: null | Tslug
	subtitle?: null | Tsubtitle
	tool?: null | Ttool
}

export enum GamesPlatformsOptions {
	"web" = "web",
	"win" = "win",
	"mac" = "mac",
	"linux" = "linux",
	"mobile" = "mobile",
}
export type GamesRecord = {
	actions?: RecordIdString[]
	banner?: string
	cover?: string
	description?: HTMLString
	name: string
	number: number
	platforms?: GamesPlatformsOptions[]
	plays?: number
	released?: IsoDateString
	slug: string
	subtitle?: string
	tool?: RecordIdString
}

export type LogosRecord = {
	animation?: string
	number?: number
	preview?: string
}

export type ToolsRecord = {
	icon?: string
	name: string
}

// Response types include system fields and match responses from the PocketBase API
export type ActionsResponse<Texpand = unknown> = Required<ActionsRecord> & BaseSystemFields<Texpand>
export type AnonymizedGamesViewResponse<Tactions = unknown, Tbanner = unknown, Tcover = unknown, Tdescription = unknown, Tname = unknown, Tplatforms = unknown, Tslug = unknown, Tsubtitle = unknown, Ttool = unknown, Texpand = unknown> = Required<AnonymizedGamesViewRecord<Tactions, Tbanner, Tcover, Tdescription, Tname, Tplatforms, Tslug, Tsubtitle, Ttool>> & BaseSystemFields<Texpand>
export type GamesResponse<Texpand = unknown> = Required<GamesRecord> & BaseSystemFields<Texpand>
export type LogosResponse<Texpand = unknown> = Required<LogosRecord> & BaseSystemFields<Texpand>
export type ToolsResponse<Texpand = unknown> = Required<ToolsRecord> & BaseSystemFields<Texpand>

// Types containing all Records and Responses, useful for creating typing helper functions

export type CollectionRecords = {
	actions: ActionsRecord
	anonymized_games_view: AnonymizedGamesViewRecord
	games: GamesRecord
	logos: LogosRecord
	tools: ToolsRecord
}

export type CollectionResponses = {
	actions: ActionsResponse
	anonymized_games_view: AnonymizedGamesViewResponse
	games: GamesResponse
	logos: LogosResponse
	tools: ToolsResponse
}

// Type for usage with type asserted PocketBase instance
// https://github.com/pocketbase/js-sdk#specify-typescript-definitions

export type TypedPocketBase = PocketBase & {
	collection(idOrName: 'actions'): RecordService<ActionsResponse>
	collection(idOrName: 'anonymized_games_view'): RecordService<AnonymizedGamesViewResponse>
	collection(idOrName: 'games'): RecordService<GamesResponse>
	collection(idOrName: 'logos'): RecordService<LogosResponse>
	collection(idOrName: 'tools'): RecordService<ToolsResponse>
}
