#include "MazeBuilder.cpp"

class CountingMazeBuilder: public MazeBuilder {
	public 
		CountingMazeBuilder::CountingMazeBuilder() {
			_rooms = _doors = 0;	
		}

		virtual void BuildMaze();
		void CountingMazeBuilder::BuildRoom(int) {
			_rooms += 1;
		}
		
		void CountingMazeBuilder::BuildDoor(int, int) {
			_doors += 1;
		}
		virtual void AddWall(int, Direction);
		
		void GetCounts(int& rooms, int& doors) const {
			rooms = _rooms;
			doors = _doors;
		}

	private: 
		int _doors;
		int _rooms;
};
