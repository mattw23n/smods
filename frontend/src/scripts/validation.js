

const prerequisiteCheck = ({ module, mods, validationResult, errorMods }) => {
    
    const setFalse = (validationResult, updatedMods, message) => {
      validationResult.mods = updatedMods;
      validationResult.message = message
    };
  
    const { courseCode, isError, requirements } = module;
    const prereqs = requirements.prerequisites;

    // console.log(prereqs)
  
    if (prereqs.length < 1) {

        return true;
    }
  
    const modPosition = mods.findIndex((m) => m.courseCode === courseCode);
    

    for (const pr of prereqs) {
      const prPosition = mods.findIndex((m) => m.courseCode === pr);

      if (prPosition >= modPosition || prPosition === -1) {

        // Set isError to true
        const tempCopy = mods.filter((m) => m.courseCode !== courseCode);
        const updatedModule = { ...module, isError: true };

        console.log(errorMods)
        // errorMods.push(updatedModule)

        tempCopy.push(updatedModule);
  
        // Sort mods
        tempCopy.sort((a, b) => a.term - b.term);

        // console.log("before", validationResult)
        const message1 = "Prerequisites must be taken before the module! (" + prereqs + ")"
        const message2 = "Prerequisites not found! (" + prereqs + ")"
        
        if(prPosition >= modPosition){
            setFalse(validationResult, tempCopy, message1);
        }else{
            setFalse(validationResult, tempCopy, message2);
        }

        // console.log("Prerequisite Check Failed:", validationResult);
        return false
      }
    }

    return true
  };

const corequisiteCheck = ({module, mods, validationResult, errorMods}) => {
    // const setTrue = (validationResult) => {
    //     validationResult.status = true;
    // };
    
    const setFalse = (validationResult, updatedMods, message) => {
        validationResult.mods = updatedMods;
        validationResult.message = message
    };
    
    const { courseCode, isError, term, requirements } = module;
    const coreqs = requirements.corequisites;
    
    if (coreqs.length < 1) {
        // setTrue(validationResult)
        return true;
    }
    
    const handleError = (message) => {
        const tempCopy = mods.filter((m) => m.courseCode !== courseCode);
        const updatedModule = { ...module, isError: true };


        tempCopy.push(updatedModule);
    
        // Sort mods
        tempCopy.sort((a, b) => a.term - b.term);
    
        setFalse(validationResult, tempCopy, message);
        return false;
    };
    
    for (const cr of coreqs) {
        const coReq = mods.find((m) => m.courseCode === cr);
    
        if (!coReq) {
            const message = "Corequisite not found! (" + coreqs + ")"
          return handleError(message);
        }
    
        if (coReq.term !== term) {
            const message = "Corequisite must be taken in the same term! (" + coreqs + ")"
          return handleError(message);
        }
    }
    
    // setTrue(validationResult);
    return true;
}

const mutuallyexclusiveCheck = ({module, mods, validationResult, errorMods}) => {
    // const setTrue = (validationResult) => {
    //     validationResult.status = true;
    // };
    
    const setFalse = (validationResult, updatedMods, message) => {
        validationResult.mods = updatedMods;
        validationResult.message = message
    };
    
    const { courseCode, isError, term, requirements } = module;
    const mutualexes = requirements.mutuallyExclusive;

    
    if (mutualexes.length < 1) {
        // setTrue(validationResult)
        return true;
    }
    
    
    for (const me of mutualexes) {
        const mutualex = mods.findIndex((m) => m.courseCode === me);
        
        //if found
        if (mutualex >= 0) {
            const tempCopy = mods.filter((m) => m.courseCode !== courseCode);
            const updatedModule = { ...module, isError: true };


            tempCopy.push(updatedModule);
        
            // Sort mods
            tempCopy.sort((a, b) => a.term - b.term);

            const message = "Mutually exclusive module found! (" + me +")"
        
            setFalse(validationResult, tempCopy, message);
            return false;
        }
    }
    
    // setTrue(validationResult);
    return true;
}
  
const modValidation = ({ mods, setMods }) => {

    // console.log(mods)
    // Initial validation result
    let validationResults = 
    {
        errorMods: [],
        results:[
            {
                type: "prerequisite",
                message: "",
                mods: mods,
            },
            {
                type: "corequisite",
                message: "",
                mods: mods,
            },
            {
                type: "mutuallyexclusive",

                message: "",
                mods: mods,
            },
        ]
    }
    ;

    
  
    // Sort the mods based on term here
    let currentErrorMods = []

    // console.log("initialErrorMods", currentErrorMods)

    const results = validationResults.results
    mods.sort((a, b) => a.term - b.term);
  
    let allValid = true;
    let currentMods = [...mods]; // Create a temporary variable to hold the updated mods

    currentMods.forEach((module) => {
        const prCheck = prerequisiteCheck({ module, mods: currentMods, validationResult: results[0], currentErrorMods});
        if (!prCheck) {

            allValid = false;
            currentMods = results[0].mods; // Update currentMods with the latest mods
        }
        
        const crCheck = corequisiteCheck({ module, mods: currentMods, validationResult: results[1], currentErrorMods});
        if (!crCheck) {

            allValid = false;
            currentMods = results[1].mods; // Update currentMods with the latest mods
        }

        const meCheck = mutuallyexclusiveCheck({ module, mods: currentMods, validationResult: results[2], currentErrorMods});
        if (!meCheck) {

            allValid = false;
            currentMods = results[2].mods; // Update currentMods with the latest mods
        }
    });

    console.log(validationResults)
    console.log(currentErrorMods)
  
    if (!allValid) {
        // If any validation fails, update the mods state
        console.log("not all valid")
        setMods(currentMods);
    }else{
        console.log("all valid!")
        const updatedMods = currentMods.map(mod => ({
            ...mod,
            isError: false
        }));
        setMods(updatedMods);
    }

    // console.log("prior")
    // console.log(validationResults)
  
    return validationResults;
  };
  
  export default modValidation;
  