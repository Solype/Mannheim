import UserRequestService from '@/services/UserRequestService';
import { FriendRequest, RoomRequest, CharacterRequest } from '@/types/requests_types';
import React, { useEffect, useState } from 'react';

const InvitationsPage: React.FC = () => {

    const [invitations, setInvitations] = useState<FriendRequest[]>([]);
    const [sessions, setSessions] = useState<RoomRequest[]>([]);
    const [characters, setCharacters] = useState<CharacterRequest[]>([]);

    useEffect(() => {
        UserRequestService.getFriendsRequest().then((res) => {
            setInvitations(res);
        })
        UserRequestService.getRoomsRequest().then((res) => {
            setSessions(res);
        })
    }, []);

    const acceptFriendRequest = async (request_id: number) => {
        await UserRequestService.acceptFriendRequest(request_id);
        setInvitations(prevInvitations => prevInvitations.filter(invitation => invitation.request_id !== request_id));
    };

    const declineFriendRequest = async (request_id: number) => {
        await UserRequestService.rejectFriendRequest(request_id);
        setInvitations(prevInvitations => prevInvitations.filter(invitation => invitation.request_id !== request_id));
    }

    const acceptRoomRequest = async (request_id: number) => {
        await UserRequestService.acceptRoomRequest(request_id);
        setSessions(prevSessions => prevSessions.filter(session => session.request_id !== request_id));
    }

    const declineRoomRequest = async (request_id: number) => {
        await UserRequestService.rejectRoomRequest(request_id);
        setSessions(prevSessions => prevSessions.filter(session => session.request_id !== request_id));
    }

    const acceptCharacterRequest = async (request_id: number) => {
        await UserRequestService.acceptCharacterRequest(request_id);
        setCharacters(prevCharacters => prevCharacters.filter(character => character.request_id !== request_id));
    }

    const declineCharacterRequest = async (request_id: number) => {
        await UserRequestService.rejectCharacterRequest(request_id);
        setCharacters(prevCharacters => prevCharacters.filter(character => character.request_id !== request_id));
    }

    return (
        <div className="text-center mt-5">
            <h1 className="text-4xl font-bold">Invitations</h1>
            <p className="text-lg mt-4">Welcome to the Invitations!</p>
            <div>
                {
                    invitations.map((invitation) => (
                        <div key={invitation.request_id}>

                            <p>{invitation.sender_name} a envoyé une invitation a {invitation.receiver_name}</p>
                            <button onClick={() => acceptFriendRequest(invitation.request_id)}>Accepter</button>
                            <button onClick={() => declineFriendRequest(invitation.request_id)}>Refuser</button>
                        </div>
                    ))
                }
            </div>
            <div>
                {
                    sessions.map((session) => (
                        <div key={session.room_id}>
                            <p>{session.sender_name} a envoyé une invitation a {session.receiver_name}</p>
                            <button onClick={() => acceptRoomRequest(session.request_id)}>Accepter</button>
                            <button onClick={() => declineRoomRequest(session.request_id)}>Refuser</button>
                        </div>
                    ))
                }
            </div>
            <div>
                {
                    characters.map((character) => (
                        <div key={character.request_id}>
                            <p>{character.sender_name} a envoyé une invitation a {character.receiver_name}</p>
                            <button onClick={() => acceptCharacterRequest(character.request_id)}>Accepter</button>
                            <button onClick={() => declineCharacterRequest(character.request_id)}>Refuser</button>
                        </div>
                    ))
                }
            </div>
        </div>
    );
};

export default InvitationsPage;
