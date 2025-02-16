import { Pawn } from "@/types/sesssion_types";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trash } from "lucide-react";

interface EntityCardProps {
    pawn: Pawn;
    setModalAction?: ((value: React.SetStateAction<"heal" | "attack" | null>) => void) | null;
    setSelectedPawn?: ((value: Pawn) => void) | null;
    setIsModalOpen?: ((value: React.SetStateAction<boolean>) => void) | null;
    deletePawn?: (() => void) | null;
}

function EntityCard({ pawn, setModalAction = null, setSelectedPawn = null, setIsModalOpen = null, deletePawn = null}: EntityCardProps) {

    return (
        <Card className="w-full max-w-sm bg-white bg-opacity-50 shadow-md rounded-xl">
            <CardHeader>
                <div className=" flex justify-between">
                    <CardTitle className="text-lg font-semibold truncate">{pawn.name}</CardTitle>
                    {deletePawn && <Button className="max-w-50" onClick={deletePawn}><Trash/></Button>}
                </div>
            </CardHeader>
            <CardContent className="space-y-2">
                <p className="text-sm text-gray-700">Mana: {pawn.mana?.current ?? "?"} / {pawn.mana?.max ?? "?"}</p>
                <p className="text-sm text-gray-700">Physical: {pawn.physical?.current ?? "?"} / {pawn.physical?.max ?? "?"}</p>
                <p className="text-sm text-gray-700">Mental: {pawn.mental?.current ?? "?"} / {pawn.mental?.max ?? "?"}</p>
                <p className="text-sm text-gray-700">Pathological: {pawn.pathological?.current ?? "?"} / {pawn.pathological?.max ?? "?"}</p>
                <p className="text-sm text-gray-700">Endurance: {pawn.endurance?.current ?? "?"} / {pawn.endurance?.max ?? "?"}</p>
                <p className="text-sm font-medium text-gray-900">Side: {pawn.side}</p>
                { setModalAction && setSelectedPawn && setIsModalOpen &&
                    <div className="flex flex-col gap-3 mt-4">
                        <Button className="bg-green-500" onClick={() => {
                            setSelectedPawn && setSelectedPawn(pawn);
                            setModalAction && setModalAction("heal");
                            setIsModalOpen && setIsModalOpen(true);
                        }}>
                            Soigner
                        </Button>
                        <Button className="bg-red-500" onClick={() => {
                            setSelectedPawn && setSelectedPawn(pawn);
                            setModalAction && setModalAction("attack");
                            setIsModalOpen && setIsModalOpen(true);
                        }}>
                            Attaquer
                        </Button>
                    </div>
                }
            </CardContent>
        </Card>
    );
}

export default EntityCard;
