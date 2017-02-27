class ConstraintSolverMemento {
    public:
        virtual ~ConstraintSolverMemento();
        
    private:
        friend class ConstraintSolver;
        ConstraintSolverMemento();
        // private constraint solver state
};
