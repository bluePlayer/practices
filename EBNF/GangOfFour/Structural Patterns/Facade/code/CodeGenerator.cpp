/*
 * The class CodeGenerator is a visitor (see Visitor (366)).
 * CodeGenerator has subclasses, for example, StackMachineCodeGenerator and
 * RISCCodeGenerator, that generate machine code for different hardware architectures.
 */
class CodeGenerator {
    public:
        virtual void Visit(StatementNode*);
        virtual void Visit(ExpressionNode*);
        // ...
        
    protected:
        CodeGenerator(BytecodeStream&);
        BytecodeStream& _output;
};
