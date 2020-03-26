/** we have 3 node available (1, 2, 3) */

let api = 'bctestnet3.brimstone.xpxsirius.io:3000';

export const NODE_URL = {
    xpxsirius : `http://${api}`,
    wsnNodeUrl: `ws://${api}`,
    setNode   :  setNode  
};

function setNode(n=3) {
    api                 = `bctestnet${n}.brimstone.xpxsirius.io:3000`;
    NODE_URL.xpxsirius  = `http://${api}`;
    NODE_URL.wsnNodeUrl = `ws://${api}`;
}

