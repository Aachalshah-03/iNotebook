import { createContext } from "react";  //create a global Context to share data between components without passing props manually.

const NoteContext = createContext();   //creating a new context called NoteContext

export default NoteContext;