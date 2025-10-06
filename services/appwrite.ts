// // // track the searches made by user
// // import {Client, Databases} from "react-native-appwrite"

// // const DATABASE_ID=process.env.EXPO_PUBLIC_APPWRITE_DATABSE_ID!;
// // const COLLECTION_ID=process.env.EXPO_PUBLIC_APPWRITE_COLLECTION_ID!;

// // const client =new Client();
// // .setEndpoint('https://cloud.appwrite.io/v1')
// // .setProject(process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!)

// // const database =new Databases(client);
// // export const updateSearchCount = async (query:string,movie:Movie)=>{
// //     const result=await database.listDocuments(DATABASE_ID,COLLECTION_ID,[
// //         Query.equal('searchTerm',query)]
// //     )
// //     console.log(result);
// //     // const result -await
// //     // check if a record of that search has alrady been stored
// //     // if a document is found increment the searchCount field
// //     // if nodocument is found c
// //     //  create a new document in appwrite database ->1
// // }

// // track the searches made by user
// import { Client, Databases, Query } from "react-native-appwrite"

// // Define Movie type if you don't have it elsewhere
// interface Movie {
//   id: string;
//   title: string;
//   // add other movie properties
// }

// const DATABASE_ID = process.env.EXPO_PUBLIC_APPWRITE_DATABSE_ID!;
// const COLLECTION_ID = process.env.EXPO_PUBLIC_APPWRITE_COLLECTION_ID!;

// const client = new Client()
//   .setEndpoint('https://cloud.appwrite.io/v1')
//   .setProject(process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!);

// const database = new Databases(client);

// export const updateSearchCount = async (query: string, movie: Movie) => {
//   try {
//     const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
//       Query.equal('searchTerm', query)
//     ]);
    
//     // check if a record of that search has alrready been taken

//     if(result.documents.length>0){
//         const existingMovie=result.documents[0];

//         await database.updateDocument(
//             DATABASE_ID,
//             COLLECTION_ID,
//             existingMovie.$id,
//             {
//                 count:existingMovie.count + 1
//             }
//         )
//     }else{
//         await database.createDocument(DATABASE_ID,COLLECTION_ID,ID.unique(),{
//             searchTerm:query,
//             movie_id:movie.id,
//             count:1,
//             title:movie.title,
//             poster_url:`https://image.tmdb.org/t/p/w500${movie.poster_path}`
//         })
//     }
//     console.log(result);
    
//     // TODO: Add logic to update or create search count
//     // If document exists, increment count
//     // If not, create new document
    
//   } catch (error) {
//     console.error('Error updating search count:', error);
//     throw error;
//   }
// }


// track the searches made by user
import { Client, Databases, Query, ID } from "react-native-appwrite"

// Define Movie type if you don't have it elsewhere
interface Movie {
  id: string;
  title: string;
  poster_path: string;
  // add other movie properties
}

const DATABASE_ID = process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID!;
const COLLECTION_ID = process.env.EXPO_PUBLIC_APPWRITE_COLLECTION_ID!;

const client = new Client()
  .setEndpoint('https://cloud.appwrite.io/v1')
  .setProject(process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!);

const database = new Databases(client);

export const updateSearchCount = async (query: string, movie: Movie) => {
  try {
    const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
      Query.equal('searchTerm', query)
    ]);
    
    // check if a record of that search has already been taken
    if (result.documents.length > 0) {
      const existingMovie = result.documents[0];

      await database.updateDocument(
        DATABASE_ID,
        COLLECTION_ID,
        existingMovie.$id,
        {
          count: (existingMovie.count as number) + 1
        }
      );
    } else {
      await database.createDocument(
        DATABASE_ID,
        COLLECTION_ID,
        ID.unique(),
        {
          searchTerm: query,
          movie_id: movie.id,
          count: 1,
          title: movie.title,
          poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`
        }
      );
    }
    
    console.log('Search count updated successfully');
    
  } catch (error) {
    console.error('Error updating search count:', error);
    throw error;
  }
}

export const getTrendingMovies=async():Promise<TrendingMovie[]|undefined>=>{
    try{
          const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
      Query.limit(5),
      Query.orderDesc('count')
    ]);

    return result.documents as unknown as TrendingMovie[];
    }catch(error){
        console.log(error)
    }
}