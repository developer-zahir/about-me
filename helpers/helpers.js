export const getRandomUniqueId = () => {
    // Generate a random number between 0 and 1000000000.
    const randomNumber = Math.floor(Math.random() * 1000000000);
  
    // Get the current timestamp in milliseconds.
    const timestamp = Date.now();
  
    // Combine the random number and timestamp to create a unique ID.
    const uniqueId = `${randomNumber}_${timestamp}`;
  
    // Return the unique ID.
    return uniqueId;
  };



  // create product slug from product name

// export const createSlug = (name) => {
//   // Convert the name to lowercase and replace space whit hyphns.
//   const slug = name.toLowerCase().replace(/\s+/g, "-");

//   // Remove any specila charecters or symbols
//   const cleanedSlug = slug.replace(/[^a-z0-9-]/g, "");
//   return cleanedSlug;
// };




export const createSlug = (name, existingSlugs) => {
  // Convert the name to lowercase and replace spaces with hyphens.
  let slug = name.toLowerCase().replace(/\s+/g, "-");

  // Remove any special characters or symbols
  const cleanedSlug = slug.replace(/[^a-z0-9-]/g, "");

  // Check if the cleanedSlug already exists in the list of existing slugs
  if (existingSlugs.includes(cleanedSlug)) {
    // Generate a random number and append it to the slug
    let randomSlug;
    let count = 1;
    do {
      randomSlug = cleanedSlug + "-" + Math.floor(Math.random() * 1000);
      count++;
    } while (existingSlugs.includes(randomSlug));

    return randomSlug;
  } else {
    return cleanedSlug;
  }
};




