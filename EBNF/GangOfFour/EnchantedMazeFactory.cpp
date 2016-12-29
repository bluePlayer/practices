class EnchantedMazeFactory: public MazeFactory {
	public:
		EnchantedMazeFactory();
		virtual Room* MakeRoom(int n) const {
			return new EnchantedMazeFactory(n, CastSpell());
		}

		virtual Door* MakerDoor(Room* r1, Room* r2) const {
			return new DoorNeedingSpeel(r1, r2);
		}

	protected:

		Spell* CastSpell() const;
};
