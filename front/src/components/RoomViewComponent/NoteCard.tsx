import {
    Card,
    CardContent,
    CardTitle,
} from "@/components/ui/card";
import { Note } from "@/types/sesssion_types";
import { Button } from "@/components/ui/button";
import { EyeOff, Forward, Pencil, Settings, Trash } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@radix-ui/react-popover";
import sessionService from "@/services/SessionService";


interface NoteCardProps {
    sessionId: string;
    note: Note;
    isGm?: boolean;
}

export default function NoteCard({ sessionId, note, isGm = false }: NoteCardProps) {

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
                        <Button variant={"ghost"} size={"icon"}><Pencil/></Button>
                        {isGm && (
                            <Popover>
                                <PopoverTrigger asChild >
                                    <Button variant="ghost" size="icon">
                                        <Settings className="w-5 h-5" />
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-48 p-2 bg-white shadow-lg rounded-md border">
                                    <Button variant={"ghost"} className="w-full" onClick={deleteNote}><Trash/></Button>
                                    <Button variant={"ghost"} className="w-full" onClick={publishNote}>{note.is_public ? <EyeOff/> : <Forward/>}</Button>
                                </PopoverContent>
                            </Popover>
                        )}
                    </div>
                </div>
                <p className="mt-2 text-sm">{note.content}</p>
            </CardContent>
        </Card>
    );
}
