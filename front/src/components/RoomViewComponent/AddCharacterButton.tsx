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
import { CharacterBasicInfo } from "@/types/character_types";
import CharacterModificationUtilsService from "@/services/CharacterModifiactionUtils";

export function SelectCharacter() {
    const [ characters, setCharacters ] = useState<CharacterBasicInfo[]>([])
    const [ modalOpen, setModalOpen ] = useState<boolean>(false)
    const hasLoaded = useRef<boolean>(false)

    const openModal = () => {
        if (!hasLoaded.current) {
            CharacterModificationUtilsService.getCharacters().then((characters) => {
                console.log(characters);
                setCharacters(characters);
                hasLoaded.current = true
            })
        }
        setModalOpen(true);
    }

    return (
        <>
            <Button onClick={openModal}>Ajouter un personnage</Button>
            <Dialog open={modalOpen} onOpenChange={setModalOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Ajouter un personnage</DialogTitle>
                        <DialogDescription>
                            Sélectionnez un personnage à ajouter à la partie
                        </DialogDescription>
                    </DialogHeader>
                    <Select>
                        <SelectTrigger>
                            <SelectValue placeholder="Sélectionnez un personnage" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                {characters.map((character) => (
                                    <SelectItem key={character.id} value={`${character.id}`}>
                                        {character.infos.name}
                                    </SelectItem>
                                ))}
                            </SelectGroup>
                        </SelectContent>
                    </Select> 
                    <DialogFooter>
                        <Button onClick={() => setModalOpen(false)}>Annuler</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    )
}
