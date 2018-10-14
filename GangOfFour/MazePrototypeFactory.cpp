class MazePrototypeFactory: public MazeFactory {
    public: 
        MazePrototypeFactory::MazePrototypeFactory (Maze* m, Wall* w, Room* r, Door* d) {
            _prototypeMaze = m;
            _prototypeWall = w;
            _prototypeRoom = r;
            _prototypeDoor = d;
        }
        virtual Maze* MakeMaze() const {
            
        }
        virtual Room* MakeRoom(int) const;
        virtual Wall* MakeWall() const {
            return _prototypeWall->Clone();
        }
        virtual Door* MakeDoor(Room*, Room*) const {
            Door* door = _prototypeDoor->Clone();
            door->Initialize(r1, r2);
            return door;
        }
    
    private:
        Maze* _prototypeMaze;
        Room* _prototypeRoom;
        Wall* _prototypeWall;
        Door* _prototypeDoor;
        
}
