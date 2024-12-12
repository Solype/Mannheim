import UserRequestService from '@/services/UserRequestService';
import { FriendRequest } from '@/types/requests_types';
import React, { useEffect, useState } from 'react';

const InvitationsPage: React.FC = () => {

    const [invitations, setInvitations] = useState<FriendRequest[]>([]);

    useEffect(() => {
        UserRequestService.getFriendsRequest().then((res) => {
            setInvitations(res);
        })
    }, []);

    return (
        <div className="text-center mt-5">
            <h1 className="text-4xl font-bold">Invitations</h1>
            <p className="text-lg mt-4">Welcome to the Invitations!</p>
            <div>
                {
                    invitations.map((invitation) => (
                        <div key={invitation.request_id}>

                            <p>{invitation.sender_name} a envoyé une invitation a {invitation.receiver_name}</p>
                            <button onClick={() => UserRequestService.acceptFriendRequest(invitation.request_id)}>Accepter</button>
                            <button onClick={() => UserRequestService.rejectFriendRequest(invitation.request_id)}>Refuser</button>
                        </div>
                    ))
                }
            </div>
        </div>
    );
};

export default InvitationsPage;
