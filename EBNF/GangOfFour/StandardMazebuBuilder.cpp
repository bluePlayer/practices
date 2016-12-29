#include "MazeBuilder.cpp"

class StandardMazeBuilder: public MazeBuilder {
	public:
		StandardMazeBuilder():: StandardMazeBuilder () {
			_currentMaze = 0;
		}

		void StandardMazeBuilder::BuildMaze () {
			_currentMaze = new Maze;
		}

		void StandardMazeBuilder::BuildRoom(int n) {
			if (!_currentMaze->RoomNo(n)) {
				Room* room = new Room(n);
				_currentMaze->AddRoom(room);
			}

			room->SetSide("North", new Wall);
			room->SetSide("South", new Wall);
			room->SetSide("East", new Wall);
			room->SetSide("West", new Wall);
		}

		void StandardMazeBuilder::BuildDoor(int n1, int n2) {
			Room* r1 = _currentMaze->RoomNo(n1);
			Room* r2 = _currentMaze->RoomNo(n2);

			Door* d = new Door(r1, r2);

			r1->SetSide(CommonWall(r1, r2), d);
			r2->SetSide(CommonWall(r2, r1), d);
		}
		
		Maze* StandardMazeBuilder::GetMaze () {
			return _currentMaze;		
		}

	private:
		Direction CommonWall(Room*, Room*);
		Maze* _currentMaze;
} 
