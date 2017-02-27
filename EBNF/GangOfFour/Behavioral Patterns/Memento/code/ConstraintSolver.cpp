class ConstraintSolver {
    public:
        static ConstraintSolver* Instance();
        
        void Solve();
        void AddConstraint(Graphic* startConnection, Graphic* endConnection);
        void RemoveConstraint(Graphic* startConnection, Graphic* endConnection);
        
        ConstraintSolverMemento* CreateMemento();
        void SetMemento(ConstraintSolverMemento*);
        
    private:
        // nontrivial state and operations for enforcing
        // connectivity semantics
};
