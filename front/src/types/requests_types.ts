export type FriendRequest = {
    request_id:     number,
    sender_id:      number,
    sender_name:    string,
    receiver_id:    number,
    receiver_name:  string,
    status:         "pending" | "accepted" | "refused"
}

