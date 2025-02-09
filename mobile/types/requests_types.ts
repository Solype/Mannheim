export type FriendRequest = {
    request_id:     number,
    sender_id:      number,
    sender_name:    string,
    receiver_id:    number,
    receiver_name:  string,
    status:         "pending" | "accepted" | "refused"
}


export type RoomRequest = {
    request_id:     number,
    sender_id:      number,
    sender_name:    string,
    receiver_id:    number,
    receiver_name:  string,
    room_id:        number,
    room_name:      string,
    status:         "pending" | "accepted" | "refused"
}

export type CharacterRequest = {
    request_id:     number,
    sender_id:      number,
    sender_name:    string,
    receiver_id:    number,
    receiver_name:  string,
    character_id:   number,
    character_name: string,
    status:         "pending" | "accepted" | "refused"
}