#include "MapSite.cpp"

class Door: public MapSite {
    public:
        Door(Room* = 0, Room* = 0);
        virtual void Enter();
        Room* OtherSideFrom(Room*);

    private:
        Room* _room;
	Room* _room2;
	bool _isOpen;   
};
