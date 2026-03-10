import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Plus, Trash2, Loader2, Layers, BookOpen } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";

interface CustomBoard {
  id: string;
  name: string;
  state: string | null;
  is_active: boolean;
  created_at: string;
}

const DEFAULT_BOARDS = ["CBSE", "ICSE", "Bihar Board", "Other"];

const BoardsManagement = () => {
  const { toast } = useToast();
  const [boards, setBoards] = useState<CustomBoard[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAdd, setShowAdd] = useState(false);
  const [adding, setAdding] = useState(false);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [newBoard, setNewBoard] = useState({ name: "", state: "" });

  useEffect(() => {
    loadBoards();
  }, []);

  const loadBoards = async () => {
    setLoading(true);
    const { data, error } = await supabase.functions.invoke("get-students", {
      body: { action: "list_boards" },
    });
    if (!error && data?.boards) {
      setBoards(data.boards);
    }
    setLoading(false);
  };

  const handleAddBoard = async () => {
    if (!newBoard.name.trim() || newBoard.name.trim().length < 2) {
      toast({ title: "Error", description: "Board name must be at least 2 characters", variant: "destructive" });
      return;
    }
    setAdding(true);
    const sessionToken = localStorage.getItem("adminSessionToken");
    const { data, error } = await supabase.functions.invoke("get-students", {
      body: {
        action: "add_board",
        session_token: sessionToken,
        board_name: newBoard.name.trim(),
        board_state: newBoard.state.trim(),
      },
    });
    if (error || data?.error) {
      toast({ title: "Error", description: data?.error || "Failed to add board", variant: "destructive" });
    } else {
      toast({ title: "Success", description: `Board "${newBoard.name}" added!` });
      setNewBoard({ name: "", state: "" });
      setShowAdd(false);
      loadBoards();
    }
    setAdding(false);
  };

  const handleDeleteBoard = async (boardId: string, boardName: string) => {
    setDeleting(boardId);
    const sessionToken = localStorage.getItem("adminSessionToken");
    const { data, error } = await supabase.functions.invoke("get-students", {
      body: {
        action: "delete_board",
        session_token: sessionToken,
        board_id: boardId,
      },
    });
    if (error || data?.error) {
      toast({ title: "Error", description: data?.error || "Failed to delete board", variant: "destructive" });
    } else {
      toast({ title: "Deleted", description: `Board "${boardName}" removed` });
      loadBoards();
    }
    setDeleting(null);
  };

  return (
    <div className="edu-card overflow-hidden">
      <div className="p-3 sm:p-4 border-b border-border bg-secondary/30 flex items-center justify-between">
        <h2 className="font-bold flex items-center gap-2 text-sm sm:text-base">
          <Layers className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
          Board Management
        </h2>
        <Dialog open={showAdd} onOpenChange={setShowAdd}>
          <DialogTrigger asChild>
            <Button size="sm" className="text-xs sm:text-sm">
              <Plus className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
              Add Board
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Board</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label>Board Name *</Label>
                <Input
                  placeholder="e.g. UP Board, MP Board, Jharkhand Board"
                  value={newBoard.name}
                  onChange={(e) => setNewBoard(p => ({ ...p, name: e.target.value }))}
                />
              </div>
              <div>
                <Label>State (optional)</Label>
                <Input
                  placeholder="e.g. Uttar Pradesh"
                  value={newBoard.state}
                  onChange={(e) => setNewBoard(p => ({ ...p, state: e.target.value }))}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowAdd(false)}>Cancel</Button>
              <Button onClick={handleAddBoard} disabled={adding}>
                {adding && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                Add Board
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="p-3 sm:p-4">
        {/* Default Boards */}
        <h3 className="text-xs font-semibold text-muted-foreground uppercase mb-2">Default Boards</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4">
          {DEFAULT_BOARDS.map((board) => (
            <div key={board} className="p-3 rounded-lg border border-border bg-muted/30 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium">{board}</span>
            </div>
          ))}
        </div>

        {/* Custom Boards */}
        <h3 className="text-xs font-semibold text-muted-foreground uppercase mb-2 mt-4">Custom Boards (State Boards)</h3>
        {loading ? (
          <div className="flex justify-center py-8">
            <Loader2 className="w-6 h-6 animate-spin text-primary" />
          </div>
        ) : boards.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <Layers className="w-8 h-8 mx-auto mb-2 opacity-50" />
            <p className="text-sm">No custom boards added yet</p>
            <p className="text-xs">Click "Add Board" to add state boards</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {boards.map((board) => (
              <div key={board.id} className="p-3 rounded-lg border border-border bg-background flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-accent-foreground" />
                  <div>
                    <p className="text-sm font-medium">{board.name}</p>
                    {board.state && <p className="text-xs text-muted-foreground">{board.state}</p>}
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-destructive hover:text-destructive"
                  onClick={() => handleDeleteBoard(board.id, board.name)}
                  disabled={deleting === board.id}
                >
                  {deleting === board.id ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Trash2 className="w-4 h-4" />
                  )}
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BoardsManagement;
