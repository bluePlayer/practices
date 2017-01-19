/*
 * This implementation hard-codes the type of code generator to use so that
 * programmers aren't required to specify the target architecture. That might be
 * reasonable if there's only ever one target architecture. If that's not the case,
 * then we might want to change the Compiler constructor to take a CodeGenerator
 * parameter. Then programmers can specify the generator to use when they instantiate
 * Compiler. The compiler facade can parameterize other participants such as Scanner
 * and ProgramNodeBuilder as well, which adds flexibility, but it also detracts from
 * the Facade pattern's mission, which is to simplify the interface for the common
 * case.
 */
class Compiler {
    public:
        Compiler();
        
        virtual void Compile(istream&, BytecodeStream&);
        
        void Compiler::Compile (istream& input, BytecodeStream& output) {
            Scanner scanner(input);
            ProgramNodeBuilder builder;
            Parser parser;
            
            parser.Parse(scanner, builder);
            
            RISCCodeGenerator generator(output);
            ProgramNode* parseTree = builder.GetRootNode();
            parseTree->Traverse(generator);
        }
};
