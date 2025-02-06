import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
 
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import {
    Button
} from "@/components/ui/button"

import { useRef, useState } from "react";
import friendService from "@/services/FriendService";
import { Friend } from "@/types/friend_types";
import UserRequestService from "@/services/UserRequestService";

export function SelectFriend({room_id}: {room_id: number}) {
    const [ friend, setFriend ] = useState<Friend[]>([])
    const [ modalOpen, setModalOpen ] = useState<boolean>(false)
    const hasLoaded = useRef<boolean>(false)
    const [ friendSelected, setFriendSelected ] = useState<number | null>(null)

    const openModal = () => {
        if (!hasLoaded.current) {
            friendService.getMyFriends().then((friends: Friend[]) => {
                setFriend(friends);
            })
        }
        setModalOpen(true);
    }

    const confirm = () => {
        if (friendSelected === null) {
            alert("Veuillez sélectionner un ami");
            return;
        }
        UserRequestService.sendRoomInvitation(room_id, friendSelected).then(() => {
            setModalOpen(false);
        })
    }

    const handleFriendSelect = (value : string) => {
        const friendId = Number(value);
        setFriendSelected(friendId);
    }

    return (
        <>
            <Button onClick={openModal}>Ajouter un Ami</Button>
            <Dialog open={modalOpen} onOpenChange={setModalOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Ajouter un Ami</DialogTitle>
                        <DialogDescription>
                            Sélectionnez un Ami à ajouter à la partie
                        </DialogDescription>
                    </DialogHeader>
                    <Select onValueChange={handleFriendSelect}>
                        <SelectTrigger>
                            <SelectValue placeholder="Sélectionnez un Ami" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                {friend.map((friend) => (
                                    <SelectItem key={friend.id} value={`${friend.id}`}>
                                        {friend.name}
                                    </SelectItem>
                                ))}
                            </SelectGroup>
                        </SelectContent>
                    </Select> 
                    <DialogFooter>
                        <Button onClick={confirm}>Ajouter</Button>
                        <Button onClick={() => setModalOpen(false)}>Annuler</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    )
}
