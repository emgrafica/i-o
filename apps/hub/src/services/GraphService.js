var graph = require('@microsoft/microsoft-graph-client');

function getAuthenticatedClient(accessToken) {
  // Initialize Graph client
  const client = graph.Client.init({
    // Use the provided access token to authenticate
    // requests
    authProvider: (done) => {
      done(null, accessToken);
    }
  });

  return client;
}

const GraphService = {
  getUserDetails: async (accessToken) => {
    const client = getAuthenticatedClient(accessToken);
  
    const user = await client
      .api('/me')
      .select('displayName,givenName,surname,jobTitle,mail,userPrincipalName')
      .get();
    
    return user;
  },

  getUserPhoto: async (accessToken) => {
    const client = getAuthenticatedClient(accessToken);
    try {
      const photo = await client
        .api('/me/photos/48x48/$value')
        .get();
      let imgSrc = null;
      if (photo != null)
      {
          imgSrc = window.URL.createObjectURL(photo);
      }
      return imgSrc;
    } catch (error) {
      //console.log("error>>>", JSON.stringify(error));
      return null;
    }
    
  }
}
export default GraphService;
// export async function getUserDetails(accessToken) {
//   const client = getAuthenticatedClient(accessToken);

//   const user = await client
//     .api('/me')
//     .select('displayName,givenName,surname,jobTitle,mail,userPrincipalName')
//     .get();
  
//   return user;
// }

// export async function getUserPhoto(accessToken) {
//   const client = getAuthenticatedClient(accessToken);

//   const photo = await client
//     .api('/me/photos/48x48/$value')
//     .get();
//   let imgSrc = null;
//   if (photo != null)
//   {
//       imgSrc = window.URL.createObjectURL(photo);
//   }
//   return imgSrc;
// }