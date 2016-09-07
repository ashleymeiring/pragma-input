# pragma-input

This control is still under construction and not reconmended for use yet.

This is a aurelia input control.  
It features four main parts:  
1. label  
2. input  
3. lookup button  
4. descriptor

This is a composite control for common functionality and also includes a strong emphasis on accessablity.  
This composite does not use shadowdom yet as the aurelia implementation has not reached browsers yet.  
The downside of that is that the control has some complexity with regards to id management.

NOTE: you must provide a id attribute for a pragma-input instance as it is needed to make attribute assignments internally.

The upside of not having the shadowdom is that application styles are allowed to influence the control.  
This means that if you have particular styling needs for labels, inputs and lookup style buttons, you can define that on the application level once.

The lookup button is optional and is only visible when you set the lookup-id attribute.

