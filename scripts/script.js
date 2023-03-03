
let vehicles = [
    {
        name: "Fortuner",
        description: "The Toyota Supra (Japanese: トヨタ・スープラ, Hepburn: Toyota Sūpura) is a sports car and grand tourer manufactured by the Toyota Motor Corporation beginning in 1978. The name 'supra' is derived from the Latin prefix, meaning 'above', 'to surpass' or 'go beyond'",
        contentType: [{
            name: 'en_US',
        }],
        locales: {
            name: "Innova",
            description: "Toyota Motor Corporation is a Japanese multinational automotive manufacturer headquartered in Toyota City, Aichi, Japan. It was founded by Kiichiro Toyoda and incorporated on August 28, 1937. Toyota is one of the largest automobile manufacturers in the world, producing about 10 million vehicles per year."
        } 
    },
    // {
    //     name: "land Cruiser",
    //     description: "The Toyota Supra (Japanese: トヨタ・スープラ, Hepburn: Toyota Sūpura) is a sports car and grand tourer manufactured by the Toyota Motor Corporation beginning in 1978. The name 'supra' is derived from the Latin prefix, meaning 'above', 'to surpass' or 'go beyond'",
    //     contentType: [{
    //         name: 'en_US',
    //     }],
    //     locales: {
    //         name: "Toyota",
    //         description: "Toyota Motor Corporation is a Japanese multinational automotive manufacturer headquartered in Toyota City, Aichi, Japan. It was founded by Kiichiro Toyoda and incorporated on August 28, 1937. Toyota is one of the largest automobile manufacturers in the world, producing about 10 million vehicles per year."
    //     } 
    // },
    // {
    //     name: "Glanza",
    //     description: "The Toyota Supra (Japanese: トヨタ・スープラ, Hepburn: Toyota Sūpura) is a sports car and grand tourer manufactured by the Toyota Motor Corporation beginning in 1978. The name 'supra' is derived from the Latin prefix, meaning 'above', 'to surpass' or 'go beyond'",
    //     contentType: {
    //         name: 'en_US',
    //     },
    //     locales: {
    //         name: "Toyota",
    //         description: "Toyota Motor Corporation is a Japanese multinational automotive manufacturer headquartered in Toyota City, Aichi, Japan. It was founded by Kiichiro Toyoda and incorporated on August 28, 1937. Toyota is one of the largest automobile manufacturers in the world, producing about 10 million vehicles per year."
    //     } 
    // },
    // {
    //     name: "Hybrider",
    //     description: "The Toyota Supra (Japanese: トヨタ・スープラ, Hepburn: Toyota Sūpura) is a sports car and grand tourer manufactured by the Toyota Motor Corporation beginning in 1978. The name 'supra' is derived from the Latin prefix, meaning 'above', 'to surpass' or 'go beyond'",
    //     contentType: {
    //         name: 'en_US',
    //     },
    //     locales: {
    //         name: "Toyota",
    //         description: "Toyota Motor Corporation is a Japanese multinational automotive manufacturer headquartered in Toyota City, Aichi, Japan. It was founded by Kiichiro Toyoda and incorporated on August 28, 1937. Toyota is one of the largest automobile manufacturers in the world, producing about 10 million vehicles per year."
    //     } 
    // },
    // {
    //     name: "Endavous",
    //     description: "The Toyota Supra (Japanese: トヨタ・スープラ, Hepburn: Toyota Sūpura) is a sports car and grand tourer manufactured by the Toyota Motor Corporation beginning in 1978. The name 'supra' is derived from the Latin prefix, meaning 'above', 'to surpass' or 'go beyond'",
    //     contentType: [{
    //         name: 'en_US',
    //     }],
    //     locales: [{
    //         name: "Ford",
    //         description: "Toyota Motor Corporation is a Japanese multinational automotive manufacturer headquartered in Toyota City, Aichi, Japan. It was founded by Kiichiro Toyoda and incorporated on August 28, 1937. Toyota is one of the largest automobile manufacturers in the world, producing about 10 million vehicles per year."
    //     } ]
    // },
    // {
    //     name: "Harrier",
    //     description: "The Toyota Supra (Japanese: トヨタ・スープラ, Hepburn: Toyota Sūpura) is a sports car and grand tourer manufactured by the Toyota Motor Corporation beginning in 1978. The name 'supra' is derived from the Latin prefix, meaning 'above', 'to surpass' or 'go beyond'",
    //     contentType: {
    //         name: 'en_IND',
    //     },
    //     locales: {
    //         name: "Tata",
    //         description: "Toyota Motor Corporation is a Japanese multinational automotive manufacturer headquartered in Toyota City, Aichi, Japan. It was founded by Kiichiro Toyoda and incorporated on August 28, 1937. Toyota is one of the largest automobile manufacturers in the world, producing about 10 million vehicles per year."
    //     } 
    // },
    // {
    //     name: "Thar",
    //     description: "The Toyota Supra (Japanese: トヨタ・スープラ, Hepburn: Toyota Sūpura) is a sports car and grand tourer manufactured by the Toyota Motor Corporation beginning in 1978. The name 'supra' is derived from the Latin prefix, meaning 'above', 'to surpass' or 'go beyond'",
    //     contentType: {
    //         name: 'en_IND',
    //     },
    //     locales: {
    //         name: "Mahindra",
    //         description: "Toyota Motor Corporation is a Japanese multinational automotive manufacturer headquartered in Toyota City, Aichi, Japan. It was founded by Kiichiro Toyoda and incorporated on August 28, 1937. Toyota is one of the largest automobile manufacturers in the world, producing about 10 million vehicles per year."
    //     } 
    // },
] 

const res = filterCollection(vehicles, 'en_US Toyota', false, 'name', 'description', 'contentType.name', 'locales.name', 'locales.description')
console.log(res)



function filterCollection(array, keywords, matchAll, ...parameters) {
    const filterFn = (obj) => {
      //spliting keywords to a array
      const keywordArray = keywords.split(/\s/);
      //iterarting through keywords which were splited above and look for matches in specifed parameters given (...parameters -> spread oprator)
      const matches = keywordArray.map((keyword) =>
      /**>
       * iterating through every param to llok for match
       */
      parameters.some((param) => {
          //traversing path if there by splitting  @ .
          const fieldArray = param.split(".");
          // console.log(fieldArray)
          let val = obj;
          
          for (let i = 0; i < fieldArray.length; i++) {
            if (!val.hasOwnProperty(fieldArray[i])) {
              return false;
            }
            //getting all param's value to compare 
            val = val[fieldArray[i]];
          }
          if (Array.isArray(val)) {
            return val.some((item) => itemMatch(item, keyword));
          } else {
            return itemMatch(val, keyword);
          }
        })
      );
      // matching all params or not
      if (matchAll) {
        return matches.every((match) => match);
      } else {
        return matches.some((match) => match);
      }
    };
    // compare function
    const itemMatch = (item, keyword) => {
      if (typeof item === "string") {
        return item.toLowerCase().includes(keyword.toLowerCase());
      } else {
        return false;
      }
    };
    return array.filter(filterFn);
  }
