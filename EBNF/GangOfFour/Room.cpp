#include "MapSite.cpp"
#include <string>
#include <iostream>

class Room: public MapSite {
   public:
      void SetSide(std::string Direction, MapSite*);
      virtual void Enter();
    
   private: 
      MapSite* _sides[4]; 
      int _roomNumber;
   
};
