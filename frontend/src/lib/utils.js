import React from 'react'

const formatMessageTime = (date) => {
    var time = new Date(date).toLocaleTimeString("en-IN", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
    });
    return time
}

export default formatMessageTime
