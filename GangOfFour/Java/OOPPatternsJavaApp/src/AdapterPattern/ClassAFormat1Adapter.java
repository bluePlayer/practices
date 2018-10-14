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
public class ClassAFormat1Adapter extends ClassAFormat1 {
    
    public ClassAFormat1Adapter()
    {
        super(null);
    }
    
    public Object adapt(final Object anObject) {
      return new ClassAFormat1((ClassA)anObject);
   }
}
