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
    name:           string
    chara_id:       number | null
    mana:           Monitor | null
    physical:       Monitor | null
    mental:         Monitor | null
    pathological:   Monitor | null
    endurance:      Monitor | null
    side:           number
}

export type Monitor = {
    current:        number
    max:            number
}

export type PawnSeed = {
    linked_id:       number
    side:           number
    hidden:         string
}
