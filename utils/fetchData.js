//get single post with slug 
export const getSinglePostData = async (slug, apiRoute) => {
  console.log("Fetching from API:", slug);

    try {
      const url = `${process.env.url}/${apiRoute}?slug=${slug}&acf_format=standard`;
      console.log("Fetching:", url);
  
      const response = await fetch(url, 
        {
            headers: {
              'User-Agent': 'Mozilla/5.0',
              'Accept': 'application/json',
            },
       
            next: { revalidate: 2592000 },
          },
          
    );
  
      if (!response.ok) {
        throw new Error(`Fetch failed with status: ${response.status}`);
      }
  
      const data = await response.json();
      return data;
    } catch (err) {
      console.error("Error in getSinglePostData:", err);
      return null;
    }
  };

// get single post data using post id 
export const getSinglePostDataWithID = async (id, apiRoute) => {
    let response = await fetch(`${process.env.url}/${apiRoute}/${id}?acf_format=standard`, {
        next: { revalidate: 2592000 },
    });
    let data = await response.json();
    return data
}

//get all posts 
export const getAllPosts = async (apiRoute) => {
    let response = await fetch(`${process.env.url}/${apiRoute}?acf_format=standard&per_page=100`, {
        next: { revalidate: 2592000 },
    });
    let data = await response.json();
    return data
}


export const getOptions = async () => {
    let fetchData = await fetch(`${process.env.url}/wp-json/options/all`, {
        next: { revalidate: 2592000 },
    });
    let data = await fetchData.json();
    return data
}





  // get reivews
  export const getGoogleReviews = async () => {
    const baseUrl = process.env.siteUrl; // Change this in production

    const res = await fetch(`${baseUrl}/api/google-reviews`, { next: { revalidate: 2592000 } });

    if (!res.ok) { 
        console.log("failed to retch")
    return []
    }
    return res.json();
  
};






