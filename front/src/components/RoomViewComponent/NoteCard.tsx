import {
    Card,
    CardContent,
    CardTitle,
} from "@/components/ui/card";
import { Note } from "@/types/sesssion_types";

interface NoteCardProps {
    note: Note;
}

export default function NoteCard({ note }: NoteCardProps) {
    return (
        <Card>
            <CardContent>
                <CardTitle>{note.content}</CardTitle>
            </CardContent>
        </Card>
    );
}
