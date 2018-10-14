/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package AdapterPattern;

/**
 *
 * @author Vlado
 */
public class ClassAFormat1 implements IStringProvider {
    private ClassA classA = null;
    
    public ClassAFormat1(final ClassA a)
    {
        classA = a;
    }
    
    public String getStringData() {
        return format(classA.getStringData());
    }

    private String format(final String sourceValue) {
        // Manipulate the source string into a format required 
        // by the object needing the source object's data
        return sourceValue.trim();
    }
    
    /*public String getStringData()
    {
        String ishod = "";
        
        return ishod;
    }*/
}
