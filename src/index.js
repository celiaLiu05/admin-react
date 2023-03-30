import React from "react";
import ReactDOM  from "react-dom";

import App from "./App";

import storageUtils from "./utils/storageUtils"
import memoryUtils from "./utils/memoryUtils"

// 读取local中保存的user，保存到内存中去
memoryUtils.user = storageUtils.getUser('getUser')
ReactDOM.render(<App />, document.getElementById("root")) 