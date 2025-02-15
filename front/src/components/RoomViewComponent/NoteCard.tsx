import {
    Card,
    CardContent,
    CardTitle,
} from "@/components/ui/card";
import { Note } from "@/types/sesssion_types";
import { Button } from "@/components/ui/button";
import { EyeOff, Forward, Pencil, Settings, Trash, Save, Ban } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@radix-ui/react-popover";
import sessionService from "@/services/SessionService";
import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";


interface NoteCardProps {
    sessionId: string;
    note: Note;
    isGm?: boolean;
}


export default function NoteCard({ sessionId, note, isGm = false }: NoteCardProps) {

    const [ content, setContent ] = useState<string>(note.content);
    const [ isEditing, setIsEditing ] = useState<boolean>(false);

    const handleOnClickEditing = () => {
        setIsEditing(true);
    }

    const handleCancelEditing = () => {
        setIsEditing(false);
    }

    const handleSaveEditing = async () => {
        await sessionService.updateNote(sessionId, note.id, content);
        setIsEditing(false);
    }

    const deleteNote = async () => {
        await sessionService.deleteNote(sessionId, note.id);
    }

    const publishNote = async () => {
        await sessionService.modifyNotePublic(sessionId, note.id);
    }

    return (
        <Card className="w-full max-w-sm">
            <CardContent>
                <div className="flex justify-between items-center">
                    <CardTitle>Note n°{note.id}</CardTitle>
                    <div>
                        {
                            isEditing && (
                                <>
                                    <Button variant={"ghost"} size={"icon"} onClick={handleCancelEditing}><Ban/></Button>
                                    <Button variant={"ghost"} size={"icon"} onClick={handleSaveEditing}><Save/></Button>
                                </>
                            )
                        }
                        {isGm && (
                            <Popover>
                                <PopoverTrigger asChild >
                                    <Button variant="ghost" size="icon">
                                        <Settings className="w-5 h-5" />
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="p-2 bg-white shadow-lg rounded-md border">
                                    <Button variant={"ghost"} size={"icon"} onClick={handleOnClickEditing}><Pencil/></Button>
                                    <Button variant={"ghost"} size={"icon"} onClick={deleteNote}><Trash/></Button>
                                    <Button variant={"ghost"} size={"icon"} onClick={publishNote}>{note.is_public ? <EyeOff/> : <Forward/>}</Button>
                                </PopoverContent>
                            </Popover>
                        )}
                    </div>
                </div>
                {
                    isEditing ? (
                        <Textarea className="mt-2" value={content} onChange={(e) => setContent(e.target.value)}/>
                    ) : (<p className="mt-2 text-sm">{note.content}</p>)
                }
            </CardContent>
        </Card>
    );
}
