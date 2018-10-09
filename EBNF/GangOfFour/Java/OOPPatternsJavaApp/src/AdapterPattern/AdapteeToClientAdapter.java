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
public class AdapteeToClientAdapter {
    private final Adaptee instance;
    
    public AdapteeToClientAdapter(final Adaptee instance) {
         this.instance = instance;
    }

    @Override
    public void clientMethod() {
       // call Adaptee's method(s) to implement Client's clientMethod
    }
}
