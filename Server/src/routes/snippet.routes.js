import { Router } from "express";
import verifyJWT from "../middlewares/auth.middleware.js";
import { createSnippet,deleteSnippet,updateSnippet,getUserSnippets,gettags, getFilteredSnippets } from "../controllers/snippet.controller.js";

const snippetrouter = Router();
snippetrouter.route('/create').post(verifyJWT,createSnippet);
snippetrouter.route('/delete').delete(verifyJWT,deleteSnippet);
snippetrouter.route('/update').put(verifyJWT,updateSnippet);
snippetrouter.route('/userSnippets').get(verifyJWT,getUserSnippets);
snippetrouter.route('/gettags').get(verifyJWT,gettags);
snippetrouter.route('/filteredSnippets').post(verifyJWT,getFilteredSnippets);

export default snippetrouter;