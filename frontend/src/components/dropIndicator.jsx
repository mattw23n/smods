import React from "react"

const DropIndicator = ({ beforeId, term}) => {
    return(
        <div
            data-before={beforeId || "-1"}
            data-column={term}
            className="my-0.5 h-0.5 w-full bg-violet-400 opacity-0"
        />
    )
}

export default DropIndicator