#include "Wall.cpp"
#include "Room.cpp"
#include "BombedWall.cpp"
#include "RoomWithABomb.cpp"


BombedMazeFactory: public MazeFactory {
	Wall* BombedMazeFactory::MakeWall() const {
		return new BombedWall;
	}

	Room* BombedMazeFactory::MakeRoom(int n) const {
		return new RoomWithABomb(n);
	}
};
