export type SessionShort = {
    id:             number
    gm_id:          number
    gm_name:        string
    name:           string
    description:    string
    players:        Player[]
    pawns:       Pawn[]
}

export type Player = {
    id:             number
    name:           string
}

export type Pawn = {
    id:             number
    chara_id:       number
    mana:           object | null
    physical:       object | null
    mental:         object | null
    pathological:   object | null
    endurance:      object | null
    side:           number
}

export type PawnSeed = {
    linked_id:       number
    side:           number
    hidden:         string
}
