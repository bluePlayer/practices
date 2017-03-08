class InventoryVisitor : public EquipmentVisitor {
    public:
        InventoryVisitor();
        
        Inventory& Get Inventory();
        
        virtual void VisitFloppyDisk(FloppyDisk*);
        virtual void VisitCard(Card*);
        virtual void VisitChassis(Chassis*);
        virtual void VisitBus(Bus*);
        //...
        
        void InventoryVisitor::VisitFloppyDisk (FloppyDisk* e) {
            _inventory.Accumulate(e);
        }
        
        void InventoryVisitor::VisitChassis (Chassis* e) {
            _inventory.Accumulate(e);
        }
        
        Equipment* component;
        InventoryVisitor visitor;
        
        component->Accept(visitor);
        cout << "Inventory " << component->Name() << visitor.GetInventory();
        
    private:
        Inventory _inventory; 
};
