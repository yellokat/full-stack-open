# Console Analysis 
![image.png](image.png)

This procedure is what we first encounter in the SPA version of the notes app. It is no different from the non-SPA version of the app(although some filenames have changed, the data flow remains the same).

# Diagram
```mermaid
sequenceDiagram
    participant browser
    participant server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/spa
    activate server
    server-->>browser: HTML document
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
    activate server
    server-->>browser: the css file
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/spa.js
    activate server
    server-->>browser: the JavaScript file
    deactivate server

    Note right of browser: The browser starts executing the JavaScript code that fetches the JSON from the server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
    activate server
    server-->>browser: [{content: "hi from asia", date: "2025-02-03T17:13:52.505Z"},…]
    deactivate server

    Note right of browser: The browser executes the callback function that renders the notes
```