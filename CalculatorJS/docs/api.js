YUI.add("yuidoc-meta", function(Y) {
   Y.YUIDoc = { meta: {
    "classes": [
        "APPLICATION",
        "Constants",
        "EventFunctions",
        "Main",
        "Trigonometry"
    ],
    "modules": [
        "APPLICATION",
        "Calculator"
    ],
    "allModules": [
        {
            "displayName": "APPLICATION",
            "name": "APPLICATION",
            "description": "APPLICATION is a main application file that holds general properties and functions for the whole application\nIt also holds the main Calculator namespace. All necessary initializations are made in init() function."
        },
        {
            "displayName": "Calculator",
            "name": "Calculator",
            "description": "Calculator submodule. It contains all calculator related properties, methods and submodules, like, Main, Trigonometry."
        }
    ]
} };
});