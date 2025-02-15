import {
    Card,
    CardContent,
    CardTitle,
} from "@/components/ui/card";
import { Note } from "@/types/sesssion_types";
import { Button } from "@/components/ui/button";
import { Pencil, Settings, Trash } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@radix-ui/react-popover";

interface NoteCardProps {
    note: Note;
    isGm?: boolean;
}

export default function NoteCard({ note, isGm = false }: NoteCardProps) {
    return (
        <Card className="w-full max-w-sm">
            <CardContent>
                <div className="flex justify-between items-center">
                    <CardTitle>Note n°{note.id}</CardTitle>
                    {isGm && (
                        <Popover>
                            {/* ✅ `asChild` pour éviter que Radix UI perde le focus instantanément */}
                            <PopoverTrigger asChild >
                                <Button variant="ghost" size="icon">
                                    <Settings className="w-5 h-5" />
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-48 p-2 bg-white shadow-lg rounded-md border">
                                <Button variant={"ghost"} className="w-full"><Trash/></Button>
                                <Button variant={"ghost"} className="w-full"><Pencil/></Button>
                            </PopoverContent>
                        </Popover>
                    )}
                </div>
                <p className="mt-2 text-sm">{note.content}</p>
            </CardContent>
        </Card>
    );
}
