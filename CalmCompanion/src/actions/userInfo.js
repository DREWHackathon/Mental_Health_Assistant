

export const updateAnxietyResults = (score) => {

    let results;
    if (score <= 4) {
        results = "minimal"
    } else if (score <= 9) {
        results = "mild"
    } else if (score <= 14) {
        results = "moderate"
    } else {
        results = "severe"
    }

    return (
        {
            type: "UPDATE_ANXIETY",
            data: {
                score: score,
                results: results,
                datetime: getCurrentTime()
            }
        }
    )

}

export const updateDepressionResults = (score) => {
 
    let results;
    if (score <= 4) {
        results = "minimal"
    } else if (score <= 9) {
        results = "mild"
    } else if (score <= 14) {
        results = "moderate"
    } else if (score <= 19) {
        results = "moderately severe"
    } else {
        results = "severe"
    }

    return (
        {
            type: "UPDATE_DEPRESSION",
            data: {
                score: score,
                results: results,
                datetime: getCurrentTime()
            }
        }
    )

}

export const pushMessage = (newMessage) => {
    return (
        {
            type: "PUSH_MESSAGE",
            data: newMessage
        }
    )
}


const getCurrentTime = () => {
    return Date.now()
}