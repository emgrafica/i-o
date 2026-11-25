import { getLinkLibrary } from "../services/linkLibraryService";

function GetLinks(storageKey, linkLocation) {

    // Links from Link Library
    if (sessionStorage.getItem(storageKey) == undefined) {
        //Fetch Link Library data and store to localStorage which can be shared across components
        //console.log("Fetching Link Library data for: ", linkLocation);
        
        (async () => {
            const respone = await getLinkLibrary(linkLocation);
            if (respone) {
                const data = respone.data || null;
                sessionStorage.setItem(storageKey, JSON.stringify(data));
                //console.log(data);
                //setLinks(data);
                return data;
            }
        })();
      }
      else {
          const lsLinks = JSON.parse(sessionStorage.getItem(storageKey));
          return lsLinks;
          //setLinks(lsLinks);
      }
}
export const LinkLibraryUtils = {
    GetLinks: (storageKey, linkLocation) => {

        // Links from Link Library
        if (!sessionStorage.getItem(storageKey)) {
            //Fetch Link Library data and store to localStorage which can be shared across components
            //console.log("Fetching Link Library data for: ", linkLocation);
            
            (async () => {
                const respone = await getLinkLibrary(linkLocation);
                if (respone) {
                    const data = respone.data || null;
                    sessionStorage.setItem(storageKey, JSON.stringify(data));
                    //console.log("My Stuff Links", data);
                    //setLinks(data);
                    return data;
                }
            })();
          }
          else {
              const lsLinks = JSON.parse(sessionStorage.getItem(storageKey));
              return lsLinks;
              //setLinks(lsLinks);
          }
    },

    GetLinkByOrderNumber: (storageKey, linkLocation, linkOrder) => {
        const allLinks = GetLinks(storageKey, linkLocation);

        let url = '';
        if (allLinks) {
            const linkObj = allLinks.find(item => item.card_order === linkOrder);
            if (linkObj != undefined) {
                url = linkObj.url;
            }

            //console.log("GetLinkByOrderNumber - url = ", url);  
        }

        return url;
    }
}
//export default LinkLibraryUtils;