class PrintNEmployees : public ListTraverser<Employee*> {
    public:
        PrintNEmployees(List<Employee*>* aList, int n) : ListTraverser<Employee*>(aList), _total(n), _count(0) {
        
        }
        
        bool PrintNEmployees::ProcessItem (Employee* const& e) {
            _count++;
            e->Print();
            
            return _count < _total;
        }
        
        //List<Employee*>* employees;
        // ...
        //PrintNEmployees pa(employees, 10);
        //pa.Traverse();
        
        //ListIterator<Employee*> i(employees);
        //int count = 0;
        
        //for (i.First(); !i.IsDone(); i.Next()) {
        //    count++;
        //    i.CurrentItem()->Print();
            
        //    if (count >= 10) {
        //        break;
        //    }
        //}
        
    protected:
        bool ProcessItem(Employee* const&);
        
    private:
        int _total;
        int _count;
};
