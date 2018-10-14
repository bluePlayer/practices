#include "Maze.cpp"
#include "Wall.cpp"
#include "Room.cpp"
#include "Door.cpp"

class MazeFactory {
    public:
	MazeFactory();

        virtual Maze* MakeMaze() const {
    	     	return new Maze;
	}

	virtual Wall* MakeWall() const {
		return new Wall;
	}

	virtual Room* MakeRoom(int n) const {
		return new Room(n);
	}

	virtual Door* MakerDoor(Room* r1, Room* r2) const {
		return new Door(r1, r2);
	}
};
